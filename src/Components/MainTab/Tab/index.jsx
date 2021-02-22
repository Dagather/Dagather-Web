import React from 'react';

import PropTypes from 'prop-types';

function Tab(props) {
  const { children, title, subTitle } = props;
  return (
    <div className="tab">
      <div className="tab__title">
        {title}
      </div>
      <div className="tab__subTitle">
        {subTitle && (
        <>
          {subTitle}
          <hr />
        </>)}
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
  subTitle: PropTypes.string,
};

Tab.defaultProps = {
  children: null,
  title: '',
  subTitle: '',
};

export default Tab;
