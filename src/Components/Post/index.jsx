import React from 'react';

import { useHistory } from 'react-router-dom';

import leftArrow from 'Assets/img/icon/leftArrow.svg';
import download from 'Assets/img/icon/download.svg';

import { Button } from 'reactstrap';

function Post() {
  // 상위 컴포넌트한테 포스트 유니크 식별 번호 Props로 받은 뒤
  // 데이터베이스에서 유니크 식별 번호로 포스트 가져오는 방식으로 구현 예정.
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="post">
      <div className="post__tabs">
        <button className="post__tabs__back" type="button" onClick={goBack}>
          <img src={leftArrow} alt="arrow" />
        </button>
        <div className="post__tabs__buttons">
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>
      <hr />
      <div className="post__header">
        <div className="post__header__left">
          <div className="post__header__left__category">
            업로드
          </div>
          <div className="post__header__left__index">
            #1
          </div>
        </div>
        <div className="post__header__right">
          <div className="post__header__right__title">
            새로운 로봇을 업로드합니다.
          </div>
          <div className="post__header__right__down">
            <div className="post__header__right__down__writer">
              김로봇
            </div>
            <div className="post__header__right__down__date">
              2021-03-01
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="post__content">
        <div className="post__content__desc">
          상세내용
        </div>
        <hr />
        <div className="post__content__file">
          첨부파일
          <div className="post__content__file__download">
            <img src={download} alt="download" />
            <span>&nbsp;&nbsp;SuperRobot.json</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Post;
