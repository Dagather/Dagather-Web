import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import GoBackButton from 'Components/Button/GoBackButton';

import { database, storage } from 'Config/firebaseConfig';

import uniqueIdGenerator from 'Utils/unique-id-generator';

import xIcon from 'Assets/img/icon/xIcon.svg';
import warn from 'Assets/img/icon/warn.svg';

import { Input, Button, Label, Spinner } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PostModal(props) {
  const { toggle, mode, postId, filePathForEdit } = props;
  const fbDatabase = database();
  const fbStorage = storage();
  const [content, setContent] = useState('');

  const [selectedOption, setSelectedOption] = useState('업로드');
  const optionHandler = (e) => setSelectedOption(e.target.value);
  const optionMapper = { 업로드: 1, 수정: 2, 기타: 3 };
  const rOptionMapper = { 1: '업로드', 2: '수정', 3: '기타' };

  const [title, setTitle] = useState('');
  const titleHandler = (e) => setTitle(e.target.value);

  const [author, setAuthor] = useState('');
  const authorHandler = (e) => {
    setAuthor(e.target.value);
  };

  const [password, setPassword] = useState('');
  const pwHandler = (e) => {
    setPassword(e.target.value);
  };

  const [showMsg, setShowMsg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUpdated, setIsFileUpdated] = useState(false);

  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setIsFileUpdated(true);
    setFile(e.target.files[0]);
  };

  const options = (
    <>
      <option disabled>분류</option>
      <option value="업로드">
        업로드
      </option>
      <option value="수정">수정</option>
      <option value="기타">기타</option>
    </>
  );

  const parseDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${1 + date.getMonth()}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const pushPost = async (filePath) => {
    const postRef = fbDatabase.ref('posts');
    const newPostRef = postRef.push();
    await newPostRef.set({
      category: optionMapper[selectedOption],
      title,
      author,
      password,
      created_at: parseDate(),
      content,
      file: {
        path: filePath || '',
      },
    });
  };

  const uploadFile = async () => {
    const { name } = file;
    const uniquePath = uniqueIdGenerator();
    const scriptRef = fbStorage.ref().child('script').child(uniquePath);
    const fileRef = scriptRef.child(name);
    await fileRef.put(file);
    return `script/${uniquePath}/${name}`;
  };

  const removeFile = () => {
    const fileRef = fbStorage.ref().child(filePathForEdit);
    if (fileRef) {
      fileRef.delete().then(() => {
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const editPost = async (filePath) => {
    const postRef = fbDatabase.ref('posts');
    const editPostRef = postRef.child(postId);

    const editData = {
      category: optionMapper[selectedOption],
      title,
      content,
      file: {
        path: filePath || '',
      },
    };

    editPostRef.update(editData, (err) => {
      console.log(err);
    });
  };

  const sendQuery = async () => {
    setIsLoading(true);
    console.log(file, isFileUpdated, selectedOption);
    if (mode === 'new') {
      if (file) {
        const path = await uploadFile();
        pushPost(path);
      } else pushPost();
    }

    if (mode === 'edit') {
      if (file && isFileUpdated) {
        if (filePathForEdit) removeFile();
        const path = await uploadFile();
        editPost(path);
      } else editPost();
    }

    setIsLoading(false);
    toggle();
  };

  const isInputValid = () => {
    if (mode === 'new') {
      return author && password && title && content;
    } return title && content && (content !== '<p><br></p>');
  };

  const nameParser = (fileData) => {
    if (typeof fileData === 'object' && fileData.name) return fileData.name;
    if (typeof fileData === 'string') {
      const li = fileData.lastIndexOf('/');
      return fileData.substr(li + 1);
    }
    return '';
  };

  const removeFileName = () => {
    setIsFileUpdated(true);
    setFile(null);
  };

  const warnMsgHandler = (arr) => {
    let warnMsg = '';
    arr.forEach((msg) => {
      warnMsg += `${msg}, `;
    });
    warnMsg = warnMsg.substr(0, warnMsg.length - 2);
    warnMsg += ': 필수입력사항입니다.';
    return warnMsg;
  };

  const successHandler = () => {
    if (isInputValid()) {
      setShowMsg([]);
      sendQuery();
    } else {
      const notifyArray = [];
      if (mode === 'new') {
        if (!author) notifyArray.push('작성자');
        if (!password) notifyArray.push('패스워드');
      }
      if (!title) notifyArray.push('제목');
      if (!content || content === '<p><br></p>') notifyArray.push('내용');
      setShowMsg(notifyArray);
    }
  };

  useEffect(() => {
    if (mode === 'edit') {
      console.log(filePathForEdit);
      fbDatabase.ref('posts').child(postId).get().then((snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          const {
            title: editTitle,
            category,
            content: editContent,
            file: editFile,
          } = values;
          setTitle(editTitle);
          setContent(editContent);
          setSelectedOption(rOptionMapper[category]);
          setFile(editFile.path);
        }
      });
    }
  }, []);

  return (
    <>
      <div className="postModal">
        {mode === 'edit' && (
          <GoBackButton className="post_goback" />
        )}
        <div className="postModal__header">
          <div className="postModal__header__main">
            {mode === 'edit' ? '게시글 수정' : '새 게시글 작성'}
          </div>
          <div className="postModal__header__input">
            <Label for="optSelect" />
            <Input
              className="postModal__header__input__opt"
              id="optSelect"
              type="select"
              value={selectedOption}
              onChange={optionHandler}
            >
              {options}
            </Input>
            <Input
              className="postModal__header__input__title"
              value={title}
              onChange={titleHandler}
              placeholder="제목을 입력하세요"
              type="textarea"
            />
          </div>
        </div>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <div className="postModal__file">
          <Label className="postModal__file__header">첨부파일</Label>
          {
            (file && mode === 'edit') ? (
              <div className="postModal__file__name">
                <span>{nameParser(file)}</span>
                <button type="button" className="postModal__file__name__rm" onClick={removeFileName}>
                  <img src={xIcon} alt="xicon" />
                </button>
              </div>
            ) : (
              <Input type="file" onChange={fileHandler} />
            )
          }

        </div>
        {showMsg.length > 0 && (
          <div className="postModal__warn">
            <div className="postModal__warn__icon">
              <img src={warn} alt="warnIcon" />
            </div>
            <div className="postModal__warn__content">
              &nbsp;
              {warnMsgHandler(showMsg)}
            </div>
          </div>
        ) }
        {mode === 'new' && (
          <div className="postModal__login">
            <Input
              className="postModal__login__author"
              value={author}
              onChange={authorHandler}
              placeholder="작성자"
              type="text"
            />
            <Input
              className="postModal__login__password"
              value={password}
              onChange={pwHandler}
              placeholder="비밀번호"
              type="password"
            />
          </div>
        )}
        <div className="postModal__footer">
          {mode === 'new' && <Button color="danger" onClick={toggle}>취소</Button>}
          <Button
            color="success"
            onClick={successHandler}
            className="postModal__footer__save"
          >
            완료
          </Button>
        </div>
        {isLoading && (
          <Spinner className="postModal__loader" color="success" />
        )}
      </div>
    </>
  );
}

PostModal.propTypes = {
  mode: PropTypes.string.isRequired,
  toggle: PropTypes.func,
  postId: PropTypes.string,
  filePathForEdit: PropTypes.string,
};

PostModal.defaultProps = {
  toggle: null,
  postId: null,
  filePathForEdit: null,
};

export default PostModal;
