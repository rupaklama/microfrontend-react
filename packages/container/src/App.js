import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp.js'));
const DashboardLazy = lazy(() => import('./components/DashboardApp.js'));

// when we build our app for production, rather then generating all the
// Class Names with the pre-fix of 'jss', it's going to instead us 'con' for our Host App
// where our Host Container App will have 'con' to avoids conflicts
const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

// we are doing this to modify how react router dom works
// we need to get access to 'history' instance to programmatically navigate users around
// note - It's going to be hard to apply the logic here with BrowserRouter
// therefore switching up into 'Router' for this
const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // redirecting user to dashboard when user is signed in
  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    // StylesProvider is a react component what is use to customize all the css in js generation stuffs
    // It takes an option object to generate Class Names for production in a slight more randomized fashion
    // to avoid css-in-js conflicts between Apps.
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route exact path='/' component={MarketingLazy} />

              <Route path='/dashboard'>
                {/* if user is not signed in, re-direct to homepage */}
                {!isSignedIn && <Redirect to='/' />}
                <DashboardLazy />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;
