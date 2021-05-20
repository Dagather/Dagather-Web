import React from 'react';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';

import communityBg from 'Assets/img/background/community.jpg';
import thumb from 'Assets/img/icon/thumb_white.svg';
import share from 'Assets/img/icon/share.svg';
import download from 'Assets/img/icon/download_white.svg';
import leftArrow from 'Assets/img/icon/leftArrow.svg';

function ScriptDetailPage(props) {
  const history = useHistory();
  const { scriptId } = props;
  console.log(scriptId);

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />
      <div className="container">
        <div className="scriptDetailPage">
          <div className="scriptDetailPage__header">
            <div className="scriptDetailPage__header-title">
              OCR을 활용한 COVID-19 출입자명부 추출 로봇
            </div>
            <div className="scriptDetailPage__header-author">
              made by. 권혁진
            </div>
            <button
              type="button"
              className="scriptDetailPage__header-goBackBtn"
              onClick={goBack}
            >
              <img src={leftArrow} alt="goBack" />
            </button>
          </div>
          <div className="scriptDetailPage__content">
            <div className="scriptDetailPage__content-cont">
              <div className="scriptDetailPage__content-label">
                로봇 상세정보
              </div>
              {`이 로봇은 무료로 코로나 명부를 엑셀 파일로 추출해줍니다.
              
              OCR을 활용해 문자인식해 사용자 손수 작업량을 줄여줍니다.`}
            </div>
            <div className="scriptDetailPage__content-cont">
              <div className="scriptDetailPage__content-label">
                로봇 실행영상
              </div>
              <iframe title="tmp" src="https://www.youtube.com/embed/u2LsOuztwsw" frameBorder="0" />
            </div>
          </div>
          <div className="scriptDetailPage__footer">
            <button type="button" className="scriptDetailPage__footer-btnContainer">
              <img src={thumb} alt="add_like" />
              <span>121</span>
            </button>

            <button type="button" className="scriptDetailPage__footer-btnContainer middle">
              <img src={share} alt="share_btn" />
            </button>

            <button type="button" className="scriptDetailPage__footer-btnContainer">
              <img src={download} alt="download_btn" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

ScriptDetailPage.propTypes = {
  scriptId: PropTypes.string.isRequired,
};

export default ScriptDetailPage;
