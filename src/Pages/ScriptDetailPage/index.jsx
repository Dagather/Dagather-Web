/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';

import { useHistory } from 'react-router-dom';

import { database, storage } from 'Config/firebaseConfig';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';

import CDU from 'Utils/create-download-url';

import communityBg from 'Assets/img/background/community.jpg';
import share from 'Assets/img/icon/share.svg';
import download from 'Assets/img/icon/download_white.svg';
import leftArrow from 'Assets/img/icon/leftArrow_white.svg';

function ScriptDetailPage({ match }) {
  const fbDatabase = database();
  const fbStorage = storage();
  const history = useHistory();
  const { scriptId } = match.params;
  const goBack = () => {
    history.goBack();
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [downloadCount, setDownloadCount] = useState(0);
  const [scriptPath, setScriptPath] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const fetchValues = () => {
    fbDatabase.ref('scriptData').child(scriptId).get().then(async (snapshot) => {
      if (snapshot.exists()) {
        const { title: t, author: a, desc: d, downloadCount: dc, scriptInfo: s } = snapshot.val();
        setTitle(t);
        setAuthor(a);
        setDesc(d);
        setDownloadCount(dc);
        const { scriptPath: sPath, videoPath: vPath } = s;
        setScriptPath(sPath);
        const embededVideoPath = await fbStorage.ref().child(vPath).getDownloadURL();
        setVideoPath(embededVideoPath);
      }
    });
  };

  const increaseDownloadCountWithTransaction = () => {
    fbDatabase.ref('scriptData').child(scriptId).transaction((script) => {
      if (script) {
        return {
          ...script,
          downloadCount: script.downloadCount + 1,
        };
      } return null;
    });
  };

  const onClickDownload = () => {
    setDownloadCount(downloadCount + 1); // provide immediate result to user interface
    CDU(scriptPath);
    increaseDownloadCountWithTransaction();
  };

  useEffect(() => {
    if (scriptId) fetchValues();
  }, [scriptId]);
  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />
      <div className="container">
        <div className="scriptDetailPage">
          <div className="scriptDetailPage__header">
            <div className="scriptDetailPage__header-title">
              {title}
            </div>
            <div className="scriptDetailPage__header-author">
              {`made by. ${author}`}
            </div>
            <button
              type="button"
              className="scriptDetailPage__header-goBackBtn"
              onClick={goBack}
            >
              <img src={leftArrow} alt="goBack" />
            </button>
          </div>
          <div className="scriptDetailPage__content">
            <div className="scriptDetailPage__content-cont">
              <div className="scriptDetailPage__content-label">
                로봇 상세정보
              </div>
              {desc}
            </div>
            <div className="scriptDetailPage__content-cont">
              <div className="scriptDetailPage__content-label">
                로봇 실행영상
              </div>
              <video controls width="70%" muted>
                {videoPath && (
                  <>
                    <source src={videoPath} type="video/mp4" />
                    동영상 로드 중 문제가 발생했습니다.
                  </>
                )}
              </video>
            </div>
          </div>
          <div className="scriptDetailPage__footer">
            <button type="button" className="scriptDetailPage__footer-btnContainer middle">
              <img src={share} alt="share_btn" />
            </button>

            <button type="button" className="scriptDetailPage__footer-btnContainer" onClick={onClickDownload}>
              <img src={download} alt="download_btn" />
              <span>{downloadCount}</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

ScriptDetailPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ScriptDetailPage;
