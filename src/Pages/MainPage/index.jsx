import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import MainTab from 'Components/MainTab';
import Tab from 'Components/MainTab/Tab';

import introduceText from 'Constants/introduce-text';

function Mainpage() {
  const getTab = () => (
    introduceText.map((text, index) => (
      <Tab key={text[1]} title={(index + 1).toString()} subTitle={text[1]}>
        {text[0]}
      </Tab>
    ))
  );

  return (
    <>
      <NavBar />
      <Jumbotron />
      <div className="container">
        <div className="mainPage">
          <MainTab title="서비스 소개">
            {getTab()}
          </MainTab>
          <MainTab title="RPA란?">
            testing
          </MainTab>
        </div>
      </div>
    </>
  );
}

export default Mainpage;
