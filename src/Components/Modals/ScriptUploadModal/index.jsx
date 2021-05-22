import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Input, Button } from 'reactstrap';

function ScriptUploadModal(props) {
  const { toggle } = props;

  const [title, setTitle] = useState('');
  const onChangeTitle = (e) => setTitle(e.target.value);

  const [desc, setDesc] = useState('');
  const onChangeDesc = (e) => setDesc(e.target.value);

  const [video, setVideo] = useState(null);
  const onChangeVideo = (e) => setVideo(e.target.files[0]);

  const [script, setScript] = useState(null);
  const onChangeScript = (e) => setScript(e.target.files[0]);

  const [author, setAuthor] = useState('');
  const onChangeAuthor = (e) => setAuthor(e.target.value);

  const [password, setPassword] = useState('');
  const onChangePassword = (e) => setPassword(e.target.value);

  const [showMsg, setShowMsg] = useState('');

  const isInputValid = () => author && password && title && desc && video && script;

  const successHandler = () => {
    if (isInputValid()) {
      setShowMsg('');
    } else {
      const notifyArray = [];
      if (!title) notifyArray.push('제목');
      if (!desc) notifyArray.push('내용');
      if (!video) notifyArray.push('실행영상');
      if (!script) notifyArray.push('스크립트');
      if (!author) notifyArray.push('작성자');
      if (!password) notifyArray.push('패스워드');
      setShowMsg(`${notifyArray.join(', ')}: 필수입력사항입니다.`);
    }
  };

  return (
    <div className="scriptModal">
      <div className="scriptModal__header">
        당신의 로봇 스크립트를 공유해주세요!
      </div>
      <div className="scriptModal__content">
        <div className="scriptModal__content-input text">
          <div className="scriptModal__content-input__header">
            로봇의 이름은 무엇인가요?
          </div>
          <Input
            type="text"
            onChange={onChangeTitle}
            value={title}
          />
        </div>
        <hr />

        <div className="scriptModal__content-input text">
          <div className="scriptModal__content-input__header">
            어떤 작업을 해주나요?
          </div>
          <Input
            type="textarea"
            rows="3"
            onChange={onChangeDesc}
            value={desc}
          />
        </div>
        <hr />

        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            시연 영상을 첨부해주세요.
          </div>
          <Input
            type="file"
            accept="video/*"
            onChange={onChangeVideo}
          />
        </div>
        <hr />

        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            로봇의 스크립트 파일을 첨부해주세요.
          </div>
          <Input
            type="file"
            onChange={onChangeScript}
          />
        </div>
        <hr />

        <div className="scriptModal__content-input user">
          <Input
            placeholder="작성자"
            type="text"
            onChange={onChangeAuthor}
            value={author}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={onChangePassword}
            value={password}
          />
        </div>
      </div>
      <div className="scriptModal__warnMsg">
        {showMsg && showMsg}
      </div>
      <div className="scriptModal__footer">
        <Button color="primary" onClick={successHandler}>업로드</Button>
        <Button color="danger" onClick={toggle}>닫기</Button>
      </div>
    </div>
  );
}

ScriptUploadModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default ScriptUploadModal;
