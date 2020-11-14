import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'

function ActivityOrderContent(props) {
    const {activityOrder, setActivityOrder} = props

    //Collapse查看訂單細節
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="order-number mt-2"><h6>訂單編號: {activityOrder.ticket_order_id}</h6></div>
            <div className="order-info d-flex w-100">
                <div className="d-flex mr-3">
                    <div className="order-info-title">
                        <ul className="list-unstyled">
                            <li>購買項目</li>
                            <li>訂購日期</li>
                            <li>訂單狀態</li>
                            <li>訂單金額</li>
                            <li>活動日期</li>
                        </ul>
                    </div>
                    <div className="order-info-content">
                        <ul className="list-unstyled">
                        <li>{activityOrder.activity_name}</li>
                            <li>{activityOrder.ticket_order_date.slice(0,10)}</li>
                            <li>{activityOrder.order_status}</li>
                            <li>NT${activityOrder.total_amount}</li>
                            <li>{activityOrder.activity_date}</li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="order-info-title">
                        <ul className="list-unstyled">                                        
                            <li>{activityOrder.ticket_qrcode.length == 0 ? '' : '電子票券'}</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-unstyled">                                        
                            <li><img src={activityOrder.ticket_qrcode} /></li>
                        </ul>
                    </div>
                </div>                            
            </div>
            <div className="check-detail d-flex flex-row-reverse">
                <button onClick={() => setOpen(!open)}
                aria-controls="open-order"
                aria-expanded={open}  
                className="btn-order">查看訂單細節</button>
            </div>     
                
                <Collapse in={open}>
                  <div id="open-order">
                  <div className="order-detail"><h6 style={{color: '#232D2F'}}>訂單明細</h6></div>                                                              
                        <div className="order-info w-100">
                            <h5>訂單內容</h5>    
                            <hr/>
                            <div className="d-flex">
                                <div className="detail-title">
                                    <ul className="list-unstyled">
                                        <li>活動名稱</li>
                                        <li>活動地址</li>
                                        <li>活動日期</li>
                                        <li>報名方案</li>
                                    </ul>
                                </div>
                                <div className="detail-content">
                                    <ul className="list-unstyled">
                                        <li>{activityOrder.activity_name}</li>
                                        <li>{activityOrder.activity_location}</li>
                                        <li>{activityOrder.activity_date}</li>
                                        <li>{activityOrder.ticket_option}</li>
                                    </ul>
                                </div>
                            </div>                            
                        </div>
                        <div className="order-info w-100">
                            <h5>收件人資訊</h5>
                            <hr/>
                            <div className="d-flex">
                                <div className="detail-title">
                                    <ul className="list-unstyled">
                                        <li>收件人姓名</li>
                                        <li>收件人手機</li>
                                        <li>收件人Email</li>
                                    </ul>
                                </div>
                                <div className="detail-content">
                                    <ul className="list-unstyled">
                                        <li>{activityOrder.name}</li>
                                        <li>{activityOrder.phone}</li>
                                        <li>{activityOrder.account}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="order-info w-100">
                            <h5>付款資訊</h5>
                            <hr/>
                            <div className="d-flex">
                                <div className="detail-title"> 
                                    <ul className="list-unstyled">
                                        <li>付款方式</li>
                                        <li>訂單備註</li>
                                    </ul>
                                </div>
                                <div className="detail-content">
                                    <ul className="list-unstyled">
                                        <li>ATM轉帳</li>
                                        <li>無</li>
                                    </ul>
                                </div>
                            </div>
                        </div>    
                    </div>
                </Collapse>
        </>
    )
}

export default withRouter(ActivityOrderContent)