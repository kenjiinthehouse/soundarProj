import React from 'react'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'

import logofordark from '../ch_svg/logofordark.svg'
import { NavLink } from 'react-router-dom'

function MyNavbar(props) {
  return (
    <>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand href="#home">
          <img src={logofordark}  height="15rem" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/activitymain">
              活動
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activitycart">
              活動結帳
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activityorder">
              活動訂單查詢
            </Nav.Link>
            <Nav.Link as={NavLink} to="/studiomain">
              場地
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MyNavbar
