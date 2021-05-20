import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function ScriptUploadModal(props) {
  const { toggle } = props;

  return (
    <div className="scriptModal">
      <div className="scriptModal__header">
        당신의 로봇 스크립트를 공유해주세요!
      </div>
      <div className="scriptModal__content">
        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            어떤 작업을 해주나요?
          </div>
          <input type="text" placeholder="로봇의 기능을 설명해주세요." />
        </div>
        <div className="scriptModal__content-input">
          <div className="scriptModal__content-input__header">
            시연 영상을 첨부해주세요.
          </div>
          <input type="file" accept="video/*" placeholder="로봇의 기능을 설명해주세요." />
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
