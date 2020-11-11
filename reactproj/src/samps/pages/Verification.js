import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../styles/Verification.scss';

function Verification(props) {
  // sa-Verification-

  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendmail = async function (email) {
    const url = 'http://localhost:5566/mail/passwordreset';

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        mail: email,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    try {
      const response = await fetch(request);
      const data = await response.json();
      if (!data.success) {
        handleShow();
      } else {
        verify();
      }
      // data會是一個物件值
      console.log(data);
    } catch (error) {
      //setError(error)
    }
    console.log(email);
  };

  const verify = function () {
    setSuccess(true);
    // sendmail(email)
    handleShow();
  };

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {/* <Modal.Header closeButton></Modal.Header> */}
      <Modal.Header>
        <Modal.Title>提醒</Modal.Title>
      </Modal.Header>
      {success ? (
        <Modal.Body style={{ height: '3rem' }}>
          密碼重置信已發出，請查看信箱
        </Modal.Body>
      ) : (
        <Modal.Body style={{ height: '3rem' }}>
          您輸入的信箱尚未註冊，請重新輸入
        </Modal.Body>
      )}
      <Modal.Footer>
        {success ? (
          <Button
            variant="secondary"
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
  return (
    <>
      {messageModal}
      <div className="sa-Verification-wrap">
        <div className="sa-Verification-box-container">
          <div className="sa-Verification-box">
            <div className="sa-Verification-title">
              <p>寄送驗證信</p>
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">帳號(email)</label>
                <input
                  type="email"
                  className="form-control sa-Verification-account"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>

              <div
                className="sa-Verification-enter-area sa-Verification-check-button"
                onClick={() => {
                  sendmail(email);
                }}
              >
                確認
              </div>

              <div
                className="sa-Verification-previous-page sa-Verification-check-button"
                onClick={() => {
                  props.history.goBack();
                }}
              >
                上一頁
              </div>

              {/* <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Verification);
