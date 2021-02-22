import React from 'react';

import uiPathConfig from 'Config/uipathConfig';

import Button from 'Components/Button';

import background from 'Assets/img/background/workingPeople.jpg';

function Jumbotron() {
  return (
    <div className="jumbotron">
      <div className="jumbotron__img">
        <img src={background} alt="jumboImg" />
      </div>
      <div className="jumbotron__text">
        <div className="jumbotron__text__title">
          Create Your Own Robot.
        </div>
        <div className="jumbotron__text__desc">
          Just Order and Drink Coffee.
        </div>
        <div className="jumbotron__text__btn">
          <Button onClick={uiPathConfig}>Connect UiPath &nbsp;&nbsp; &gt;</Button>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
