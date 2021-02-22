import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { onClick, children } = props;

  return (
    <button type="button" className="customButton" onClick={onClick}>
      <div className="customButton__text">
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  onClick: null,
  children: null,
};

export default Button;
