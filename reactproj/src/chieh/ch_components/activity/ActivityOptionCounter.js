import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { MdAddCircleOutline,MdRemoveCircleOutline } from 'react-icons/md'
import { Accordion, Card} from 'react-bootstrap'

import ActivityOptionModal from './ActivityOptionModal'

function ActivityOptionCounter(props) {
  const {index, price, option,activityData,setActivityData} = props

  const [quantity, setQuantity] = useState(0)

  //立即報名Modal  
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

  return (
    <>
      <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      <div key={index}>
                        <p style={{fontSize: '1.25rem'}} className="mt-4">選擇數量</p>
                        <div className="d-flex justify-content-between counter align-items-center">
                          <span>人數</span>
                          <div className="d-flex justify-content-between align-items-center">
                            <MdRemoveCircleOutline style={{ fontSize: '2rem', color:quantity ===0 ? '#909393' : '#232d2f' }} 
                            onClick={()=>{quantity === 0 ? alert('數量不可低於一張'): setQuantity(quantity - 1)}}/>

                            <span style={{ fontSize: '2rem' }} id={index}>{quantity}</span>

                            <MdAddCircleOutline style={{ fontSize: '2rem', color:quantity ===3 ? '#909393' : '#232d2f' }} 
                            onClick={() => {quantity === 3 ? alert('每人限購三張') : setQuantity(quantity + 1)}}/>
                          </div>              
                      </div>                      
                      <hr/>
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div className="mr-4">總金額</div>
                          <div style={{color:'#2690df', fontWeight:'bold', fontSize:'1.5rem', fontFamily:'Roboto'}}>
                            NT$ {`${quantity}`*`${price}`}</div>
                        </div>

                        {/* 票券數量大於0時才能報名 */}
                        {quantity>0 ? 
                        <div className="d-flex justify-content-end">
                          <ActivityOptionModal 
                          quantity={quantity} 
                          total={`${quantity}`*`${price}`} 
                          option={option}
                          ticket_price={price}
                          activityData={activityData} 
                          setActivityData={setActivityData}
                          />
                        </div>
                        : ''                        
                        }

                      </div>
                      </Card.Body>
                    </Accordion.Collapse>      
    </>
  )
}

export default withRouter(ActivityOptionCounter)