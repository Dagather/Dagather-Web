import React from 'react';

import PropTypes from 'prop-types';

function MainTab(props) {
  const { children, title } = props;
  return (
    <div className="mainTab">
      <div className="mainTab__header">{title}</div>
      <hr />
      <div className="mainTab__content">{children}</div>
    </div>
  );
}

MainTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  title: PropTypes.string,
};

MainTab.defaultProps = {
  children: null,
  title: '',
};

export default MainTab;
