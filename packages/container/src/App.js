import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

// when we build our app for production, rather then generating all the
// Class Names with the pre-fix of 'jss', it's going to instead us 'con' for our Marketing App
// where our Host Container App will have default of 'jss' & 'con' for Container App avoids conflicts
const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

const App = () => {
  return (
    // StylesProvider is a react component what is use to customize all the css in js generation stuffs
    // It takes an option object to generate Class Names for production in a slight more randomized fashion
    // to avoid css-in-js conflicts between Apps.
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
