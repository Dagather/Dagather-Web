import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Slide from 'Components/Slide';

import tableBg from 'Assets/img/background/table.jpg';
import plus from 'Assets/img/icon/plus.svg';

function TestPage() {
  const tmpRobots = [
    {
      title: 'OCR을 활용한 Coivd-19 출입자명부 추출 로봇',
      author: '권혁진',
      likeNum: 120,
    },
    {
      title: '이메일 광고 필터링 로봇',
      author: '박재용',
      likeNum: 134,
    },
    {
      title: '스팀할인게임 목록 스크랩 로봇',
      author: '박제균',
      likeNum: 222,
    },
    {
      title: 'IT직군 이직/취업정보 스크랩 로봇',
      author: '김취업',
      likeNum: 351,
    },
    {
      title: '오늘의 핫토픽/핫이슈 레포트 로봇',
      author: '박대기',
      likeNum: 15,
    },
  ];

  const getRobotList = (needSort) => {
    const robotList = [...tmpRobots];
    if (needSort) {
      robotList.sort((a, b) => b.likeNum - a.likeNum);
      robotList.splice(5);
    }
    return robotList.map((robot) => <Slide
      key={robot.title}
      title={robot.title}
      author={robot.author}
      likeNum={robot.likeNum}
      color={needSort ? 'normal' : 'light'}
    />);
  };

  const pushRobotDetailPage = () => {
    console.log('push!');
  };

  return (
    <>
      <NavBar />
      <Jumbotron title="Pick a Robot." content="It's waiting for you." backgroundSrc={tableBg} />
      <div className="container">
        <div className="testPage">
          <span className="header">Popular</span>
          <div className="slideChart">
            {getRobotList(true)}
          </div>
          <div className="robotList__header">
            <span className="header">Robot List</span>
            <button type="button" className="robotList__addBtn" onClick={pushRobotDetailPage}>
              <img src={plus} alt="add" />
            </button>
          </div>
          <div className="robotList">
            {getRobotList()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestPage;
