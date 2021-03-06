import React, { useState } from 'react';

import { Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewPostModal() {
  const [value, setValue] = useState('');
  return (
    <div className="newPostModal">
      <div className="newPostModal__header">
        <div className="newPostModal__header__main">
          새 글 작성
        </div>
        <div className="newPostModal__header__input">
          <Input className="newPostModal__header__input__opt" type="select" />
          <Input className="newPostModal__header__input__title" type="textarea" />
        </div>
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div className="newPostModal__footer">
        <Button className="newPostModal__footer__save"> 완료 </Button>
        <Button> 닫기 </Button>
      </div>
    </div>
  );
}

export default NewPostModal;
