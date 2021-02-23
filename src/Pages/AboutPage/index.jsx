import React from 'react';

import NavBar from 'Components/NavBar';
import MainTab from 'Components/MainTab';
import Tab from 'Components/MainTab/Tab';

import uipathlogo from 'Assets/img/logo/uipath-logo.jpeg';
import aboutpageText from 'Constants/aboutpage-text';

function AboutPage() {
  const uiPathImage = <img src={uipathlogo} alt={uipathlogo} />;
  const getText = () => (
    aboutpageText.map((text, index) => (
      <Tab title={!index && uiPathImage} key={text[0]}>
        <>
          {text[0]}
        </>
      </Tab>
    )));

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="aboutPage">
          <MainTab title="프로젝트 개요">
            {getText()}
          </MainTab>
          <MainTab title="구성원" />
          <MainTab title="기술 스택" />
        </div>
      </div>
      <footer>&copy; 2021, Dagather</footer>
    </>
  );
}

export default AboutPage;
