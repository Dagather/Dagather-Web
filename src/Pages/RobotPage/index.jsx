import React, { useState, useCallback } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Card from 'Components/Card';
import SlateCard from 'Components/Card/SlateCard';
import MainTab from 'Components/MainTab';

import tableBg from 'Assets/img/background/table.jpg';

function RobotPage() {
  const [selectedCard, selectCard] = useState('');
  const tmpArray = ['1. 로봇1', '2. 로봇2', '3. 로봇3', '4. 로봇4',
    '5. 로봇5', '6. 로봇6', '7. 로봇7', '8. 로봇8',
    '9. 로봇9', '10. 로봇10'];
  // Firebase 연동 이후, 로봇 스크립트 및 로봇 이름 받아오는 것 구현 이후에 재작성 예정.
  const getCard = useCallback(() => {
    console.log('getCard Rendered!');
    return (
      <>
        <div className="robotPage__tabs">
          {tmpArray.map((tmpTitle) => (
            <Card
              key={tmpTitle}
              title={tmpTitle}
              onClick={() => selectCard(tmpTitle)}
              style={selectedCard}
            />
          ))}
        </div>
      </>
    );
  }, [tmpArray]);
  return (
    <>
      <NavBar />
      <Jumbotron title="Pick a Robot." content="It's waiting for you." backgroundSrc={tableBg} />
      <div className="container">
        <div className="robotPage">
          <MainTab title="로봇 리스트">
            {getCard()}
            <SlateCard name={selectedCard} selected={!!selectedCard} />
          </MainTab>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RobotPage;
