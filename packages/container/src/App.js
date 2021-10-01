import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp.js'));

// when we build our app for production, rather then generating all the
// Class Names with the pre-fix of 'jss', it's going to instead us 'con' for our Host App
// where our Host Container App will have 'con' to avoids conflicts
const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    // StylesProvider is a react component what is use to customize all the css in js generation stuffs
    // It takes an option object to generate Class Names for production in a slight more randomized fashion
    // to avoid css-in-js conflicts between Apps.
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route exact path='/' component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
