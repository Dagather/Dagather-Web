import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { database } from 'Config/firebaseConfig';

import warn from 'Assets/img/icon/warn.svg';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import pwdEncrypt from 'Utils/encrypt-decrypt-password';

function CommentWarnModal(props) {
  const { isOpen, toggle, confirm, postId, commentId, mode } = props;
  const fbDatabase = database();

  const sendConfirm = () => {
    confirm(true);
    toggle();
  };

  const [savedAuthor, setSavedAuthor] = useState('');
  const [savedPw, setSavedPw] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState('');
  const commentAuthorHandler = (e) => setCommentAuthor(e.target.value);

  const [commentPassword, setCommentPassword] = useState('');
  const commentPwHandler = (e) => setCommentPassword(e.target.value);

  const cleanUpToggle = () => {
    setCommentAuthor('');
    setCommentPassword('');
    toggle();
  };

  const removeComment = async () => {
    const commentRef = fbDatabase.ref(`posts/${postId}/comments/${commentId}`);
    await commentRef.remove();
    sendConfirm();
  };

  const checkIdPwValid = () => {
    const { iv, salt, encryptedPwd: originPwd } = savedPw;
    const inputPwd = pwdEncrypt(commentPassword, salt, iv);

    if (savedAuthor === commentAuthor && originPwd === inputPwd.encryptedPwd) {
      setShowMsg(false);
      if (mode === 'remove') removeComment();
      else sendConfirm(true);
    } else {
      setShowMsg(true);
    }
  };

  const stringSelectorByMode = (editStr, removeStr) => (mode === 'edit' ? editStr : removeStr);

  useEffect(() => {
    const pwRef = fbDatabase.ref(`posts/${postId}/comments/${commentId}/commentPassword`);
    pwRef.on('value', (snapshot) => {
      setSavedPw(snapshot.val());
    });

    const authorRef = fbDatabase.ref(`posts/${postId}/comments/${commentId}/commentAuthor`);
    authorRef.on('value', (snapshot) => {
      setSavedAuthor(snapshot.val());
    });
  }, []);

  return (
    <Modal className="commentWarnModal" isOpen={isOpen} toggle={cleanUpToggle}>
      <ModalHeader>{stringSelectorByMode('수정', '삭제')}</ModalHeader>
      <ModalBody>
        <div className="commentWarnModal__main">{stringSelectorByMode('게시글을 수정하시겠습니까?', '게시글을 삭제하시겠습니까?')}</div>
        <div className="commentWarnModal__content">
          <img src={warn} alt="warnIcon" />
          <span className="commentWarnModal__content__text">
            {stringSelectorByMode('수정 시 이전 게시글의 내용은 사라집니다.', '삭제 시 해당 게시글의 복구는 불가능합니다.')}
          </span>

          <input
            placeholder="작성자"
            type="text"
            value={commentAuthor}
            onChange={commentAuthorHandler}
          />

          <input
            placeholder="비밀번호"
            type="password"
            value={commentPassword}
            onChange={commentPwHandler}
          />
        </div>
      </ModalBody>
      {showMsg && '작성자 혹은 패스워드가 일치하지 않습니다.'}
      <ModalFooter>
        <Button onClick={cleanUpToggle}>취소</Button>
        <Button onClick={checkIdPwValid} color="danger">
          {stringSelectorByMode('수정', '삭제')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

CommentWarnModal.propTypes = {
  mode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default CommentWarnModal;
