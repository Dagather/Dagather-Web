import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { database, storage } from 'Config/firebaseConfig';

import warn from 'Assets/img/icon/warn.svg';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function WarnModal(props) {
  const { isOpen, toggle, confirm, postId, filePath } = props;
  const fbDatabase = database();
  const fbStorage = storage();

  const sendConfirm = () => {
    confirm(true);
    toggle();
  };

  const [savedAuthor, setSavedAuthor] = useState('');
  const [savedPw, setSavedPw] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const [author, setAuthor] = useState('');
  const authorHandler = (e) => {
    setAuthor(e.target.value);
    const authorRef = fbDatabase.ref(`posts/${postId}/author`);
    authorRef.on('value', (snapshot) => {
      setSavedAuthor(snapshot.val());
    });
  };

  const [password, setPassword] = useState('');
  const pwHandler = (e) => {
    setPassword(e.target.value);
    const pwRef = fbDatabase.ref(`posts/${postId}/password`);
    pwRef.on('value', (snapshot) => {
      setSavedPw(snapshot.val());
    });
  };

  const removePost = async () => {
    const postRef = fbDatabase.ref('posts').child(postId);
    await postRef.remove();

    if (filePath) {
      const fileRef = fbStorage.ref().child(filePath);
      fileRef.delete().then(() => (err) => {
        console.log(err);
      });
    }
    sendConfirm();
  };

  const checkIdPwValid = () => {
    if (savedAuthor === author && savedPw === password) {
      setShowMsg(false);
      removePost();
    } else {
      setShowMsg(true);
    }
  };

  return (
    <Modal className="warnModal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader>삭제</ModalHeader>
      <ModalBody>
        <div className="warnModal__main">게시글을 삭제하시겠습니까?</div>
        <div className="warnModal__content">
          <img src={warn} alt="warnIcon" />
          <span className="warnModal__content__text">
            삭제 시 해당 게시글의 복구는 불가능합니다.
          </span>

          <input
            placeholder="작성자"
            type="text"
            value={author}
            onChange={authorHandler}
          />

          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={pwHandler}
          />
        </div>
      </ModalBody>
      {showMsg && '작성자 혹은 패스워드가 일치하지 않습니다.'}
      <ModalFooter>
        <Button onClick={toggle}>취소</Button>
        <Button onClick={checkIdPwValid} color="danger">
          삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
}

WarnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  filePath: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,
};

export default WarnModal;
