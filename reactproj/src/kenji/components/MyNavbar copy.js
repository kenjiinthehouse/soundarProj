import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { MdShoppingCart, MdSearch } from 'react-icons/md';
//選單連結使用 NavLink 取代 Link，不然有CSS上的問題
import { NavLink } from 'react-router-dom';
import logo from '../img/logofordark.svg';

function MyNavbar(props) {
  const [logged, setLogged] = useState(false);
  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  //samps

  useEffect(() => {
    props.initMemberAsync();
    // console.log("hi")
  }, []);

  useEffect(() => {
    if (props.member.nickname) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [props.member]);

  //

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  const loggedNav = (
    <Header className="d-flex row no-gutters">
      <div
        className="logo col-3 mr-auto"
        onClick={() => {
          props.history.push('/');
        }}
      ></div>
      <div>
        <Button
          ref={anchorRef}
          onClick={handleToggle}
          className="navBarCollapse"
        >
          <ReorderIcon />
        </Button>
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className="popper"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
            className="popper"
          >
            <Paper className="popper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Button
                      href="#"
                      key="1"
                      onClick={(event) => {
                        event.preventDefault();
                        props.history.push(`/memberedit`);
                      }}
                    >
                      加入播客
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      href="javascript"
                      onClick={(event) => {
                        event.preventDefault();
                        props.history.push(`/explore_home_page`);
                      }}
                      style={{ outline: 'none' }}
                    >
                      探索
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button href="#">商城</Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button href="#">專欄</Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <div className="navBarBtn">
        <Button
          href="#"
          key="1"
          onClick={(event) => {
            event.preventDefault();
            props.history.push(`/memberedit`);
          }}
        >
          加入播客
        </Button>
      </div>
      <div className="navBarBtn">
        <Button
          onClick={() => {
            props.history.push(`/explore_home_page`);
          }}
          style={{ outline: 'none' }}
        >
          探索
        </Button>
      </div>
      <div className="navBarBtn">
        <Button href="#">商城</Button>
      </div>
      <div className="navBarBtn">
        <Button href="#">專欄</Button>
      </div>

      <div className="diverVertical my-auto ml-2 mr-2"></div>
      <div className="navBarBtn">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="navBarBtn">
        {/* 會員 */}
        <IconButton ref={anchorRef} onClick={handleToggle}>
          <PersonIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className="popper"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
              className="popper"
            >
              <Paper className="popper">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button
                        href="#"
                        key="1"
                        onClick={(event) => {
                          event.preventDefault();
                          props.history.push(`/memberedit`);
                        }}
                      >
                        加入播客
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        href="javascript"
                        onClick={(event) => {
                          event.preventDefault();
                          props.history.push(`/explore_home_page`);
                        }}
                        style={{ outline: 'none' }}
                      >
                        探索
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button href="#">商城</Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button href="#">專欄</Button>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* samps登出 */}
      <div className="navBarBtn">
        <IconButton
          onClick={() => {
            props.logOutAsync();
          }}
        >
          <RiLogoutCircleRLine />
        </IconButton>
      </div>
      <div className="navBarBtn">
        <IconButton>
          <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </Header>
  );

  const notLoggedNav = (
    <Header className="d-flex row no-gutters">
      <div        
        className="logo col-3 mr-auto"
        onClick={() => {
          props.history.push('/');
        }}
      ></div>
      <div className="navBarBtn">
        <Button
          ref={anchorRef}
          onClick={handleToggle}
          className="navBarCollapse"
        >
          <ReorderIcon />
        </Button>
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className="popper"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
            className="popper"
          >
            <Paper className="popper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Button
                      href="#"
                      key="1"
                      onClick={(event) => {
                        event.preventDefault();
                        props.history.push(`/memberedit`);
                      }}
                    >
                      加入播客
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      onClick={() => {
                        props.history.push(`/explore_home_page`);
                      }}
                      style={{ outline: 'none' }}
                    >
                      探索
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button href="#">商城</Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button href="#">專欄</Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <div className="navBarBtn">
        <Button
          href="#"
          onClick={(event) => {
            event.preventDefault();
            props.history.push(`/memberedit`);
          }}
        >
          加入播客
        </Button>
      </div>
      <div className="navBarBtn">
        <Button
          onClick={() => {
            props.history.push(`/explore_home_page`);
          }}
          style={{ outline: 'none' }}
        >
          探索
        </Button>
      </div>
      <div className="navBarBtn">
        <Button href="#">商城</Button>
      </div>
      <div className="navBarBtn">
        <Button href="#">專欄</Button>
      </div>
      <div className="diverVertical my-auto ml-2 mr-2"></div>
      <div className="navBarBtn">
        {/* samps */}
        {/* <Button href="#">註冊</Button> */}
        <Button
          onClick={() => {
            props.history.push('/applymember');
          }}
        >
          註冊
        </Button>
      </div>
      <div className="navBarBtn">
        {/* samps */}
        {/* <Button href="#">登入</Button> */}
        <Button
          onClick={() => {
            props.history.push('/login');
          }}
        >
          登入
        </Button>
      </div>
      <div className="navBarLogInBtn navBarBtn">
        <Button href="#">
          <ExitToAppIcon />
        </Button>
      </div>
      <div className="diverVertical my-auto ml-2 mr-2"></div>
      <div className="navBarBtn">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="navBarBtn">
        <IconButton>
          <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </Header>
  );

  return logged ? loggedNav : notLoggedNav;
}

const mapStateToProps = (store) => {
  return { member: store.member };
};

export default withRouter(
  connect(mapStateToProps, { initMemberAsync, logOutAsync })(MyNavbar)
);
