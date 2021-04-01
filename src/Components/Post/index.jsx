import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import WarnModal from 'Components/Modals/WarnModal';

import { storage } from 'Config/firebaseConfig';

import leftArrow from 'Assets/img/icon/leftArrow.svg';
import download from 'Assets/img/icon/download.svg';

import { Button } from 'reactstrap';

function Post(props) {
  const history = useHistory();
  const fbStorage = storage();
  const { values, postId } = props;
  const { author, category, content, title, created_at: createdAt, file } = values;
  const { path } = file;
  const optionMapper = { 1: '업로드', 2: '수정', 3: '기타' };

  const [rmModal, setRmModal] = useState(false);
  const toggle = () => setRmModal(!rmModal);

  const [isRmConfirm, setisRmConfirm] = useState(false);

  const goBack = () => {
    history.goBack();
  };

  const getFileName = () => {
    if (path) {
      const rootRef = fbStorage.ref();
      const fileRef = rootRef.child(path);
      return fileRef.name;
    } return '';
  };

  const downloadFile = () => {
    if (path) {
      const rootRef = fbStorage.ref();
      const fileRef = rootRef.child(path);
      fileRef.getDownloadURL().then((url) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            const blob = xhr.response;
            const a = document.createElement('a');
            a.style = 'display: none';
            document.body.appendChild(a);
            a.href = window.URL.createObjectURL(blob);
            a.download = fileRef.name;
            a.click();
            window.URL.revokeObjectURL(url);
          };
          xhr.open('GET', url);
          xhr.send();
        } catch {
          // Deal with Error state
        }
      });
    }
  };

  useEffect(() => {
    if (isRmConfirm) history.goBack();
  }, [isRmConfirm]);

  return (
    <div className="post">
      <div className="post__tabs">
        <button className="post__tabs__back" type="button" onClick={goBack}>
          <img src={leftArrow} alt="arrow" />
        </button>
        <div className="post__tabs__buttons">
          <Button>수정</Button>
          <Button onClick={toggle}>삭제</Button>
          <WarnModal
            isOpen={rmModal}
            toggle={toggle}
            confirm={setisRmConfirm}
            postId={postId}
            filePath={path}
          />
        </div>
      </div>
      <hr />
      <div className="post__header">
        <div className="post__header__left">
          <div className="post__header__left__category">
            {optionMapper[category]}
          </div>
        </div>
        <div className="post__header__right">
          <div className="post__header__right__title">
            {title}
          </div>
          <div className="post__header__right__down">
            <div className="post__header__right__down__writer">
              {author}
            </div>
            <div className="post__header__right__down__date">
              {createdAt}
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
            <button type="button" className="post__content__file__download" onClick={downloadFile}>
              <img src={download} alt="download" />
              <span>{getFileName()}</span>
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
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
