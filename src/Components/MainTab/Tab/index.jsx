import React from 'react';

import PropTypes from 'prop-types';

function Tab(props) {
  const { children, title } = props;
  return (
    <div className="tab">
      <div className="tab__header">
        {title}
      </div>
      <div className="tab__content">
        {children}
      </div>
    </div>
  );
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  title: PropTypes.string,
};

Tab.defaultProps = {
  children: null,
  title: '',
};

export default Tab;
