import React from 'react';

import PropTypes from 'prop-types';

function Card(props) {
  const { title, onClick } = props;
  return (
    <>
      <button type="button" className="card" onClick={onClick}>
        <div className="card__title">
          {title}
        </div>
        <div className="card__footer">
          상세보기
        </div>
      </button>
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
