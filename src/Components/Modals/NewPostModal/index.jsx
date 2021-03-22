import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { database } from 'Config/firebaseConfig';

import { Input, Button, Label, Spinner } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewPostModal(props) {
  const { toggle } = props;
  const fbDatabase = database();
  const [content, setContent] = useState('');

  const [selectedOption, setSelectedOption] = useState('업로드');
  const optionHandler = (e) => setSelectedOption(e.target.value);
  const optionMapper = { 업로드: 1, 수정: 2, 기타: 3 };

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

  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const [showMsg, setShowMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const options = (
    <>
      <option disabled>분류</option>
      <option selected value="업로드">
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

  const sendQuery = async () => {
    setIsLoading(true);
    const postRef = fbDatabase.ref('posts');
    const newPostRef = postRef.push();
    await newPostRef.set({
      category: optionMapper[selectedOption],
      title,
      author,
      password,
      created_at: parseDate(),
      content,
    });
    setIsLoading(false);
    toggle();
  };

  const isInputValid = () => {
    if (author && password && title && content) {
      setShowMsg(false);
      sendQuery();
    } else {
      setShowMsg(true);
    }
  };

  return (
    <>
      <div className="newPostModal">
        <div className="newPostModal__header">
          <div className="newPostModal__header__main">새 글 작성</div>
          <div className="newPostModal__header__input">
            <Label for="optSelect" />
            <Input
              className="newPostModal__header__input__opt"
              id="optSelect"
              type="select"
              value={selectedOption}
              onChange={optionHandler}
            >
              {options}
            </Input>
            <Input
              className="newPostModal__header__input__title"
              value={title}
              onChange={titleHandler}
              placeholder="제목을 입력하세요"
              type="textarea"
            />
          </div>
        </div>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <div className="newPostModal__file">
          <Input type="file" onChange={fileHandler}>
            파일 업로드
          </Input>
        </div>
        <div className="newPostModal__login">
          <Input
            className="newPostModal__login__author"
            value={author}
            onChange={authorHandler}
            placeholder="작성자"
            type="text"
          >
            작성자
          </Input>
          <Input
            className="newPostModal__login__password"
            value={password}
            onChange={pwHandler}
            placeholder="비밀번호"
            type="password"
          >
            비밀번호
          </Input>
        </div>
        {showMsg && <p>제목,내용,작성자 및 패스워드를 모두 입력하세요</p>}
        <div className="newPostModal__footer">
          <Button
            onClick={isInputValid}
            className="newPostModal__footer__save"
          >
            완료
          </Button>
          <Button onClick={toggle}> 닫기 </Button>
        </div>
        {isLoading && (
          <Spinner className="newPostModal__loader" color="success" />
        )}
      </div>
    </>
  );
}

NewPostModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default NewPostModal;
