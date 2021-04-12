import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import GoBackButton from 'Components/Button/GoBackButton';
import WarnModal from 'Components/Modals/WarnModal';
import PostModal from 'Components/Modals/PostModal';

import { storage } from 'Config/firebaseConfig';

import download from 'Assets/img/icon/download.svg';

import CDU from 'Utils/create-download-url';

import { Button } from 'reactstrap';

function Post(props) {
  const history = useHistory();
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
  const [editMode, setEditMode] = useState(false);
  const [filePathForEdit, setFilePathForEdit] = useState(null);
  const [fileName, setFileName] = useState('');

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
              <button type="button" className="post__content__file__download" onClick={() => CDU(path)}>
                <img src={download} alt="download" />
                <span>{fileName}</span>
              </button>
              )}
            </div>
          </div>
          <hr />
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
