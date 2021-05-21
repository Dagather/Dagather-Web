/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

function CommentBlock(props) {
  const { author, created_at, content } = props;
  return (
    <div className="commentBlock">
      <div className="comment__author">
        <h6><strong>{author}</strong></h6>
      </div>
      <div className="comment__content">
        {content}
        <span className="comment__created__at">{created_at}</span>
      </div>
    </div>
  );
}

CommentBlock.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.string,
};

CommentBlock.defaultProps = {
  author: '',
  content: '',
  created_at: '',
};

export default CommentBlock;
