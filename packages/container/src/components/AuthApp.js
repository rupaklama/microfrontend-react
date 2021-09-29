// NOTE - this is how our Host to render Remote App - generic integration

// note - Near-zero coupling between Container - Host and Child - Remote Apps
// So the direct communication is only done by callbacks or events
// therefore, here we have 'mount' function for that purpose
// The main reason for doing this is that we don't want both to depend on one another.
// Our Container Host might decide to not to use React anymore & some other framework in the future.
// So making framework independent & other dependencies.

// note - need to use 'mount' function to get some content in the screen
// Host file -  auth: 'auth@http://localhost:8081/remoteEntry.js'
// Remote file -  './AuthApp': './src/bootstrap'
import { mount } from 'auth/AuthApp'; // host + remote

import React, { useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  // html element to render our Remote App - Marketing
  const ref = useRef(null);

  // It is a history object currently use inside of our Container, a copy of Browser History
  const history = useHistory();

  // note - now we take this Element Reference & provide it to the 'mount' function
  // we can also use this approach to any other Child App that uses different framework
  useEffect(() => {
    // mount in bootstrap.js
    // we get an object when we call mount func - onParentNavigate
    const { onParentNavigate } = mount(ref.current, {
      // note - passing Callback func in option object to communicate to marketing navigation
      // note - Now, we need to go to our Marketing App & make sure that we receive this Callback function
      // to call it inside of bootstrap.js of Marketing App whenever Navigation occurs

      // setting up initial path in the mount function
      initialPath: history.location.pathname,

      // note - 'listen' func which is being call inside of onNavigate provides us arg prop - location
      // 'location' is an object which has some information about where we about to navigate to in Marketing
      // note - we will use 'pathname' property of 'location' object to update the
      // current path that we are visiting inside the Container App
      // onNavigate: location => {
      // destructuring & renaming
      onNavigate: ({ pathname: nextPathname }) => {
        // console.log(location);
        // console.log(nextPathname);
        // here we can figure out what Marketing App navigated to &
        // use that path to update our Browser History inside of Container App
        // note - we are going to use useHistory hook to update the current path in Container App

        // note - Whenever one history object changes, update other URls also
        // this can cause infinite loop we will check if both paths are different &
        // if its different, we want to do some navigation
        const { pathname } = history.location; // current path in Container

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },

      // Our Container is going to pass down a callback into our Auth app - onSignIn
      // Whenever User signs up/ signs in, we are going to have Auth App invoke
      // that Callback & update User auth state
      onSignIn: () => {
        onSignIn();
      },
    });

    // Browser history also have an access to listen method
    // Anytime there's a change in our Browser History, call 'onParentNavigate'
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
