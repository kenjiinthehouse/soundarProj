import React from 'react'
import './../ch_styles/custom.scss';
import { Link, Switch, withRouter } from 'react-router-dom'
import PaymentStep from '../ch_components/PaymentStep'
import { IoIosArrowDroprightCircle } from 'react-icons/io'



function Payment(props){
    return(
        <>
            <div className="activity-payment">            
                <PaymentStep />
                <div className="container data-area">
                    <form className="form-area">
                        <h5>信用卡付款</h5>
                        <hr/>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">信用卡卡號</label>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="inputEmail3" />
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="inputEmail3" />
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="inputEmail3" />
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">有效期限</label>
                            <div class="col-sm-1">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="MM"/>
                            </div>
                            <div class="col-sm-1">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="YY"/>
                            </div>

                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">背面末3碼</label>
                            <div class="col-sm-1">
                                <input type="email" class="form-control" id="inputEmail3"/>
                            </div>                                              
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">持卡人姓名</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">持卡人手機</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        {/* 收件資料 */}
                        <h5>收件人資料</h5>
                        <hr/>
                        <div class="form-group row">
                            <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck1" />
                                <label class="form-check-label" htmlFor="gridCheck1">
                                同訂購人資料
                                </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">收件人姓名</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="請輸入收件人的姓名" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">收件人手機</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="請輸入收件人的手機號碼" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">收件人Email</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="請輸入收件人的電子郵箱" />
                            </div>
                            <label htmlFor="inputEmail3" class="col-sm-3 col-form-label">電子票券將寄至此電子郵箱</label>
                        </div>
                    </form>
                    {/* <a className="text-reset text-decoration-none btn btn-success" href="/payment">完成訂單<IoIosArrowDroprightCircle/></a> */}
                    <button type="submit" class="btn btn-secondary" onClick={()=>{props.history.push('/')}}>完成訂購<IoIosArrowDroprightCircle/></button>
                </div>
            </div>
        </>
    )
}

export default withRouter(Payment)
