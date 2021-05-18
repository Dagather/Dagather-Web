/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
import React from 'react';

import NavBar from 'Components/NavBar';
import MainTab from 'Components/MainTab';
import Tab from 'Components/MainTab/Tab';

import uipathlogo from 'Assets/img/logo/uipath-logo.jpeg';
import aboutpageText from 'Constants/aboutpage-text';
import aboutpageMember from 'Constants/aboutpage-members';

import reactLogo from 'Assets/img/logo/react-logo.jpeg';
import firebaseLogo from 'Assets/img/logo/firebase-logo.jpeg';
import projectReport from 'Assets/pdf/capstonereport.pdf';


function AboutPage() {
  const uiPathImage = <img src={uipathlogo} alt={uipathlogo} />;
  const getText = () => (
    aboutpageText.map((text, index) => (
      <Tab title={!index && uiPathImage} key={text[2]}>
        <>
          {text[0]}
        </>
      </Tab>
    )));

  const getMember = () => (
    aboutpageMember.map((text, index) => (
      <Tab title={text[0]} key={text[1]}>
        <>
          <li>{text[1]}</li>
          <li>{text[2]}</li>
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
          <MainTab title="구성원">
            {getMember()}
          </MainTab>
          <MainTab title="기술 스택">
            <img src={reactLogo} alt="react-Logo" />
            <img src={firebaseLogo} alt="react-Logo" />
          </MainTab>
        </div>
      </div>
      <footer>&copy; 2021, Dagather</footer>
    </>
  );
}

export default AboutPage;
