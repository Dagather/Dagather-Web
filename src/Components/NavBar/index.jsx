import React from 'react';

import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Collapse,
  NavbarBrand,
} from 'reactstrap';

import pageNames from 'Constants/page-names';
import logo from 'Assets/img/logo/logo.png';
import searchImg from 'Assets/img/icon/search.svg';

function NavBar(props) {
  const navigatePage = (pageName) => {
    const { history } = props;
    history.push({ pathname: `/${pageName}` });
  };

  const getNavLink = () => pageNames.map((pageName) => (
    <NavItem className="navBar__container__col__routeTab__navItem" key={pageName.name}>
      <NavLink className="navBar__container__col__routeTab__navItem__navLink" onClick={() => navigatePage(pageName.link)}>
        {pageName.name === 'Search' ? <img src={searchImg} alt="searchImg" /> : pageName.name}
      </NavLink>
    </NavItem>
  ));

  return (
    <Navbar className="navBar" light expand="md">
      <div className="navBar__container">
        <NavbarBrand className="navBar__container__home" href="/">
          <img src={logo} alt="dagather" />
        </NavbarBrand>
        <Collapse className="navBar__container__col" isOpen={false} navbar>
          <Nav className="navBar__container__col__routeTab" navbar>
            {getNavLink()}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

NavBar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(NavBar);
