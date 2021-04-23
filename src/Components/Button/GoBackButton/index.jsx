import React from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import leftArrow from 'Assets/img/icon/leftArrow.svg';

function GoBackButton(props) {
  const { className } = props;
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <button className={`goBackButton ${className}`} type="button" onClick={goBack}>
      <img src={leftArrow} alt="arrow" />
    </button>
  );
}

GoBackButton.propTypes = {
  className: PropTypes.string,
};

GoBackButton.defaultProps = {
  className: '',
};

export default GoBackButton;
