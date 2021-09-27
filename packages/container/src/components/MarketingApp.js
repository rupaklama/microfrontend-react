// NOTE - this is how our Host to render Remote App - generic integration

// note - Near-zero coupling between Container - Host and Child - Remote Apps
// So the direct communication is only done by callbacks or events
// therefore, here we have 'mount' function for that purpose
// The main reason for doing this is that we don't want both to depend on one another.
// Our Container Host might decide to not to use React anymore & some other framework in the future.
// So making framework independent & other dependencies.

// note - need to use 'mount' function to get some content in the screen
// Host file -  marketing: 'marketing@http://localhost:8081/remoteEntry.js'
// Remote file -  './MarketingApp': './src/bootstrap'
import { mount } from 'marketing/MarketingApp'; // host + remote

import React, { useRef, useEffect } from 'react';

export default () => {
  // html element to render our Remote App - Marketing
  const ref = useRef(null);

  // note - now we take this Element Reference & provide it to the 'mount' function
  // we can also use this approach to any other Child App that uses different framework
  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
