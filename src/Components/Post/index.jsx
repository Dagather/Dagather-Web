import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function Post({ values, toggle }) {
  const datas = {
    category: values[0],
    title: values[1],
    writer: values[2],
    date: values[3],
  };
  const { category, title, writer, date } = datas;

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header__main">
          {title}
        </div>
      </div>
      <div className="post__content">
        {date}
        {writer}
        {category}
      </div>
      <div className="post__footer">
        <Button className="post__footer__save"> 완료 </Button>
        <Button onClick={toggle}> 닫기 </Button>
      </div>
    </div>
  );
}

Post.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Post;
