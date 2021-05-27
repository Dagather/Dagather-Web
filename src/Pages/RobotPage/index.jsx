import React, { useState, useEffect } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import MainTab from 'Components/MainTab';
import Loader from 'Components/Loader';
import RobotController from 'Components/RobotController';

import { getProcesses } from 'Config/uipathConfig';

import tableBg from 'Assets/img/background/table.jpg';

import { UncontrolledAlert } from 'reactstrap';

function RobotPage() {
  const [alertList, setAlertList] = useState([]);
  const pushAlert = (elem) => {
    setAlertList((prevAlertList) => [...prevAlertList, elem]);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [processList, setProcessList] = useState([]);
  const showProcessList = () => processList.map((process) => <RobotController
    author={process.Authors}
    processName={process.Title}
    key={process.Key}
    pushAlert={(t) => pushAlert(t)}
  />);

  const getAlertColor = (isSuccess, isFinished) => {
    if (isSuccess && isFinished) return 'info';
    if (isSuccess) return 'success';
    return 'danger';
  };

  const getAlertMsg = (isSuccess, isFinished, isStopped) => {
    if (isSuccess && isFinished) return ' : Successfully Finished.';
    if (isSuccess) return ' : Job is proceeding...';
    if (isStopped) return ' : Job is stopped.';
    return ' : Fail to finsh job successfully.';
  };

  const showAlertList = () => (
    <div className="jobAlert">
      {
          alertList.map((alert) => (
            <UncontrolledAlert
              color={getAlertColor(alert.isSuccess, alert.isFinished)}
              className="jobAlert-alert"
            >
              <span className="jobAlert__name">
                {alert.name}
              </span>
              <span className="jobAlert__desc">
                {getAlertMsg(alert.isSuccess, alert.isFinished, alert.isStopped)}
              </span>
            </UncontrolledAlert>
          ))
        }
    </div>
  );

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
      {alertList.length > 0 && showAlertList()}
      {isLoading && <Loader />}
    </>
  );
}

export default RobotPage;
