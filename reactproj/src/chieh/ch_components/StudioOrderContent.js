import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'

function StudioOrderContent(props) {
    const {studioOrder, setStudioOrder} = props

    //Collapse查看訂單細節
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="order-number mt-2"><h6>訂單編號: {studioOrder.rent_order_id}</h6></div>
            <div className="order-info w-100">
                <div className="d-flex mr-3">
                    <div className="order-info-title">
                        <ul className="list-unstyled">                            
                            <li>訂單時間</li>
                            <li>訂單狀態</li>
                            <li>訂單金額</li>
                            <li>預訂錄音室</li>
                            <li>預訂日期</li>
                        </ul>
                    </div>
                    <div className="order-info-content">
                        <ul className="list-unstyled">                           
                            <li>{studioOrder.rent_order_date.slice(0,10)}</li>
                            <li>
                            {studioOrder.order_status==0?'已完成':
                            studioOrder.order_status==1?'已預訂':
                            studioOrder.order_status==2?'未完成':
                            studioOrder.order_status==3?'已取消':
                            ''
                            }</li>
                            <li>NT${studioOrder.total_amount}</li>
                            <li>{studioOrder.studio_name}</li>
                            <li>{studioOrder.rent_date.slice(0,10)}&emsp;{studioOrder.rent_time}</li>
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
                                        <li>預訂錄音室</li>
                                        <li>錄音室地址</li>
                                        <li>預訂日期</li>
                                        <li>預約時段</li>
                                        <li>預訂方案</li>
                                    </ul>
                                </div>
                                <div className="detail-content">
                                    <ul className="list-unstyled">
                                        <li>{studioOrder.studio_name}</li>
                                        <li>{studioOrder.studio_location}</li>
                                        <li>{studioOrder.rent_date}</li>
                                        <li>{studioOrder.rent_time}</li>
                                        <li>{studioOrder.studio_option}</li>
                                    </ul>
                                </div>
                                <div className="detail-img ml-auto"><img src={studioOrder.studio_main_img} alt=""/></div>
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

export default withRouter(StudioOrderContent)