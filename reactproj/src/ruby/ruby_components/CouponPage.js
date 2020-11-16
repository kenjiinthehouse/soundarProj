import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './../ruby_styles/CouponPage.scss'

function CouponPage(props){
    const [ couponState, setCouponState ] = useState(3)
    const [ allCouponDisplay, setAllCouponDisplay ] = useState([])
    const [ clientCouponDisplay, setClientCouponDisplay ] = useState([])
    // const [ couponUsed, setCouponUsed ] = useState([])
    const [ newCouponDisplay, setNewCouponDisplay ] = useState([])

    

    function getAllCoupon(){
        axios({
            method: 'get',
            baseURL: 'http://localhost:5566',
            url: '/coupon/get',
            'Content-Type': 'application/json',
          })
            .then((result) => { 
                const newAllData = result.data.data
                setAllCouponDisplay(newAllData)
            })
            .catch((err) => { console.error(err) })
    }

    function getClientCoupon(){
        axios({
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
             .then((res) => { 
                    getClientCoupon()
             })
             .catch((error) => { console.log(error) })
    }

    useEffect(()=>{
        getAllCoupon()
        getClientCoupon()
    },[props.member])

    useEffect(()=>{
        let clientCouponSid = clientCouponDisplay.map(item=>{
            return item.coupon_sid
        })
        const newData = allCouponDisplay.filter(item=> clientCouponSid.indexOf(item.sid) === -1)
        setNewCouponDisplay(newData)
    },[clientCouponDisplay,allCouponDisplay])

    return(
        <>
            <div className="coupon-page">
                <div className="ru-coupon-page-wrap">
                    <div className="ru-coupon-title">
                        <h4>我的優惠券</h4>
                    </div>
                    <main className="ru-coupon-main w-100">
                        <div className="ru-coupon-switch-tab d-flex justify-content-around">
                            <div className={couponState === 3 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(3) }}>領取優惠券</div>
                            <div className={couponState === 0 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(0) }}>未使用</div>
                            <div className={couponState === 1 ? "coupon-tab coupon-active" : "coupon-tab"} onClick={() => { setCouponState(1) }}>已使用</div>
                        </div>
                        <div className={ couponState === 3 ? "ru-coupon-container d-flex flex-wrap justify-content-start" : "ru-coupon-container px-2"}>
                        { couponState === 3 
                            ?
                            newCouponDisplay.map(item =>{
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
                        { couponState === 0 || couponState === 1
                            ?
                            clientCouponDisplay.filter(item => item.used === couponState).map(item => {
                                return(
                                    <div className="ru-my-coupon d-flex justify-content-between">
                                        <div className={ couponState === 0 ? "coupon-deco-orange" : "coupon-deco-gray"}></div>
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
                                        <div className={ couponState === 0 ? "coupon-use-detail d-flex flex-column justify-content-around" : "coupon-use-detail d-flex flex-column justify-content-around already-used"}>
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
                            : null
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