import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { MdShoppingCart, MdSearch, } from 'react-icons/md';
//選單連結使用 NavLink 取代 Link，不然有CSS上的問題
import { NavLink } from 'react-router-dom';
import logo from '../img/logofordark.svg';

function MyNavbar(props) {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav"
        variant="dark"
        fixed="top"
      >
        {/* <Navbar.Brand className="navLogo" as={NavLink} to="/" exact>
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand> */}
        <Nav.Link className="navLogo flex-shrink-1" as={NavLink} to="/tod22o">
          <img src={logo} className="logo" alt="logo" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto navBtns">
            {/* 把Nav.Link作為NavLink來使用 */}
            {/* 一定要加上exact，不然首頁會一直點亮(active) */}
            <Nav.Link as={NavLink} to="/todo" className="">
              加入播客
            </Nav.Link>
            <Nav.Link as={NavLink} to="/product">
              探索
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              商城
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              專欄
            </Nav.Link>
          </Nav>
          <Nav className="navBtns2">
            <Nav.Link as={NavLink} to="/profile" className="">
              註冊
            </Nav.Link>
            <Nav.Link as={NavLink} to="/counter">
              登入
            </Nav.Link>
          </Nav>
          <Nav className="navBtns3">
            <Nav.Link as={NavLink} to="/search">
              <MdSearch />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              <MdShoppingCart />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;
