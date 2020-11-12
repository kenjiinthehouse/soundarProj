import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'

function ActivityOrderContent(props) {
    const {activityOrder, setActivityOrder} = props

         // 查看訂單細節
         function OpenOrder() {
            const [open, setOpen] = useState(false);      
            return (
              <>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="open-order"
                  aria-expanded={open}
                  className="btn-order"
                >
                  查看訂單細節
                </Button>
                <Collapse in={open}>
                  <div id="open-order">
                  <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單明細</h6></div>                                                              
                        <div className="order-info w-100">
                            <h5>訂單內容</h5>
                            <hr/>
                        </div>
                        <div className="order-info w-100">
                            <h5>收件人資訊</h5>
                            <hr/>
                            <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>收件人姓名</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>收件人手機</td>
                                            <td>0918-111-111</td>
                                        </tr>
                                        <tr>
                                            <td>收件人Email</td>
                                            <td>123@gmail.com</td>
                                        </tr>                                   
                                    </tbody>
                                </table>
                        </div>
                        <div className="order-info w-100">
                            <h5>付款資訊</h5>
                            <hr/>
                            <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>付款方式</td>
                                            <td>信用卡</td>
                                        </tr>
                                        <tr>
                                            <td>訂單備註</td>
                                            <td>無</td>
                                        </tr>                                                                    
                                    </tbody>
                            </table>
                        </div>
                  </div>
                </Collapse>
              </>
            );
          }

    return (
        <>
        <div className="order-number mt-2"><h6>訂單編號: {activityOrder.ticket_order_id}</h6></div>
                <div className="order-info d-flex justify-content-between w-100">
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>訂購日期</td>
                                    <td> {activityOrder.ticket_order_date}</td>
                                </tr>
                                <tr>
                                    <td>訂單狀態</td>
                                    <td> {activityOrder.order_status}</td>
                                </tr>
                                <tr>
                                    <td>訂單金額</td>
                                    <td>NT${activityOrder.total_amount}</td>
                                </tr>
                                <tr>
                                    <td>活動日期</td>
                                    <td>{activityOrder.activity_date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>購買項目</td>
                                    <td>{activityOrder.activity_name}</td>
                                </tr>
                                <tr>
                                    <td>電子票券</td>
                                    <td><img src={activityOrder.ticket_qrcode} /></td>
                                </tr>
                             </tbody>
                        </table>
                    </div>
                </div>     
                <OpenOrder />
        </>
    )
}

export default withRouter(ActivityOrderContent)