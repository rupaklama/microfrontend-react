// note - we will integrate this App.js file with bootstrap.js file

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Pricing from './components/Pricing';
import Landing from './components/Landing';

// when we build our app for production, rather then generating all the
// Class Names with the pre-fix of 'jss', it's going to instead us 'ma' for our Marketing App
// where our Host Container App will have default of 'jss' & 'ma' for Marketing App avoids conflicts
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});
// note - Actually, we are going to do the same thing in our Host Container App as well
// technically, we don't have to the only reason is that if we have another Sub Project that makes use of
// same Material UI & if we forget to do same thing like above, we are going to have conflicts again
// with Container & New Project again.

const App = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/pricing' component={Pricing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
};

export default App;
