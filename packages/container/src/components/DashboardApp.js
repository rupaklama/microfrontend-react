import { mount } from 'dashboard/DashboardApp'; // host + remote

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
