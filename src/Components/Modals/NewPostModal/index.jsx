import React, { useState } from 'react';

import PropTypes from 'prop-types';

import firebaseConfig from 'Config/firebaseConfig';

import { Input, Button, Label, Spinner } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewPostModal(props) {
  const { toggle } = props;
  const database = firebaseConfig();
  const [content, setContent] = useState('');

  const [selectedOption, setSelectedOption] = useState('');
  const optionHandler = (e) => setSelectedOption(e.target.value);
  const optionMapper = { 업로드: 1, 수정: 2, 기타: 3 };

  const [title, setTitle] = useState('');
  const titleHandler = (e) => setTitle(e.target.value);

  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const [isLoading, setIsLoading] = useState(false);

  const options = (
    <>
      <option>분류</option>
      <option value="업로드">업로드</option>
      <option value="수정">수정</option>
      <option value="기타">기타</option>
    </>
  );

  const sendQuery = async () => {
    setIsLoading(true);
    const postRef = database.ref('posts');
    const newPostRef = postRef.push();
    await newPostRef.set({
      category: optionMapper[selectedOption],
      title,
      author: 'Hyukjin',
      created_at: new Date().toString(),
      content,
    });
    setTimeout(() => {
      setIsLoading(false);
      toggle();
    }, 3000);
  };

  return (
    <>
      <div className="newPostModal">
        <div className="newPostModal__header">
          <div className="newPostModal__header__main">
            새 글 작성
          </div>
          <div className="newPostModal__header__input">
            <Label for="optSelect" />
            <Input className="newPostModal__header__input__opt" id="optSelect" type="select" value={selectedOption} onChange={optionHandler}>
              {options}
            </Input>
            <Input className="newPostModal__header__input__title" value={title} onChange={titleHandler} placeholder="제목을 입력하세요" type="textarea" />
          </div>
        </div>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <div className="newPostModal__file">
          <Input type="file" onChange={fileHandler}>파일 업로드</Input>
        </div>
        <div className="newPostModal__footer">
          <Button onClick={sendQuery} className="newPostModal__footer__save"> 완료 </Button>
          <Button onClick={toggle}> 닫기 </Button>
        </div>
        {isLoading && <Spinner className="newPostModal__loader" color="success" />}
      </div>
    </>
  );
}

NewPostModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default NewPostModal;
