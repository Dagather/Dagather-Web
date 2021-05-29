/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import CommentWarnModal from 'Components/Modals/CommentWarnModal';

function CommentBlock(props) {
  const { commentId, author, createdAt, postId, content, commentChange } = props;
  const [rmModal, setRmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isRmConfirm, setIsRmConfirm] = useState(false);

  const toggleRemove = () => setRmModal(!rmModal);

  useEffect(() => {
    commentChange(true);
  }, [isRmConfirm]);
  return (
    <div className="commentBlock">
      <div className="commentBlock__author">
        <h6><strong>{author}</strong></h6>
        <div className="commentBlock__created__at">
          {createdAt}
        </div>
        <br />
        <div className="commentBlock__buttons">
          <Button onClick={toggleRemove} size="sm">삭제</Button>
          <CommentWarnModal
            mode="remove"
            isOpen={rmModal}
            toggle={toggleRemove}
            confirm={setIsRmConfirm}
            postId={postId}
            commentId={commentId}
          />
        </div>
      </div>
      <div className="commentBlock__content">
        {content}
      </div>
      <br />
      <hr />
    </div>
  );
}

CommentBlock.propTypes = {
  commentId: PropTypes.string,
  postId: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  commentChange: PropTypes.func,
};

CommentBlock.defaultProps = {
  commentId: '',
  postId: '',
  author: '',
  content: '',
  createdAt: '',
  commentChange: null,
};

export default CommentBlock;
