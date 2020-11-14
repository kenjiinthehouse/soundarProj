import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../styles/Applymembership.scss';
import Passwordreset from './Passwordreset';

function Applymembership(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [account, setAccount] = useState('');
  const [accountrepeat, setAccountrepeat] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordcheck, setPasswordcheck] = useState('');
  const [nickname, setNickname] = useState('');
  // const [verify, setVerify] = useState(false)
  const [errormsg, setErrormsg] = useState([]);

  //password 狀態切換
  const [eyes, setEyes] = useState(1);
  const [passwordstate, setPasswordstate] = useState('password');

  //
  // sa-Applymembership-
  const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const mobile_pattern = /^09\d{2}-?\d{3}-?\d{3}$/;
  const password_pattern = /^.*(?!.*[^\x21-\x7e])(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/;

  const member_verify = function () {
    let Newerrormsg = [];

    if (accountrepeat) {
      Newerrormsg.push({ key: 1, msg: '帳號已有人使用請重新輸入' });
    }
    if (nickname.length == 0) {
      Newerrormsg.push({ key: 2, msg: '暱稱不可為空' });
    }
    if (!email_pattern.test(account)) {
      Newerrormsg.push({ key: 3, msg: '帳號不符合信箱格式' });
    }
    if (!password_pattern.test(password)) {
      Newerrormsg.push({ key: 4, msg: '密碼格式不合' });
    }
    if (password != passwordcheck) {
      Newerrormsg.push({ key: 5, msg: '兩次輸入的密碼不相符' });
    }
    setErrormsg(Newerrormsg);
    if (Newerrormsg.length == 0) {
      // register()
      handleShow2();
      register();
    } else {
      handleShow();
    }
  };

  const accountCheck = async function (a) {
    const url = 'http://localhost:5566/member/accountcheck';

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        account: account,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.repeat) {
        setAccountrepeat(true);
      } else {
        setAccountrepeat(false);
      }

      console.log(data);
    } catch (error) {}
  };
  const register = async function () {
    const url = 'http://localhost:5566/member/register';

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        account: account,
        password: password,
        nickname: nickname,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();

      console.log(data);
    } catch (error) {}
  };
   useEffect(() => {
    if (eyes == 1) {
      setPasswordstate('password');
    } else {
      setPasswordstate('text');
    }
  }, [eyes]);

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>溫馨提醒</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '8rem' }}>
        {errormsg.map((item, index) => (
          <div key={item.key}>{item.msg}</div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const messageModal2 = (
    <Modal
      show={show2}
      onHide={handleClose2}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>註冊成功</Modal.Title>
      </Modal.Header>
      <Modal.Body>驗證信已發出，請查看信箱</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.history.push('/');
          }}
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {messageModal2}
      {messageModal}

      <div className="sa-Applymembership-wrap">
        <div className="sa-Applymembership-box-container">
          <div className="sa-Applymembership-box">
            <div className="sa-Applymembership-title">
              <p>申請會員</p>
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">帳號(email)</label>
                <input
                  type="email"
                  className="form-control sa-Applymembership-account"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                  onBlur={() => {
                    accountCheck(account);
                  }}

                //   placeholder="Enter email"
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>
              <div className="form-group">
                <div className="sa-Podlogin-password-area">
                  <label htmlFor="exampleInputEmail1">
                    密碼(請使用6位以上的英數字組合)
                  </label>
                  <input
                    type={passwordstate}
                    className="form-control sa-Applymembership-password"
                    id="sa-Applymembership-nickname"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {eyes == 1 ? (
                    <div
                      className="sa-Podlogin-eyes"
                      onClick={() => {
                        setEyes(2);
                      }}
                    >
                      <img
                        className="sa-Podlogin-eyes-img"
                        src="sa_img/password/eye.svg"
                        alt=""
                      ></img>
                    </div>
                  ) : (
                    <div
                      className="sa-Podlogin-eyes"
                      onClick={() => {
                        setEyes(1);
                      }}
                    >
                      <img
                        className="sa-Podlogin-eyes-img"
                        src="sa_img/password/invisible.svg"
                        alt=""
                      ></img>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  確認密碼(請再輸入一次密碼)
                </label>
                <input
                  type="password"
                  className="form-control sa-Applymembership-password-check"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={passwordcheck}
                  onChange={(e) => {
                    setPasswordcheck(e.target.value);
                  }}
                //   placeholder="Enter email"
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">暱稱</label>
                <input
                  type="text"
                  className="form-control sa-Applymembership-nickname"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                //   placeholder="Enter email"
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>
              <div
                className="sa-Applymembership-enter-area sa-Applymembership-check-button"
                onClick={() => {
                  member_verify();
                }}
              >
                確認
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Applymembership);
