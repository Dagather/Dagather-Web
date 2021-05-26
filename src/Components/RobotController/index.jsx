import React, { useState } from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getReleaseInfo, getRobotId, startJob, getJob } from 'Config/uipathConfig';

import play from 'Assets/img/icon/play.svg';
import pause from 'Assets/img/icon/pause.svg';

import { Spinner } from 'reactstrap';

const Robot = styled.div`
position: relative;
background-color: ${(props) => (props.color === 'light' ? '#4cc2bb' : 'lightseagreen')};
min-width: 30%;
min-height: 130px;
padding: 1rem;
margin: 0.5rem;

border-radius: 8px;

cursor: pointer;
display: flex;
flex-direction: row;
justify-content: space-between;

box-shadow: 4px 4px 4px lightgray;

&:hover {
    background-color: ${(props) => (props.color === 'light' ? '#31908b' : '#14716c')};
    transform: scale(1.05);
    transition: transform 300ms ease;
}
`;

const Text = styled.div`
color: white;
font-family: 'MontserratBold';
`;

const Title = styled(Text)`
font-size: 1.8rem;
`;

const Author = styled(Text)`
font-size: 1.5rem;
font-family 'IBMPlexSansKR-Regular';
`;

const Button = styled.button`
all: unset;
margin: 0.5rem 0;

&:hover {
transform: scale(1.3);
}
`;

const Play = styled(Button)`

`;

const Pause = styled(Button)`
`;

const LeftCont = styled.div`
`;
const RightCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const RobotSpinner = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

function RobotController(props) {
  const { processName, author, pushAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [jobFinishChecker, setJobFinishChecker] = useState(null);

  const isJobRunning = () => !!jobFinishChecker;

  const pushAlertByRobot = (isSuccess, isFinished) => {
    pushAlert({
      name: processName,
      isSuccess,
      isFinished,
    });
  };

  const startJobByRobot = async () => {
    try {
      const releaseInfo = await getReleaseInfo(processName);
      if (releaseInfo) {
        const { orgId, key } = releaseInfo;
        const robotId = await getRobotId(orgId, 'mo_iz_to_@naver.com-unattended');

        if (robotId) {
          const jobInfo = await startJob(orgId, key, robotId);
          if (jobInfo) {
            const jobId = jobInfo.value[0].Id;
            return {
              jobId,
              orgId,
            };
          }
        }
      } return null;
    } catch (error) {
      return null;
    }
  };

  const playBtnHandler = async () => {
    setIsLoading(true);

    const result = await startJobByRobot();
    pushAlertByRobot(!!result, false);

    if (result) {
      const interval = setInterval(async () => {
        const { jobId, orgId } = result;
        const jobInfo = await getJob(jobId, orgId);
        if (jobInfo) {
          if (jobInfo.State === 'Successful') {
            pushAlertByRobot(true, true);
            clearInterval(interval);
            setJobFinishChecker(null);
          } else if (jobInfo.State === 'Faulted') {
            pushAlertByRobot(false, false);
            clearInterval(interval);
            setJobFinishChecker(null);
          }
        }
      }, 1000 * 15);
      setJobFinishChecker(interval);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Robot>
        <LeftCont>
          <Title>{processName}</Title>
          <Author>{author}</Author>
        </LeftCont>
        <RightCont>
          <Play onClick={playBtnHandler} isJobRunning={isJobRunning()}>
            <img src={play} alt="playBtn" />
          </Play>
          {isJobRunning() && (
          <Pause>
            <img src={pause} alt="pauseBtn" />
          </Pause>
          )}

        </RightCont>
        {isLoading && (
        <RobotSpinner>
          <Spinner />
        </RobotSpinner>
        )}
      </Robot>
    </>
  );
}

RobotController.propTypes = {
  processName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  pushAlert: PropTypes.func.isRequired,
};

export default RobotController;
