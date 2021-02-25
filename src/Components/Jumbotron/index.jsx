import React from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/Button';

function Jumbotron(props) {
  const { backgroundSrc, title, content, onClick, buttonName } = props;
  return (
    <div className="jumbotron">
      <div className="jumbotron__img">
        <img src={backgroundSrc} alt="jumboImg" />
      </div>
      <div className="jumbotron__text">
        <div className="jumbotron__text__title">
          {title}
        </div>
        <div className="jumbotron__text__desc">
          {content}
        </div>
        {onClick
        && (
        <div className="jumbotron__text__btn">
          <Button onClick={onClick}>{buttonName}</Button>
        </div>)}
      </div>
    </div>
  );
}

Jumbotron.propTypes = {
  backgroundSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  buttonName: PropTypes.string,
};

Jumbotron.defaultProps = {
  onClick: null,
  buttonName: '',
};

export default Jumbotron;
