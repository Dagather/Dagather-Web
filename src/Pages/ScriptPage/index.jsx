import React, { useState, useEffect, useRef } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Slide from 'Components/Slide';

import ScriptUploadModal from 'Components/Modals/ScriptUploadModal';
import Loader from 'Components/Loader';

import { database } from 'Config/firebaseConfig';

import tableBg from 'Assets/img/background/table.jpg';
import plus from 'Assets/img/icon/plus.svg';

import { Modal } from 'reactstrap';

function ScriptPage() {
  const slideChartRef = useRef();
  const fbDatabase = database();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isLoading, setIsLoading] = useState(false);

  const [slides, setSlides] = useState([]);

  const fetchScript = async () => {
    await fbDatabase.ref('scriptData').on('value', (snapshot) => {
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

  const scrollHandler = (e) => {
    e.preventDefault();
    const target = slideChartRef.current;
    const scrollPos = slideChartRef.current.scrollLeft;

    target.scrollTo({
      top: 0,
      left: scrollPos - e.deltaY * 50,
    });
  };

  useEffect(() => {
    async function fetchScriptInEffect() {
      setIsLoading(true);
      await fetchScript();
      setIsLoading(false);
    }
    fetchScriptInEffect();
    if (slideChartRef && slideChartRef.current) {
      slideChartRef.current.addEventListener('wheel', scrollHandler, { capture: true, passive: false });
    }
    return (
      slideChartRef.current.removeEventListener('wheel', scrollHandler)
    );
  }, []);

  const getRobotList = (needSort) => {
    const robotList = [...slides];
    if (needSort) {
      robotList.sort((a, b) => b.downloadCount - a.downloadCount);
      robotList.splice(5);
    }
    return robotList.map((robot) => <Slide
      key={robot.title}
      title={robot.title}
      author={robot.author}
      downloadCount={robot.downloadCount}
      id={robot.id}
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
          <div className="slideChart" ref={slideChartRef} onWheel={scrollHandler}>
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
      {isLoading && <Loader />}
    </>
  );
}

export default ScriptPage;
