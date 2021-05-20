import React from 'react';

import PropTypes from 'prop-types';

import downloadIcon from 'Assets/img/icon/download.svg';

function SlateCard(props) {
  const { name, selected } = props;
  return (
    <div className="slateCard">
      <div className="slateCard__video">
        {selected && <iframe title="tmp" src="https://www.youtube.com/embed/u2LsOuztwsw" frameBorder="0" />}
        {/* 로봇/프로세스 제작 이후 로봇 동작 영상의 링크가 포함될 예정 */}
      </div>
      <div className="slateCard__text">
        <div className="slateCard__text__name">
          {name}
        </div>
        <div className="slateCard__text__detail">
          로봇에 대한 설명이 나타납니다.
        </div>
        <div className="slateCard__text__download">
          <span>다운로드 &nbsp;</span>
          <span><img src={downloadIcon} alt="down" /></span>
        </div>
      </div>
    </div>
  );
}

SlateCard.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default SlateCard;
