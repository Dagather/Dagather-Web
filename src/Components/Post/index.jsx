import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import pwdEncrypt from 'Utils/encrypt-decrypt-password';

import GoBackButton from 'Components/Button/GoBackButton';
import WarnModal from 'Components/Modals/WarnModal';
import PostModal from 'Components/Modals/PostModal';
import CommentBlock from 'Components/Comments';

import { database, storage } from 'Config/firebaseConfig';

import download from 'Assets/img/icon/download.svg';
import robot from 'Assets/img/icon/robot.png';

import CDU from 'Utils/create-download-url';

import { Button } from 'reactstrap';
import { Input } from '@material-ui/core';

function Post(props) {
  const history = useHistory();
  const fbDatabase = database();
  const fbStorage = storage();
  const { values, postId } = props;

  const { author, category, content, title, created_at: createdAt, file } = values;
  const { path } = file;
  const optionMapper = { 1: '업로드', 2: '수정', 3: '기타' };

  const [rmModal, setRmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleRemove = () => setRmModal(!rmModal);
  const toggleEdit = () => setEditModal(!editModal);

  const [isRmConfirm, setIsRmConfirm] = useState(false);
  const [isEditConfirm, setIsEditConfirm] = useState(false);
  const [isCommentChange, setIsCommentChange] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filePathForEdit, setFilePathForEdit] = useState(null);
  const [fileName, setFileName] = useState('');

  // const [prevSnapshot, setPrevSnapshot] = useState(null);
  const [commentList, setCommentList] = useState([]);

  const [commentContent, setCommentContent] = useState('');
  const commentContentHandler = (e) => {
    setCommentContent(e.target.value);
  };

  const [commentPassword, setCommentPassword] = useState('');
  const commentPwHandler = (e) => {
    setCommentPassword(e.target.value);
  };
  const [commentAuthor, setCommentAuthor] = useState('');
  const commentAuthorHandler = (e) => {
    setCommentAuthor(e.target.value);
  };

  const parseDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${1 + date.getMonth()}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const pushComment = async () => {
    const commentRef = fbDatabase.ref(`posts/${postId}/comments`);
    const newCommentRef = commentRef.push();
    await newCommentRef.set({
      commentAuthor,
      commentContent,
      commentPassword: pwdEncrypt(commentPassword),
      comment_created_at: parseDate(),
    });
  };
  const sendQuery = async () => {
    pushComment();
  };

  const isInputValid = () => commentAuthor && commentPassword && commentContent && (commentContent !== '<p><br></p>');
  const successHandler = () => {
    if (isInputValid()) {
      sendQuery();
    }
  };
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

  const fetchCommentList = () => {
    fbDatabase.ref(`posts/${postId}/comments`).on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keyList = Object.keys(data);
        const fetchedCommentList = Object.values(data).map((comment, index) => ({
          ...comment,
          id: keyList[index],
          postId,
        }));
        setCommentList(fetchedCommentList);
      } else {
        setCommentList([]);
      }
    });
  };

  const getComments = () => {
    // eslint-disable-next-line max-len
    const result = commentList.map((val) => <CommentBlock commentChange={setIsCommentChange} postId={val.postId} commentId={val.id} author={val.commentAuthor} content={val.commentContent} createdAt={val.comment_created_at} />);
    return result;
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  useEffect(() => {
    if (isCommentChange) {
      fetchCommentList();
      setIsCommentChange(false);
    }
  }, [isCommentChange]);

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
            <div className="post__comment_write__tabs">
              <h3>댓글 작성</h3>
            </div>
            <div className="post__comment__data">
              <Input className="post__comment__data__author" type="text" placeholder="작성자" value={commentAuthor} onChange={commentAuthorHandler} />
              <Input className="post__comment__data__password" type="password" placeholder="비밀번호" value={commentPassword} onChange={commentPwHandler} />
            </div>
            <div className="post__comment__content">
              <Input className="post__comment__content__input" type="textarea" multiline fullWidth placeholder="댓글을 입력해주세요." name={commentContent} value={commentContent} onChange={commentContentHandler} margin="none" />
            </div>
            <Button className="post__comment__save" color="success" onClick={successHandler}>작성</Button>
            <div className="post__comment__list__tabs">
              <h3>댓글 목록</h3>
            </div>
          </div>
          <div className="post__comment__view">
            {getComments()}
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
    file: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
