import React from 'react'
import { Link, Switch, withRouter } from 'react-router-dom'
import MyNavbar from '../ch_components/MyNavbar'
import { MdAddCircleOutline,MdRemoveCircleOutline } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { IoIosArrowDroprightCircle } from 'react-icons/io'


function ActivityCart(props){
    return(
        <>
            <MyNavbar />
            <div className="activity-cart">            
                <div className="container order-check">
                    <div className="order-title">
                        確認購買項目
                    </div>
                    <div className="d-flex">
                        <table class="table taable-striped table bordered">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-nowrap">活動名稱</th>
                                    <th scope="col" className="text-nowrap">單價</th>
                                    <th scope="col" className="text-nowrap">方案</th>
                                    <th scope="col" className="text-nowrap">數量</th>
                                    <th scope="col" className="text-nowrap">小計</th>
                                    <th scope="col" className="text-nowrap">刪除</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>跟上影音新浪潮｜<br/>Podcast企劃+影音內容+影音行銷</td>
                                    <td>$4,000</td>
                                    <td>早鳥票</td>
                                    <td><MdRemoveCircleOutline/>1<MdAddCircleOutline/></td>
                                    <td>$4,000</td>
                                    <td><TiDelete/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="col-5">
                            <div className="total-area">
                                <p>訂單總結</p>
                                <hr/>
                                <div>
                                    <span>訂單金額</span>
                                    <span>NT$ 4,000</span>
                                </div>
                                <div>
                                    <span>優惠券</span>
                                    <button className="btn btn-coupon">選擇優惠券</button>
                                </div>
                            </div>
                            <div className="total-amount">
                                <span>總金額</span>
                                <span>NT$ 4,000</span>
                            </div>
                            <button className="btn btn-select" onClick={()=>{props.history.push('/payment')}}>前往付款<IoIosArrowDroprightCircle/></button>
                        </div>
                    </div>                
                </div>
            </div>
        </>
    )
}

export default withRouter(ActivityCart)
