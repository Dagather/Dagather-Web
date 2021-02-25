import React from 'react';

import PropTypes from 'prop-types';

import downloadIcon from 'Assets/img/icon/download.svg';

function SlateCard(props) {
  const { name } = props;
  return (
    name && (
      <div className="slateCard">
        <div className="slateCard__video">
          <iframe title="tmp" src="https://www.youtube.com/embed/8A-HnnZqJ5o" frameBorder="0" />
        </div>
        <div className="slateCard__text">
          <div className="slateCard__text__name">
            {name}
          </div>
          <div className="slateCard__text__detail">
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
            이 로봇은 무료로 커피를 사다 바칩니다.
          </div>
          <div className="slateCard__text__download">
            <span>다운로드 &nbsp;</span>
            <span><img src={downloadIcon} alt="down" /></span>
          </div>
        </div>
      </div>
    )
  );
}

SlateCard.propTypes = {
  name: PropTypes.string,
};

SlateCard.defaultProps = {
  name: '',
};

export default SlateCard;
