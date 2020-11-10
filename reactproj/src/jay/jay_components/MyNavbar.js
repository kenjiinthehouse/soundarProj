import React, { useEffect, useState } from 'react';
// 使用 ant-design布局及元件
import { Layout } from 'antd';
// 使用 material-ui 元件
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'; // icon式btn
import Badge from '@material-ui/core/Badge'; //購物車徽章
import { withStyles } from '@material-ui/core/styles'; //購物車徽章
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
// 使用 material-ui icon
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ReorderIcon from '@material-ui/icons/Reorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//scss
import navbar from './../jay_styles/navbar.scss';

//samps改動
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initMemberAsync, logOutAsync } from '../../actions/index';

// ant-design Layout
const { Header } = Layout;
// 購物車徽章
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -2,
    top: 0,
    // border: `1px none ${theme.palette.background.paper}`,
    padding: '0px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    backgroundColor: 'black',
  },
}));

function MyNavbar(props) {
  const [logged, setLogged] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
      <div className="logo col-3 mr-auto"></div>
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
                    <Button href="#" key="1">
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
        <Button href="#" key="1">
          加入播客
        </Button>
      </div>
      <div className="navBarBtn">
        <Button
          onClick={() => {
            props.history.push(`/explore_home_page`);
          }}
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
      <div>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div>
        <IconButton>
          <PersonIcon />
        </IconButton>
      </div>

      {/* samps登出 */}
      <div
        onClick={() => {
          props.logOutAsync();
        }}
      >
        <IconButton>
          <PersonIcon />
        </IconButton>
      </div>
      <div>
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
      <div className="logo col-3 mr-auto"></div>
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
                    <Button href="#" key="1">
                      加入播客
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      onClick={() => {
                        props.history.push(`/explore_home_page`);
                      }}
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
        <Button href="#">加入播客</Button>
      </div>
      <div className="navBarBtn">
        <Button
          onClick={() => {
            props.history.push(`/explore_home_page`);
          }}
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
      <div className="navBarLogInBtn">
        <Button href="#">
          <ExitToAppIcon />
        </Button>
      </div>
      <div className="diverVertical my-auto ml-2 mr-2"></div>
      <div>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div>
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
