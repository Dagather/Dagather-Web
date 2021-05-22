import React, { useState, useEffect } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Slide from 'Components/Slide';

import ScriptUploadModal from 'Components/Modals/ScriptUploadModal';

import { database } from 'Config/firebaseConfig';

import tableBg from 'Assets/img/background/table.jpg';
import plus from 'Assets/img/icon/plus.svg';

import { Modal } from 'reactstrap';

function ScriptPage() {
  const fbDatabase = database();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [slides, setSlides] = useState([]);

  const fetchScript = () => {
    fbDatabase.ref('scriptData').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataToArray = Object.entries(data); // 0: index, 1: value
        const slideList = dataToArray.map((d) => ({
          ...d[1],
          id: d[0],
        }));

        setSlides(slideList);
      }
    });
  };

  useEffect(() => {
    fetchScript();
  }, []);

  const getRobotList = (needSort) => {
    const robotList = [...slides];
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

  return (
    <>
      <NavBar />
      <Jumbotron title="Pick a Robot." content="It's waiting for you." backgroundSrc={tableBg} />
      <div className="container">
        <div className="scriptPage">
          <span className="header">Popular</span>
          <div className="slideChart">
            {getRobotList(true)}
          </div>
          <div className="robotList__header">
            <div className="robotList-filter">
              <span className="header">Robot List</span>
            </div>
            <button
              type="button"
              className="robotList__addBtn"
              onClick={toggle}
            >
              <img src={plus} alt="add" />
            </button>
          </div>
          <div className="robotList">
            {getRobotList()}
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={isOpen} toggle={toggle} className="script-modal">
        <ScriptUploadModal toggle={toggle} />
      </Modal>
    </>
  );
}

export default ScriptPage;
