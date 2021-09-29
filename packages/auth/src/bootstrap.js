// setting up React App
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// NOTE - We will create a copy of Memory History here & pass it down to App component
// to provide to the Router component in App.js
import { createMemoryHistory } from 'history';
// note - react router dom makes use of this library

// note - In development, we want to use Browser History since we need to see all our URLs
import { createBrowserHistory } from 'history';

// WE NEED A CODE TO HANDLE BOTH THESE SITUATIONS mention at the bottom below

// Mount function is to start up the this app
// the goal of this function is to take 'reference' to a html element
// Passing html element as arg
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // creating copy of Memory History here because we are going to write
  // some code to sync current History inside of Auth with the History Object inside of Container
  const history =
    defaultHistory ||
    createMemoryHistory({
      // initial route
      initialEntries: [initialPath],
    });

  // now we need to make sure whenever some navigation occurs we need to call onNavigate func
  // to do so we will use some built in functionalities of History object
  // Calling 'listen' event of history object
  // note - whenever some navigation occurs, this history object will call any function
  // provided to the 'listen' event
  if (onNavigate) {
    history.listen(onNavigate);
  }

  // here we will do everything require to start up our App
  // & eventually produce some html to render inside of pass arg - element
  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  // to communicate to Auth App so that we can pass some values
  return {
    // anytime Container app navigates, we want to call this function
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      console.log(nextPathname);

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// note - now we have above Function to call in both the Situation below

// Context/Situation #1
// We are running this file in development in isolation
// We are using our local index.html file which Definitely has an element with an id
// to render our app into that element - usual regular way
// note - first we need to check whether or not, we are in isolation
// we will be doing two checks,

// First is to ensure we are in development mode
// process.env.NODE_ENV - this env variable is automatically set by Webpack since
// we have mode: 'development' in our webpack config, process.env.NODE_ENV === development, it's value now
if (process.env.NODE_ENV === 'development') {
  // Second Check to make sure whether or not, we are running this Sub App - Remote in isolation
  // we will assign unique id into our div element in root index.html of this project
  const el = document.querySelector('#_auth-dev-root');

  // if we found our element, call mount function with that element
  // Assuming our Host Container DOES NOT have an element with SAME ID of Remote
  // note - always make Host's id very unique to resolve this issue
  if (el) {
    // we are only probably running in isolation, meaning in Remote only
    // note - In development, we want to use Browser History since we need to see all our URLs
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

// Context/Situation #2
// We are running this file in development or production through the Container App - HOST
// The 'div' container in Host might have different id than our Remote projects &
// in this case our sub-apps won't get render in the main app - Host
// To solve above issue, we DO NOT WANT to try to immediately render the app.
// Rather than calling the function immediately, we are going to export it
export { mount };
// note - by exporting 'mount' function, our Container App - Host
// can import this function & make use of it whenever it wants too.
// Now the Container decides when to show our Remote - Sub Apps into the screen
