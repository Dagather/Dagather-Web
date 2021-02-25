import React, { useState } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Card from 'Components/Card';
import SlateCard from 'Components/Card/SlateCard';
import MainTab from 'Components/MainTab';

import tableBg from 'Assets/img/background/table.jpg';

function RobotPage() {
  const [selectedCard, selectCard] = useState('로봇에 대한 설명이 나타납니다.');
  const tmpArray = ['1. 커피셔틀', '2. 문서정리셔틀', '3. 날씨수집셔틀', '4. 회의자료정리셔틀',
    '5. 영수증정리셔틀', '6. 최저가수집셔틀', '7. 주식정보수집셔틀', '8. 기타 잡 셔틀',
    '9. 실험용', '10. 동규밥주기'];
  const getCard = () => (
    <>
      <div className="robotPage__tabs">
        {tmpArray.map((tmpTitle) => (
          <Card key={tmpTitle[0]} title={tmpTitle} onClick={() => selectCard(tmpTitle)} />
        ))}
      </div>
      <SlateCard name={selectedCard} />
    </>
  );
  return (
    <>
      <NavBar />
      <Jumbotron title="Pick a Robot." content="It's waiting for you." backgroundSrc={tableBg} />
      <div className="container">
        <div className="robotPage">
          <MainTab title="로봇 리스트">
            {getCard()}
          </MainTab>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RobotPage;
