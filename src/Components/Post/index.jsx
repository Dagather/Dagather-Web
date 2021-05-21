/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable comma-spacing */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import GoBackButton from 'Components/Button/GoBackButton';
import WarnModal from 'Components/Modals/WarnModal';
import PostModal from 'Components/Modals/PostModal';
import CommentBlock from 'Components/Comments';

import CommentsBlock from 'simple-react-comments';

import { database, storage } from 'Config/firebaseConfig';

import download from 'Assets/img/icon/download.svg';
import robot from 'Assets/img/icon/robot.png';

import CDU from 'Utils/create-download-url';

import { Button } from 'reactstrap';
import { Input } from '@material-ui/core';
import commentsData from '../../Constants/commentsData';

function Post(props) {
  const history = useHistory();
  const fbDatabase = database();
  const fbStorage = storage();
  const { values, postId } = props;

  // eslint-disable-next-line max-len
  const { author, category, content, title, created_at: createdAt, file, comment_author: commentAuthor, comment_created_at: commentCreatedAt, comment_password: commentPassword, comment_content: commentContent } = values;
  const { path } = file;
  const optionMapper = { 1: '업로드', 2: '수정', 3: '기타' };

  const [rmModal, setRmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleRemove = () => setRmModal(!rmModal);
  const toggleEdit = () => setEditModal(!editModal);

  const [isRmConfirm, setIsRmConfirm] = useState(false);
  const [isEditConfirm, setIsEditConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filePathForEdit, setFilePathForEdit] = useState(null);
  const [fileName, setFileName] = useState('');

  const [comments] = useState(commentsData);

  const getFileName = () => {
    if (path && !filePathForEdit) {
      const rootRef = fbStorage.ref();
      const fileRef = rootRef.child(path);
      setFilePathForEdit(path);
      setFileName(fileRef.name);
    }
  };

  useEffect(() => {
    if (isRmConfirm) history.goBack();
    getFileName();
  }, [isRmConfirm]);

  useEffect(() => {
    if (isEditConfirm) setEditMode(true);
  }, [isEditConfirm]);

  return (
    <>
      {!editMode && (
        <div className="post">
          <div className="post__tabs">
            <GoBackButton />
            <div className="post__tabs__buttons">
              <Button onClick={toggleEdit}>수정</Button>
              <Button onClick={toggleRemove}>삭제</Button>
              <WarnModal
                mode="remove"
                isOpen={rmModal}
                toggle={toggleRemove}
                confirm={setIsRmConfirm}
                postId={postId}
                filePath={path}
              />
              <WarnModal
                mode="edit"
                isOpen={editModal}
                toggle={toggleEdit}
                confirm={setIsEditConfirm}
                postId={postId}
                filePath={path}
              />
            </div>
          </div>
          <hr />
          <div className="post__header">
            <div className="post__header__left">
              <div className="post__header__left__category">
                {`# ${optionMapper[category]}`}
              </div>
              <div className="post__header__left__title">
                {title}
              </div>
              <div className="post__header__left__box">
                <div className="post__header__left__box__icon">
                  <img src={robot} alt="user_robot" />
                </div>
                <div className="post__header__left__box__inner">
                  <div className="post__header__left__box__inner__writer">
                    {author}
                  </div>
                  <div className="post__header__left__box__inner__date">
                    {createdAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="post__content">
            <div className="post__content__desc" dangerouslySetInnerHTML={{ __html: content }} />
            <hr />
            <div className="post__content__file">
              첨부파일
              {path && (
              <button type="button" className="post__content__file__download" onClick={() => CDU(path)}>
                <img src={download} alt="download" />
                <span>{fileName}</span>
              </button>
              )}
            </div>
          </div>
          <hr />
          <div className="post__comment">
            <Input className="post__comment__author" type="text" placeholder="작성자" />
            <Input className="post__comment__password" type="password" placeholder="비밀번호" />
            <Input className="post__comment__content" type="textarea" placeholder="내용" />
            <Button>작성</Button>
          </div>
          <hr />
          <div className="post__comment__view">
            <CommentBlock author={'제균'} content={'test....'} created_at={commentCreatedAt} />
          </div>
        </div>
      )}
      {editMode && (
        <PostModal
          filePathForEdit={filePathForEdit}
          postId={postId}
          mode="edit"
          toggle={() => history.goBack()}
        />
      )}
    </>
  );
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  values: PropTypes.shape({
    author: PropTypes.string,
    category: PropTypes.number,
    content: PropTypes.node,
    created_at: PropTypes.string,
    title: PropTypes.string,
    comment_author: PropTypes.string,
    comment_created_at: PropTypes.string,
    comment_content: PropTypes.string,
    file: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
