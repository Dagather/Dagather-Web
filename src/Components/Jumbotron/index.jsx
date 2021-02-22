import React from 'react';

import background from 'Assets/img/background/workingPeople.jpg';

import Button from 'Components/Button';

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
          <Button>Connect UiPath &nbsp;&nbsp; &gt;</Button>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
