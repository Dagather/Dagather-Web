import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function ReadPostModal({ values, toggle }) {
  const datas = {
    category: values[0],
    title: values[1],
    writer: values[2],
    date: values[3],
  };
  const { category, title, writer, date } = datas;

  return (
    <div className="readPostModal">
      <div className="readPostModal__header">
        <div className="readPostModal__header__main">
          {title}
        </div>
      </div>
      <div className="readPostModal__content">
        {date}
        {writer}
        {category}
      </div>
      <div className="readPostModal__footer">
        <Button className="readPostModal__footer__save"> 완료 </Button>
        <Button onClick={toggle}> 닫기 </Button>
      </div>
    </div>
  );
}

ReadPostModal.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ReadPostModal;
