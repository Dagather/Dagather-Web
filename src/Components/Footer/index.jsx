import React from 'react';

import { useHistory } from 'react-router-dom';

import pageNames from 'Constants/page-names';

import githubIcon from 'Assets/img/icon/github.svg';

function Footer() {
  const history = useHistory();
  const pages = pageNames.slice(0, pageNames.length - 1);
  const getContentToLink = () => (
    pages.map((page) => (
      <button
        type="button"
        onClick={() => {
          history.push({ pathname: `/${page.link}` });
        }}
        className="footer__contents__content"
        key={page.link}
      >
        {page.name}
      </button>
    ))
  );
  return (
    <div className="footer">
      <div className="footer__copyright">
        &copy; 2021. Dagather Co. all rights reserved.
      </div>
      <div className="footer__contents">
        <div className="footer__contents__content">
          <a href="https://github.com/Dagather/Dagather-Web">
            <img src={githubIcon} alt="gitLink" />
          </a>
        </div>
        {getContentToLink()}
      </div>
    </div>
  );
}

export default Footer;
