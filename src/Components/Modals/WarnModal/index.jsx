import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { database, storage } from 'Config/firebaseConfig';

import warn from 'Assets/img/icon/warn.svg';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import pwdEncrypt from 'Utils/encrypt-decrypt-password';

function WarnModal(props) {
  const { isOpen, toggle, confirm, postId, filePath, mode } = props;
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
  const authorHandler = (e) => setAuthor(e.target.value);

  const [password, setPassword] = useState('');
  const pwHandler = (e) => setPassword(e.target.value);

  const cleanUpToggle = () => {
    setAuthor('');
    setPassword('');
    toggle();
  };

  const removePost = async () => {
    const postRef = fbDatabase.ref('posts').child(postId);
    await postRef.remove();

    if (filePath) {
      const fileRef = fbStorage.ref().child(filePath);
      await fileRef.delete().then().catch((err) => console.log(err));
    }
    sendConfirm();
  };

  const checkIdPwValid = () => {
    const { iv, salt, encryptedPwd: originPwd } = savedPw;
    const inputPwd = pwdEncrypt(password, salt, iv);

    if (savedAuthor === author && originPwd === inputPwd.encryptedPwd) {
      setShowMsg(false);
      if (mode === 'remove') removePost();
      else sendConfirm(true);
    } else {
      setShowMsg(true);
    }
  };

  const stringSelectorByMode = (editStr, removeStr) => (mode === 'edit' ? editStr : removeStr);

  useEffect(() => {
    const pwRef = fbDatabase.ref(`posts/${postId}/password`);
    pwRef.on('value', (snapshot) => {
      setSavedPw(snapshot.val());
    });

    const authorRef = fbDatabase.ref(`posts/${postId}/author`);
    authorRef.on('value', (snapshot) => {
      setSavedAuthor(snapshot.val());
    });
  }, []);

  return (
    <Modal className="warnModal" isOpen={isOpen} toggle={cleanUpToggle}>
      <ModalHeader>{stringSelectorByMode('수정', '삭제')}</ModalHeader>
      <ModalBody>
        <div className="warnModal__main">{stringSelectorByMode('게시글을 수정하시겠습니까?', '게시글을 삭제하시겠습니까?')}</div>
        <div className="warnModal__content">
          <img src={warn} alt="warnIcon" />
          <span className="warnModal__content__text">
            {stringSelectorByMode('수정 시 이전 게시글의 내용은 사라집니다.', '삭제 시 해당 게시글의 복구는 불가능합니다.')}
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
        <Button onClick={cleanUpToggle}>취소</Button>
        <Button onClick={checkIdPwValid} color="danger">
          {stringSelectorByMode('수정', '삭제')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

WarnModal.propTypes = {
  mode: PropTypes.string.isRequired,
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
