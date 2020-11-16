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
import { RiLogoutCircleRLine } from 'react-icons/ri';
import MenuIcon from '@material-ui/icons/Menu';
//scss
import '../styles/MyNavbar.scss';

//samps改動
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initMemberAsync, logOutAsync } from '../../actions/index';

//jay改動
import InformLoginModal from './../../jay/jay_components/InformLoginModal';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function MyNavbar(props) {
  const [logged, setLogged] = useState(false);
  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const { navCartNum, setNavCartNum } = props;

  //jay
  const [showInformLoginModal, setShowInformLoginModal] = useState(false);

  //samps

  useEffect(() => {
    props.initMemberAsync();
    if (localStorage.getItem('cart')) {
      setNavCartNum(JSON.parse(localStorage.getItem('cart')).length);
    }
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

      <div className="navBarBtn navbar-desktop-rwd">
        <Button
          href="#"
          key="1"
          onClick={(event) => {
            event.preventDefault();
            if (props.member.sid) {
              props.history.push(`/memberedit`);
            } else {
              setShowInformLoginModal(true);
            }
          }}
        >
          加入播客
        </Button>
      </div>
      <div className="navBarBtn navbar-desktop-rwd">
        <Button
          onClick={() => {
            props.history.push(`/explore_home_page`);
          }}
          style={{ outline: 'none' }}
        >
          探索
        </Button>
      </div>
      <div className="navBarBtn navbar-desktop-rwd">
        <Button href="#">商城</Button>
      </div>
      <div className="navBarBtn navbar-desktop-rwd">
        <Button href="#">專欄</Button>
      </div>

      <div className="diverVertical my-auto ml-2 mr-2 navbar-desktop-rwd"></div>
      <div className="navBarBtn navbar-desktop-rwd">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="navBarBtn navbar-desktop-rwd">
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
                          if (props.member.sid) {
                            props.history.push(`/memberedit`);
                          } else {
                            setShowInformLoginModal(true);
                          }
                        }}
                      >
                        會員資料
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        onClick={() => {
                          props.history.push(`/audiocollect`);
                        }}
                        style={{ outline: 'none' }}
                      >
                        節目收藏
                      </Button>
                    </MenuItem>
                    {/* /channelcollect */}
                    <MenuItem onClick={handleClose}>
                      <Button
                        onClick={() => {
                          props.history.push(`/channelcollect`);
                        }}
                        style={{ outline: 'none' }}
                      >
                        頻道追蹤
                      </Button>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                      <Button href="#">專欄</Button>
                    </MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* samps登出 */}
      <div className="navBarBtn navbar-desktop-rwd">
        <IconButton
          onClick={() => {
            props.logOutAsync();
            props.history.push('/');
          }}
        >
          <RiLogoutCircleRLine />
        </IconButton>
      </div>
      <div className="navBarBtn navbar-desktop-rwd">
        <IconButton
          onClick={() => {
            props.history.push('/cart');
            console.log('11');
          }}
        >
          {/* 這邊需要接購物車props過來的length */}
          <StyledBadge badgeContent={navCartNum} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>

      {/* rwd menu */}
      <div className="navBarBtn navbar-cell-rwd">
        <IconButton ref={anchorRef} onClick={handleToggle}>
          <MenuIcon />
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
          href="#"
          onClick={(event) => {
            event.preventDefault();
            if (props.member.sid) {
              props.history.push(`/memberedit`);
            } else {
              setShowInformLoginModal(true);
            }
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
      {/* <div className="navBarLogInBtn navBarBtn">
        <Button href="#">
          <ExitToAppIcon />
        </Button>
      </div> */}
      <div className="diverVertical my-auto ml-2 mr-2"></div>
      <div className="navBarBtn">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="navBarBtn">
        <IconButton>
          <StyledBadge badgeContent={navCartNum} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
      <InformLoginModal
        show={showInformLoginModal}
        onHide={() => setShowInformLoginModal(false)}
        setShowInformLoginModal={setShowInformLoginModal}
      />
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
