import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './../ruby_styles/CouponPage.scss'

function CouponPage(props){
    const [ couponState, setCouponState ] = useState(0)
    const [ couponPoolData, setCouponPoolData ] = useState([]) // origin data
    const [ clientCouponDisplay, setClientCouponDisplay ] = useState([])
    // const [ couponUsed, setCouponUsed ] = useState([])
    const [ CouponDisplay, setCouponDisplay ] = useState([]) // 領取優惠券
    const [ unUsedCouponDisplay, setUnUsedCouponDisplay ] = useState([]) // 領取優惠券
    const [ usedCouponDisplay, setUsedCouponDisplay ] = useState([]) // 領取優惠券


    

    function getAllCoupon(){
        return axios({
            method: 'get',
            baseURL: 'http://localhost:5566',
            url: '/coupon/get',
            'Content-Type': 'application/json',
          })
            .then((result) => { 
                const newAllData = result.data.data
                setCouponPoolData(newAllData)
            })
            .catch((err) => { console.error(err) })
    }

    function getClientCoupon(){
        return axios({
            method: 'get',
            baseURL: 'http://localhost:5566',
            url: '/coupon/client/get',
            'Content-Type': 'application/json',
            params: {client_sid:props.member.sid}
          })
            .then((result) => { 
                const newData = result.data.data
                setClientCouponDisplay(newData)
            })
            .catch((err) => { console.error(err) })
    }

    function setTimeFormat(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function insertNewCoupon(item){
        let data = {
            client_sid : props.member.sid,
            coupon_sid : item.sid,
            used : 0
        }
        axios.post('http://localhost:5566/coupon/client/insert',data)
             .then(() => {
                 getClientCoupon()
             })
             .catch((error) => { console.log(error) })
    }
    function initData() {
        console.log('initData',clientCouponDisplay)
        let clientCouponSid = clientCouponDisplay.map(item=>{
            return item.coupon_sid
        })
        const newData = couponPoolData.filter(item=> clientCouponSid.indexOf(item.sid) === -1)
            console.log(newData)
        setCouponDisplay(newData)
    }
    useEffect(()=>{
        getAllCoupon()
        getClientCoupon()
    },[props.member])

    useEffect(()=>{
        let unUsedData = clientCouponDisplay.filter(item=>{return item.used === 0})
        let usedData = clientCouponDisplay.filter(item=>{return item.used === 1})
        let clientCouponSid = clientCouponDisplay.map(item=>{
            return item.coupon_sid
        })
        const couponData = couponPoolData.filter(item=> clientCouponSid.indexOf(item.sid) === -1)
        setCouponDisplay(couponData) // 領取優惠券
        setUnUsedCouponDisplay(unUsedData) // 未使用優惠券
        setUsedCouponDisplay(usedData) // 已使用優惠券
    },[clientCouponDisplay,couponPoolData])

    return(
        <>
            <div className="coupon-page">
                <div className="ru-coupon-page-wrap">
                    <div className="ru-coupon-title">
                        <h4>我的優惠券</h4>
                    </div>
                    <main className="ru-coupon-main w-100">
                        <div className="ru-coupon-switch-tab d-flex justify-content-around">
                            <div className={couponState === 0 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(0) }}>領取優惠券</div>
                            <div className={couponState === 1 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(1) }}>未使用</div>
                            <div className={couponState === 2 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(2) }}>已使用</div>
                        </div>
                        <div className={couponState === 0 ? "ru-coupon-container d-flex flex-wrap justify-content-start":"ru-coupon-container px-2"}>
                        { couponState === 0 
                            ?
                            CouponDisplay.map(item =>{
                                return( 
                                    <div className="ru-collect-coupon d-flex flex-column">
                                        <div className="collect-coupon-topic">
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>*此禮券限使用一次</p>
                                                <p>消費需滿${item.minimum_amount}方可使用</p>
                                            </div>
                                        </div>
                                        <div className="collect-coupon-discount p-3">
                                            <span>NT$</span>
                                            <h2>{item.discount}</h2>
                                        </div>
                                        <div className="collect-coupon-btn p-2" onClick={()=>{
                                           insertNewCoupon(item)
                                        }}>領取優惠券</div>
                                    </div>
                                )
                                })
                            
                            : null
                        }
                        {   couponState === 1 ? 
                            unUsedCouponDisplay.map(item => {
                                return(
                                    <div className="ru-my-coupon d-flex justify-content-between">
                                        <div className="coupon-deco-orange"></div>
                                        <div className="coupon-info d-flex justify-content-between align-items-center">
                                            <div className="ru-coupon-name-block w-50">
                                                <div className="ru-coupon-name d-flex flex-column align-items-center">
                                                    {item.name}
                                                </div>
                                                <div className="ru-coupon-guide">
                                                    <p>*此禮券限使用一次</p>
                                                    <p>消費需滿${item.minimum_amount}方可使用</p>
                                                </div>
                                            </div>
                                            <div className="ru-coupon-discount w-50">
                                                ${item.discount}
                                            </div>
                                        </div>
                                        <div className="coupon-use-detail d-flex flex-column justify-content-around">
                                            <div className="coupon-exp-date">
                                                <div>使用期限</div>
                                                <div>
                                                    <span className="pr-2">{setTimeFormat(item.start_date)}</span>~
                                                    <span className="pl-2">{ item.end_date ? setTimeFormat(item.end_date) : '無期限'}</span>
                                                </div>
                                            </div>
                                            <div className="ru-coupon-number d-flex justify-content-end">
                                                <span>折價券編碼</span>
                                                <div className="ru-coupon-sid">{item.sid}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :null
                        }
                        {   couponState === 2 ?
                            usedCouponDisplay.map(item => {
                                return(
                                    <div className="ru-my-coupon d-flex justify-content-between">
                                        <div className="coupon-deco-gray"></div>
                                        <div className="coupon-info d-flex justify-content-between align-items-center">
                                            <div className="ru-coupon-name-block w-50">
                                                <div className="ru-coupon-name d-flex flex-column align-items-center">
                                                    {item.name}
                                                </div>
                                                <div className="ru-coupon-guide">
                                                    <p>*此禮券限使用一次</p>
                                                    <p>消費需滿${item.minimum_amount}方可使用</p>
                                                </div>
                                            </div>
                                            <div className="ru-coupon-discount w-50">
                                                ${item.discount}
                                            </div>
                                        </div>
                                        <div className="coupon-use-detail d-flex flex-column justify-content-around already-used">
                                            <div className="coupon-exp-date">
                                                <div>使用期限</div>
                                                <div>
                                                    <span className="pr-2">{setTimeFormat(item.start_date)}</span>~
                                                    <span className="pl-2">{ item.end_date ? setTimeFormat(item.end_date) : '無期限'}</span>
                                                </div>
                                            </div>
                                            <div className="ru-coupon-number d-flex justify-content-end">
                                                <span>折價券編碼</span>
                                                <div className="ru-coupon-sid">{item.sid}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :null
                        }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (store) => {
    return {member: store.member}
}
export default withRouter(connect(mapStateToProps)(CouponPage))