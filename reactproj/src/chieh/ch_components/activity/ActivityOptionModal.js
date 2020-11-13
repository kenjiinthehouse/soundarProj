import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'

function ActivityOptionModal(props) {
  const {total,quantity,option,ticket_price,activityData,setActivityData} = props

  //立即報名Modal  
  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  


  return (
    <>
      <button type="button" className="btn btn-option" onClick={handleShow}>立即報名</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title>確認報名項目</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {activityData.map((item)=>{
          return(
            <>
            <Form.Group as={Row} controlId="formPlaintextEmail" key={item}>
            <Form.Label column sm="2">活動名稱</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={item[0].activity_name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">活動日期</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={item[0].activity_date} />
            </Col>
          </Form.Group>
          </> 
          )
        })}
          
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">方案</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={option} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">費用</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={ticket_price} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">數量</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={quantity} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">小計</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={total} />
            </Col>
          </Form.Group>  
          <hr />
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">報名者姓名</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="michael" />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">報名者手機</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="0977777555" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">報名者E-mail</Form.Label>
            <Col sm="4">
              <Form.Control plaintext readOnly defaultValue="michael.sps168@gmail.com" />
            </Col>
            <Col sm="6">
              <Form.Text className="text-muted">電子票券將寄至此信箱</Form.Text>
            </Col>                                
          </Form.Group>                         
        </Form>                             
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          取消
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>完成報名</Button>
      </Modal.Footer>
      </Modal>

    </>
  )
}

export default withRouter(ActivityOptionModal)