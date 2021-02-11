import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom';

import Router from 'Router';

import FireBase from 'Config/firebaseConfig';

function App() {
  useEffect(() => {
    FireBase();
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default withRouter(App);
