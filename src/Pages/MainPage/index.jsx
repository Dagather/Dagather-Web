import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';

function Mainpage() {
  return (
    <>
      <NavBar />
      <Jumbotron />
      <div className="container">
        <div className="mainPage" />
      </div>
    </>
  );
}

export default Mainpage;
