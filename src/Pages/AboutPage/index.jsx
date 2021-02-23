/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

import React from 'react';

import NavBar from 'Components/NavBar';
import MainTab from 'Components/MainTab';
import Tab from 'Components/MainTab/Tab';

import uipathlogo from 'Assets/img/logo/uipath-logo.jpeg';
import aboutpageText from 'Constants/aboutpage-text';

function AboutPage() {
  const getText = () =>
    aboutpageText.map((text) => <Tab key={text[0]}>{text[0]}</Tab>);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="aboutPage">
          <MainTab title="프로젝트 개요" />
          <img src={uipathlogo} alt={uipathlogo} />
          {getText()}
          <MainTab title="구성원" />
          <MainTab title="기술 스택" />
        </div>
      </div>
      <footer>&copy; 2021, Dagather</footer>
    </>
  );
}

export default AboutPage;
