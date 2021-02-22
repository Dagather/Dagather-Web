import React from 'react';

import background from 'Assets/img/background/workingPeople.jpg';

import { Button } from 'reactstrap';

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
        <div className="jumbotron__text_btn">
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
