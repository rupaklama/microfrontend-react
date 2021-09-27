// note - we will integrate this App.js file with bootstrap.js file

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import Pricing from './components/Pricing';
import Landing from './components/Landing';

const App = () => {
  return (
    <div>
      <StylesProvider>
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
