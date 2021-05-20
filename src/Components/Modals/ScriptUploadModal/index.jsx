import React from 'react';

import PropTypes from 'prop-types';

import { Input, Button } from 'reactstrap';

function ScriptUploadModal(props) {
  const { toggle } = props;

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
          <Input type="text" />
        </div>
        <hr />

        <div className="scriptModal__content-input text">
          <div className="scriptModal__content-input__header">
            어떤 작업을 해주나요?
          </div>
          <Input type="textarea" rows="3" />
        </div>
        <hr />

        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            시연 영상을 첨부해주세요.
          </div>
          <Input type="file" accept="video/*" />
        </div>
        <hr />

        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            로봇의 스크립트 파일을 첨부해주세요.
          </div>
          <Input type="file" />
        </div>
        <hr />

        <div className="scriptModal__content-input user">
          <Input
            placeholder="작성자"
            type="text"
          />
          <Input
            placeholder="비밀번호"
            type="password"
          />
        </div>
      </div>
      <div className="scriptModal__footer">
        <Button color="primary">업로드</Button>
        <Button color="danger" onClick={toggle}>닫기</Button>
      </div>
    </div>
  );
}

ScriptUploadModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default ScriptUploadModal;
