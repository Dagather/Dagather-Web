import React, { useState, useEffect } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import MainTab from 'Components/MainTab';
import Loader from 'Components/Loader';
import RobotController from 'Components/RobotController';

import { getProcesses } from 'Config/uipathConfig';

import tableBg from 'Assets/img/background/table.jpg';

function RobotPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [processList, setProcessList] = useState([]);
  const showProcessList = () => processList.map((process) => <RobotController
    isActive={process.IsActive}
    author={process.Authors}
    processName={process.Title}
    key={process.Key}
  />);

  useEffect(() => {
    async function loadProcess() {
      setIsLoading(true);
      const pl = await getProcesses();
      setProcessList(pl);
      setIsLoading(false);
    }

    loadProcess();
  }, []);

  return (
    <>
      <NavBar />
      <Jumbotron title="Pick a Robot." content="It's waiting for you." backgroundSrc={tableBg} />
      <div className="container">
        <div className="robotPage">
          <MainTab title="로봇 리스트">
            {processList.length && showProcessList()}
          </MainTab>
        </div>
      </div>
      <Footer />
      {isLoading && <Loader />}
    </>
  );
}

export default RobotPage;
