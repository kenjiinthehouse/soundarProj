import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import { initMember, initMemberAsync } from '../../actions/index';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../styles/Passwordreset.scss';

function Passwordreset(props) {
  // const [account, setAccount] = useState('')
  // const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('');
  const [passwordreset, setPasswordreset] = useState('');
  const [passworderror, setPassworderror] = useState(false);
  const [show, setShow] = useState(false);
  const [errormsg, setErrorMsg] = useState('密碼不可為空值');
  const [success, setSuccess] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eyes, setEyes] = useState(1);
  const [passwordstate, setPasswordstate] = useState('password');
  //密碼格式檢查
  const password_pattern = /^.*(?!.*[^\x21-\x7e])(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/;

  const passwordChange = async function (p) {
    const url = ' http://localhost:5566/member/passwordchange';

    const password = p;

    const sid = props.member.sid;
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: sid,
        password: password,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    try {
      const response = await fetch(request);
      const data = await response.json();
      console.log('data:', data);
      if (!data.success) {
        setErrorMsg('密碼不可與原本的相同');
        handleShow();
      }

      // console.log('data2', data2)
    } catch (error) {}
  };
  useEffect(() => {
    if (eyes == 1) {
      setPasswordstate('password');
    } else {
      setPasswordstate('text');
    }
  }, [eyes]);

  useEffect(() => {
    // console.log(uu.get('jwt'))
    if (!localStorage.getItem('jwt')) {
      const uu = new URLSearchParams(window.location.search);
      localStorage.setItem('jwt', JSON.stringify(uu.get('jwt')));
      props.initMemberAsync();
    }
    // setAccount(props.member.account)
    // setNickname(props.member.nickname)
    // props.member.nickname
  }, []);

  const checkPassword = function () {
    if (password.length == 0 && passwordreset == 0) {
      setPassworderror(true);
      setErrorMsg('密碼不可為空值');
    } else if (!password_pattern.test(password)) {
      setPassworderror(true);
      setErrorMsg('密碼格式不合');
    } else if (password != passwordreset) {
      setPassworderror(true);
      setErrorMsg('新密碼與確認密碼不同，請重新輸入');
    } else {
      setPassworderror(false);
    }
  };

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>提醒</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '3rem' }}>{errormsg}</Modal.Body>
      <Modal.Footer>
        {success ? (
          <Button
            variant="primary"
            onClick={() => {
              props.history.push('/');
            }}
          >
            前往首頁
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleClose}>
            確定
          </Button>
        )}
        {/* <Button
          variant="primary"
          onClick={() => {
            props.history.push('/cart')
          }}
        >
          前往購物車結帳
        </Button> */}
      </Modal.Footer>
    </Modal>
  );

  // sa-Passwordreset-
  return (
    <>
      {messageModal}
      <div className="sa-Passwordreset-wrap">
        <div className="sa-Passwordreset-box-container">
          <div className="sa-Passwordreset-box">
            <div className="sa-Passwordreset-title">
              <p>密碼重新設定</p>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">帳號(email)</label>
                <input
                  type="email"
                  className="form-control sa-Passwordreset-account"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={props.member.account}
                  disabled
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
                  className="form-control sa-Passwordreset-nickname"
                  id="sa-Passwordreset-nickname"
                  value={props.member.nickname}
                  disabled
                  //   aria-describedby="emailHelp"
                  //   placeholder="Enter email"
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>
              <div className="form-group">
                <div className="sa-Podlogin-password-area">
                  <label htmlFor="exampleInputEmail1">
                    新密碼(請使用6位以上的英數字組合)
                  </label>
                  <input
                    type={passwordstate}
                    className="form-control sa-Passwordreset-newpassword"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={() => {
                      if (passworderror) {
                        return checkPassword();
                      }
                    }}

                    //   placeholder="Enter email"
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
                <label htmlFor="exampleInputEmail1">確認密碼</label>
                <input
                  type="password"
                  className="form-control sa-Passwordreset-newpassword-check"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={passwordreset}
                  onChange={(e) => {
                    setPasswordreset(e.target.value);
                  }}
                  onBlur={() => {
                    checkPassword();
                  }}
                  //   placeholder="Enter email"
                />
                {!passworderror ? (
                  <></>
                ) : (
                  <small className="form-text  sa-Passwordreset-passworderror">
                    {errormsg}
                  </small>
                )}
              </div>
              <div
                className="sa-Passwordreset-enter-area sa-Passwordreset-check-button"
                onClick={() => {
                  if (passworderror || password.length == 0) {
                    handleShow();
                  } else if (password.length == 0) {
                    setErrorMsg('密碼不可為空值');
                    handleShow();
                  } else if (!password_pattern.test(password)) {
                    setErrorMsg('密碼格式不合');
                    handleShow();
                  } else if (password != passwordreset) {
                    setErrorMsg('新密碼與確認密碼不同，請重新輸入');
                    handleShow();
                  } else {
                    passwordChange(password);
                    setSuccess(true);
                    setErrorMsg('修改成功');
                    handleShow();
                  }
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

const mapStateToProps = (store) => {
  return { member: store.member };
};

export default withRouter(
  connect(mapStateToProps, { initMemberAsync })(Passwordreset)
);
