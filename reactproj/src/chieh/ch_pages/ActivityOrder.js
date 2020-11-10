import React, { useState, useEffect } from 'react'
import { Link, Switch, withRouter } from 'react-router-dom'
import MyNavbar from '../ch_components/MyNavbar'
import { Button, Collapse, Tabs, Tab } from 'react-bootstrap'

function ActivityOrder(props){

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

    // 切換訂單狀態
    function ControlledTabs() {
        const [key, setKey] = useState('complete');
      
        return (
          <Tabs
            id="controlled-tab-order"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="nav-pills d-flex justify-content-around"
          >
            <Tab eventKey="complete" title="已報名">
                <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200927T0001A</h6></div>
                <div className="order-info d-flex justify-content-between w-100">
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>訂購日期</td>
                                    <td>2020-09-27</td>
                                </tr>
                                <tr>
                                    <td>訂單狀態</td>
                                    <td>已付款</td>
                                </tr>
                                <tr>
                                    <td>訂單金額</td>
                                    <td>NT$4,000</td>
                                </tr>
                                <tr>
                                    <td>活動日期</td>
                                    <td>2020-10-27 09:00 ~ 12:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>購買項目</td>
                                    <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
                                </tr>
                                <tr>
                                    <td>電子票券</td>
                                    <td><img src={"http://localhost:3000/ch_img/QRCODE.png"} /></td>
                                </tr>
                             </tbody>
                        </table>
                    </div>
                </div>     
                <OpenOrder />
            </Tab>
            <Tab eventKey="unfinished" title="未完成">
                <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200927T0001A</h6></div>
                <div className="order-info d-flex justify-content-between w-100">
                    <div className="">
                        <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>訂購日期</td>
                                        <td>2020-09-27</td>
                                    </tr>
                                    <tr>
                                        <td>訂單狀態</td>
                                        <td>已付款</td>
                                    </tr>
                                    <tr>
                                        <td>訂單金額</td>
                                        <td>NT$4,000</td>
                                    </tr>
                                    <tr>
                                        <td>活動日期</td>
                                        <td>2020-10-27 09:00 ~ 12:00</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>購買項目</td>
                                    <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>     
                <OpenOrder />
            </Tab>
            <Tab eventKey="cancel" title="已取消">
                <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200927T0001A</h6></div>
                <div className="order-info d-flex justify-content-between w-100">
                    <div className="">
                        <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>訂購日期</td>
                                        <td>2020-09-27</td>
                                    </tr>
                                    <tr>
                                        <td>訂單狀態</td>
                                        <td>已付款</td>
                                    </tr>
                                    <tr>
                                        <td>訂單金額</td>
                                        <td>NT$4,000</td>
                                    </tr>
                                    <tr>
                                        <td>活動日期</td>
                                        <td>2020-10-27 09:00 ~ 12:00</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>購買項目</td>
                                    <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>     
                <OpenOrder />
            </Tab>
            <Tab eventKey="refund" title="退票紀錄">
                <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200927T0001A</h6></div>
                <div className="order-info d-flex justify-content-between w-100">
                    <div className="">
                        <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>訂購日期</td>
                                        <td>2020-09-27</td>
                                    </tr>
                                    <tr>
                                        <td>訂單狀態</td>
                                        <td>已付款</td>
                                    </tr>
                                    <tr>
                                        <td>訂單金額</td>
                                        <td>NT$4,000</td>
                                    </tr>
                                    <tr>
                                        <td>活動日期</td>
                                        <td>2020-10-27 09:00 ~ 12:00</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>購買項目</td>
                                    <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>     
                <OpenOrder />
            </Tab>
          </Tabs>
        );
      }

    return(
        <>
            <MyNavbar />
            <div className="activity-order">
                <div className="container d-flex">
                    <div className="member-bar">
                        <p>會員中心</p>
                    </div>
                    <div className="activity-order-list">
                        <div className="list-title mx-auto">活動票券訂單查詢</div>
                        <ControlledTabs />                         
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(ActivityOrder)

// <div className="container activity-order d-flex">
//                 <div className="member-bar">
//                     <p>會員中心</p>
//                 </div>
//                 <div className="order-list d-flex flex-wrap justify-content-center">
//                     <div className="list-title">活動票券訂單查詢</div>

//                     <div className="pagination d-flex justify-content-around">
//                         <div className="text-center this-o-pag-name"><a className="text-reset text-decoration-none" href="/">已報名</a></div>
//                         <div className="text-center o-pag-name"><a className="text-reset text-decoration-none" href="/">已取消</a></div>
//                         <div className="text-center o-pag-name"><a className="text-reset text-decoration-none" href="/">退票紀錄</a></div>
//                         <div className="text-center o-pag-name"><a className="text-reset text-decoration-none" href="/">未完成</a></div>
//                     </div> 
//                     <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200927T0001A</h6></div>
//                     <div className="order-info d-flex justify-content-between w-100">
//                         <div className="">
//                             <table class="table table-borderless">
//                                 <tbody>
//                                     <tr>
//                                         <td>訂購日期</td>
//                                         <td>2020-09-27</td>
//                                     </tr>
//                                     <tr>
//                                         <td>訂單狀態</td>
//                                         <td>已付款</td>
//                                     </tr>
//                                     <tr>
//                                         <td>訂單金額</td>
//                                         <td>NT$4,000</td>
//                                     </tr>
//                                     <tr>
//                                         <td>活動日期</td>
//                                         <td>2020-10-27 09:00 ~ 12:00</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="">
//                             <table class="table table-borderless">
//                                 <tbody>
//                                     <tr>
//                                         <td>購買項目</td>
//                                         <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
//                                     </tr>
//                                     <tr>
//                                         <td>電子票券</td>
//                                         <td><img src={"http://localhost:3000/ch_img/QRCODE.png"} /></td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>     
//                     <OpenOrder />
//                     <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單編號: 20200830T0001A</h6></div>
//                     <div className="order-info d-flex justify-content-between w-100">
//                         <div className="">
//                             <table class="table table-borderless">
//                                 <tbody>
//                                     <tr>
//                                         <td>訂購日期</td>
//                                         <td>2020-09-27</td>
//                                     </tr>
//                                     <tr>
//                                         <td>訂單狀態</td>
//                                         <td>已付款</td>
//                                     </tr>
//                                     <tr>
//                                         <td>訂單金額</td>
//                                         <td>NT$4,000</td>
//                                     </tr>
//                                     <tr>
//                                         <td>活動日期</td>
//                                         <td>2020-10-27 09:00 ~ 12:00</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="">
//                             <table class="table table-borderless">
//                                 <tbody>
//                                     <tr>
//                                         <td>購買項目</td>
//                                         <td>跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷</td>
//                                     </tr>
//                                     <tr>
//                                         <td>電子票券</td>
//                                         <td><img src={"http://localhost:3000/ch_img/QRCODE.png"} /></td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>     
//                     <OpenOrder />

                    {/* <button className="btn btn-outline-dark align-self-end">查看訂單細節</button> */}
                    {/* 展開訂單明細 */}
                    {/* <div className="bg-dark w-100 mt-4 pl-4"><h6 className="text-light">訂單明細</h6></div>                                                              
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
                    </div> */}
