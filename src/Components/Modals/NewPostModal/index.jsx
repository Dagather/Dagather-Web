import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Input, Button, Label } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewPostModal(props) {
  const { toggle } = props;
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const optionHandler = (e) => setSelectedOption(e.target.value);
  const options = (
    <>
      <option>분류</option>
      <option value="upload">업로드</option>
      <option value="modify">수정</option>
      <option value="etc">기타</option>
    </>
  );
  return (
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
          <Input className="newPostModal__header__input__title" placeholder="제목을 입력하세요" type="textarea" />
        </div>
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div className="newPostModal__footer">
        <Button className="newPostModal__footer__save"> 완료 </Button>
        <Button onClick={toggle}> 닫기 </Button>
      </div>
    </div>
  );
}

NewPostModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default NewPostModal;
