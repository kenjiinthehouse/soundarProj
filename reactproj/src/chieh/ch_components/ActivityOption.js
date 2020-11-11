import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { MdAddCircleOutline,MdRemoveCircleOutline } from 'react-icons/md'
import { Button, Accordion, Card, Modal, Form, Row, Col } from 'react-bootstrap'

function ActivityOption(props) {
  const [quantity, setQuantity] = useState(1)
  const [quantity2, setQuantity2] = useState(1)
  const [quantity3, setQuantity3] = useState(1)

  //立即報名Modal  
  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  // function addQuantity(){
  //   switch(quantity){
  //     case 1 :
  //       quantity0 === 1 ? alert('數量不可低於一張') : setQuantity0(quantity0 - 1);
  //       break;
  //     case 2 :
  //       quantity1 === 1 ? alert('數量不可低於一張') : setQuantity1(quantity1 - 1);
  //       break;
  //     case 3 :
  //       quantity2 === 1 ? alert('數量不可低於一張') : setQuantity2(quantity2 - 1);
  //       break;
  //     default:
  //   }
  // }

  return (
    <>
       {props.activityData.map((item)=>{
          return (
            <div className="container" key={item[0]}>
              <div className="option-item d-flex justify-content-between" >
                <div className="option-content">
                  <h4 key={item}>{item[0].ticket_option}</h4>
                  <li>11/30前報名享早鳥優惠價</li>
                  <li>課程附贈教材、午餐、午茶</li>
                  <li>每堂贈送《數位時代》三期 (課程隔月號起算)</li>            
                </div>
                <Accordion>                
                    <Card.Header className="d-flex flex-wrap justify-content-between">
                      <span style={{fontSize : '2rem', fontWeight:'bold', fontFamily:'Roboto'}}>NT$ {item[0].ticket_price} / 每人</span>
                      <Accordion.Toggle as={Button} eventKey="0" className="btn-select">
                        選擇
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      <div>
                        <p style={{fontSize: '1.25rem'}} className="mt-4">選擇數量</p>
                        <div className="d-flex justify-content-between counter align-items-center">
                          <span>人數</span>
                          <div className="d-flex justify-content-between align-items-center">
                            <MdRemoveCircleOutline style={{ fontSize: '2rem', color: quantity ===1 ? '#909393' : '#232d2f' }} 
                            onClick={() => { quantity === 1 ? alert('數量不可低於一張') : setQuantity(quantity - 1)}}/>

                            <span style={{ fontSize: '2rem' }}>{quantity}</span>

                            <MdAddCircleOutline style={{ fontSize: '2rem', color: quantity ===3 ? '#909393' : '#232d2f' }} 
                            onClick={() => {quantity === 3 ? alert('每人限購三張') : setQuantity(quantity + 1)}}/>
                          </div>              
                      </div>                      
                      <hr/>
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div className="mr-4">總金額</div>
                          <div style={{color:'#2690df', fontWeight:'bold', fontSize:'1.5rem', fontFamily:'Roboto'}}>
                            NT$ {`${quantity}`*`${item[0].ticket_price}`}</div>
                        </div>
                        <div className="d-flex justify-content-end">
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
                                <Form key={item}>
                              <Form.Group as={Row} controlId="formPlaintextEmail">
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

                              <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">方案</Form.Label>
                                <Col sm="10">
                                  <Form.Control plaintext readOnly defaultValue={item[0].ticket_option} />
                                </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">費用</Form.Label>
                                <Col sm="10">
                                  <Form.Control plaintext readOnly defaultValue={item[0].ticket_price} />
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
                                  <Form.Control plaintext readOnly defaultValue={`${quantity}`*`${item[0].ticket_price}`} />
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
                        </div>
                      </div>
                      </Card.Body>
                    </Accordion.Collapse>              
                </Accordion>
              </div>  

             
              <div className="option-item d-flex justify-content-between" >
                <div className="option-content">
                  <h4 key={item}>{item[1].ticket_option}</h4>
                  <li>11/30前報名享早鳥優惠價</li>
                  <li>課程附贈教材、午餐、午茶</li>
                  <li>每堂贈送《數位時代》三期 (課程隔月號起算)</li>            
                </div>
                <Accordion>                
                    <Card.Header className="d-flex flex-wrap justify-content-between">
                      <span style={{fontSize : '2rem', fontWeight:'bold', fontFamily:'Roboto'}}>NT$ {item[1].ticket_price} / 每人</span>
                      <Accordion.Toggle as={Button} eventKey="0" className="btn-select">
                        選擇
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      <div>
                        <p style={{fontSize: '1.25rem'}} className="mt-4">選擇數量</p>
                        <div className="d-flex justify-content-between counter align-items-center">
                          <span>人數</span>
                          <div className="d-flex justify-content-between align-items-center">
                            <MdRemoveCircleOutline style={{ fontSize: '2rem', color: quantity2 ===1 ? '#909393' : '#232d2f' }} 
                            onClick={() => { quantity2 === 1 ? alert('數量不可低於一張') : setQuantity2(quantity2 - 1)}}/>

                            <span style={{ fontSize: '2rem' }}>{quantity2}</span>

                            <MdAddCircleOutline style={{ fontSize: '2rem', color: quantity2 ===3 ? '#909393' : '#232d2f' }} 
                            onClick={() => {quantity2 === 3 ? alert('每人限購三張') : setQuantity2(quantity2 + 1)}}/>
                          </div>              
                      </div>                      
                      <hr/>
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div className="mr-4">總金額</div>
                          <div style={{color:'#2690df', fontWeight:'bold', fontSize:'1.5rem', fontFamily:'Roboto'}}>
                            NT$ {`${quantity2}`*`${item[1].ticket_price}`}</div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-option">立即報名</button>                        
                        </div>
                      </div>
                      </Card.Body>
                    </Accordion.Collapse>              
                </Accordion>
              </div> 

              <div className="option-item d-flex justify-content-between" >
                <div className="option-content">
                  <h4 key={item}>{item[2].ticket_option}</h4>
                  <li>11/30前報名享早鳥優惠價</li>
                  <li>課程附贈教材、午餐、午茶</li>
                  <li>每堂贈送《數位時代》三期 (課程隔月號起算)</li>            
                </div>
                <Accordion>                
                    <Card.Header className="d-flex flex-wrap justify-content-between">
                      <span style={{fontSize : '2rem', fontWeight:'bold', fontFamily:'Roboto'}}>NT$ {item[2].ticket_price} / 每人</span>
                      <Accordion.Toggle as={Button} eventKey="0" className="btn-select">
                        選擇
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      <div>
                        <p style={{fontSize: '1.25rem'}} className="mt-4">選擇數量</p>
                        <div className="d-flex justify-content-between counter align-items-center">
                          <span>人數</span>
                          <div className="d-flex justify-content-between align-items-center">
                            <MdRemoveCircleOutline style={{ fontSize: '2rem', color: quantity3 ===1 ? '#909393' : '#232d2f' }} 
                            onClick={() => { quantity3 === 1 ? alert('數量不可低於一張') : setQuantity3(quantity3 - 1)}}/>

                            <span style={{ fontSize: '2rem' }}>{quantity3}</span>

                            <MdAddCircleOutline style={{ fontSize: '2rem', color: quantity3 ===3 ? '#909393' : '#232d2f' }} 
                            onClick={() => {quantity3 === 3 ? alert('每人限購三張') : setQuantity3(quantity3 + 1)}}/>
                          </div>              
                      </div>                      
                      <hr/>
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div className="mr-4">總金額</div>
                          <div style={{color:'#2690df', fontWeight:'bold', fontSize:'1.5rem', fontFamily:'Roboto'}}>
                            NT$ {`${quantity3}`*`${item[2].ticket_price}`}</div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-option" >立即報名</button>                        
                        </div>
                      </div>
                      </Card.Body>
                    </Accordion.Collapse>              
                </Accordion>
              </div>               
         </div>         
           )
         })}
    </>
  )
}

export default withRouter(ActivityOption)