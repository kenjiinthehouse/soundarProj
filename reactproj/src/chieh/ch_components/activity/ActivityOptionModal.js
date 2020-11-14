import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

//以下是samps小小改動(寄信功能)
import { connect } from 'react-redux';

const sendmail = async function (account) {
  const url = 'http://localhost:5566/mail/activitymail';
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
  const response = await fetch(request);
  const data = await response.json();
  console.log('mes', data.message);
};


function ActivityOptionModal(props) {
  const {
    total,
    quantity,
    option,
    ticket_price,
    activityData,
    setActivityData,
  } = props;

  //立即報名Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="btn btn-option" onClick={handleShow}>
        立即報名
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="activity-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>確認報名項目</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activityData.map((item) => {
            return (
              <>
                <div className="d-flex">
                  <div>
                    <ul>
                      <li>活動名稱</li>
                      <li>活動日期</li>
                      <li>方案</li>
                      <li>費用</li>
                      <li>數量</li>
                      <li>小計</li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>{item[0].activity_name}</li>
                      <li>{item[0].activity_date}</li>
                      <li>{option}</li>
                      <li>{ticket_price}</li>
                      <li>{quantity}</li>
                      <li>{total}</li>
                    </ul>
                  </div>
                </div>                 
              </>
            );
          })}
        </Modal.Body>           

        <Modal.Header>
          <Modal.Title>報名資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div>
              <ul>
                <li>姓名</li>
                <li>手機</li>
                <li>E-mail</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>{props.member.nickname}</li>
                <li>0975379482</li>
                <li>{props.member.account}<span>轉帳通知及電子票券將寄至此信箱</span></li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          {/* samps */}
          {/* <Button variant="primary" type="submit" onClick={handleClose}>
            完成報名
          </Button> */}
          <Button
            variant="primary"
            onClick={() => {
              sendmail(props.member.account);
              handleClose();
            }}
          >
            完成報名
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
//samps
const mapStateToProps = (store) => {
  return { member: store.member };
};

export default withRouter(connect(mapStateToProps)(ActivityOptionModal));