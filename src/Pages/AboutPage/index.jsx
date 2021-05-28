import React from 'react';

import NavBar from 'Components/NavBar';
import MainTab from 'Components/MainTab';

import uipathlogo from 'Assets/img/logo/uipath-logo.jpeg';
import aboutpageMember from 'Constants/aboutpage-members';

import reactLogo from 'Assets/img/logo/react-logo.jpeg';
import firebaseLogo from 'Assets/img/logo/firebase-logo.jpeg';
import gitHubLogo from 'Assets/img/logo/github.svg';
import gMailLogo from 'Assets/img/logo/gmail.svg';

function AboutPage() {
  const getMember = () => (
    aboutpageMember.map((text) => (
      <>
        <div className="aboutPage__members">
          <h2>{text[0]}</h2>
          <br />
          <div>
            <a href={text[1]}><img src={gitHubLogo} alt="github-logo" className="aboutPage__members__github" /></a>
            <a href={text[2]}><img src={gMailLogo} alt="gmail-logo" className="aboutPage__members__mail" /></a>
          </div>
          <strong><p>{text[3]}</p></strong>
        </div>
      </>
    )));
  return (
    <>
      <NavBar />
      <div className="aboutPage">
        <MainTab title="구성원">
          {getMember()}
        </MainTab>
        <MainTab className="aboutPage__tech" title="기술 스택">
          <div className="aboutPage__tech__react">
            <img src={reactLogo} alt="react-Logo" />
          </div>
          <div className="aboutPage__tech__firebase">
            <img src={firebaseLogo} alt="firebase-Logo" />
          </div>
          <div className="aboutPage__tech__uipath">
            <img src={uipathlogo} alt="uipath-Logo" />
          </div>
        </MainTab>
      </div>
      <footer>&copy; 2021, Dagather</footer>
    </>
  );
}

export default AboutPage;
