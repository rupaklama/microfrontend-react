// note - we will integrate this App.js file with bootstrap.js file

import React from 'react';
// Router - simple Router like this allows us to provide History Object that we want to use
// rather than having 'react-router-dom' create one for us
import { Switch, Route, Router } from 'react-router-dom';
// NOTE - we will create 'Memory History' inside of bootstrap.js rather than here

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

// when we build our app for production, rather then generating all the
// Class Names with the pre-fix of 'jss', it's going to instead us 'ma' for our Auth App
// where our Host Container App will have default of 'jss' & 'ma' for Auth App avoids conflicts
const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});
// note - Actually, we are going to do the same thing in our Host Container App as well
// technically, we don't have to the only reason is that if we have another Sub Project that makes use of
// same Material UI & if we forget to do same thing like above, we are going to have conflicts again
// with Container & New Project again.

const App = ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path='/auth/signin'>
              <Signin onSignIn={onSignIn} />
            </Route>

            <Route exact path='/auth/signup'>
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;
