import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';

import pageNames from 'Constants/page-names';
import logo from 'Assets/img/logo/logo.png';
import searchImg from 'Assets/img/icon/search.svg';

function NavBar() {
  const history = useHistory();

  const navigatePage = (pageName) => {
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
        <Nav className="navBar__container__col__routeTab" navbar>
          {getNavLink()}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavBar;
