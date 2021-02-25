import React from 'react';

import { useHistory } from 'react-router-dom';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import MainTab from 'Components/MainTab';
import Tab from 'Components/MainTab/Tab';
import Footer from 'Components/Footer';

import uiPathConfig from 'Config/uipathConfig';

import { serviceIntro, rpaIntro } from 'Constants/introduce-text';
import { firstJumboTextInMain, secondJumboTextInMain } from 'Constants/jumbotron-text';

import happy from 'Assets/img/icon/happy.svg';
import project from 'Assets/img/icon/project.svg';
import sandClock from 'Assets/img/icon/sandClock.svg';
import typo from 'Assets/img/icon/typo.svg';
import firstBackground from 'Assets/img/background/workingPeople.jpg';
import secondBackground from 'Assets/img/background/sittingPeople.png';

function Mainpage() {
  const history = useHistory();
  const getImgTag = (imgsrc, alt) => (
    <img src={imgsrc} alt={alt} />
  );
  const imgArray = [getImgTag(sandClock, 'sandClock'), getImgTag(happy, 'happy'), getImgTag(typo, 'typo'), getImgTag(project, 'project')];
  const getServiceTab = () => (
    serviceIntro.map((text, index) => (
      <Tab key={text[1]} title={(index + 1).toString()} subTitle={text[1]}>
        {text[0]}
      </Tab>
    ))
  );

  const getRPATab = () => (
    rpaIntro.map((text, index) => (
      <Tab key={text[1]} title={imgArray[index]} subTitle={text[1]}>
        {text[0]}
      </Tab>
    ))
  );

  return (
    <>
      <NavBar />
      <Jumbotron
        backgroundSrc={firstBackground}
        onClick={uiPathConfig}
        title={firstJumboTextInMain.title}
        content={firstJumboTextInMain.content}
        buttonName="Connect UiPath &nbsp;&nbsp; &gt;"
      />
      <div className="container">
        <div className="mainPage">
          <MainTab title="서비스 소개">
            {getServiceTab()}
          </MainTab>
          <hr />
          <MainTab title="RPA란?">
            {getRPATab()}
          </MainTab>
        </div>
      </div>
      <Jumbotron
        backgroundSrc={secondBackground}
        title={secondJumboTextInMain.title}
        content={secondJumboTextInMain.content}
        onClick={() => history.push({ pathname: '/robot' })}
        buttonName="Getting Started"
      />
      <Footer />
    </>
  );
}

export default Mainpage;
