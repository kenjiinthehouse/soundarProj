import React, { useEffect, useState } from 'react'
import './../ruby_styles/ProductAmountList.scss'
// import { MdNavigateNext, MdStayCurrentLandscape } from 'react-icons/md'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function ProductAmountList(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {mycartDisplay,setMycartDisplay} = props;
    const [discount,setDiscount] = useState(0)
    const [couponDisplay, setCouponDisplay] = useState([])
    // 折價券ID
    const [coupon, setCoupon] = useState('')
    // 訂單金額
    const [orderAmount, setOrderAmount] = useState(0)
    // 總金額
    const [totalAmount, setTotalAmount] = useState(0)

    const {dFee, setDFee} = props

    const path = useLocation().pathname
    function getCoupon(sid){
        axios({
            method: 'get',
            baseURL: 'http://localhost:5566',
            url: '/coupon/client/get?client_sid=1',
            'Content-Type': 'application/json',
          })
            .then((result) => { 
                const newData = result.data.data
                const newDisplay = newData.map(item => {
                    item.isActive = false
                    return item
                })
                setCouponDisplay(newDisplay)
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

    // 將選到的sid往外丟
    const handleSubmit = () => {
        let discountNum = couponDisplay.filter(item => item.isActive === true)
                                        .map(item => item.discount)[0] 
        let couponSid = couponDisplay.filter(item => item.isActive === true)
                                        .map(item => item.sid)[0]
        setCoupon(couponSid)
        setDiscount(discountNum)
        handleClose()
    }
    const disableUse = () => {
        let couponActiveArr = couponDisplay.filter(item => item.isActive)
        if(couponActiveArr.length === 1){
            return false
        }
        else return true
    }
    const sum = (items,dis = 0) => {
        if(!items || items.length === 0)
            return 0
        let total = 0
        for (let i = 0; i < items.length; i++) {
          total += items[i].count * items[i].price
        }
        total = total - dis
        return total
    }
    useEffect(()=>{
        let total = 0
            total = orderAmount - discount + dFee
            setTotalAmount(total)
    },[orderAmount, discount,dFee])

    useEffect(()=>{
        if(path === '/checkout') {
            let data = {}
            if(localStorage.getItem('amountData'))
                data = JSON.parse(localStorage.getItem('amountData'))
                setDiscount(data.discount)
                setCoupon(data.coupon)
                setOrderAmount(data.amount)
                setTotalAmount(data.totalAmount)
        }
        
    },[path])

    useEffect(()=>{
        if(path === '/cart') {
            setOrderAmount(sum(mycartDisplay,0))
            setTotalAmount(sum(mycartDisplay,discount))
            let amountObj = {
                discount:discount,
                coupon:coupon,
                amount:orderAmount,
                totalAmount:totalAmount,
                products:mycartDisplay,
                dfee:dFee
            }
            localStorage.setItem('amountData', JSON.stringify(amountObj))
        }
    },[coupon, discount, mycartDisplay, totalAmount, orderAmount, path, dFee])

    return(
        <>
        <div className="amount-list">
            <Modal show={show} onHide={handleClose} className="ru-amountlist-modal">
                <Modal.Header closeButton style={{ backgroundColor: '#44494A',color: '#F8F8F8' }}>
                <Modal.Title>我的優惠券</Modal.Title>
                </Modal.Header>
                    <Modal.Body >
                        {couponDisplay.map(value => {
                            return(
                                <div className="ru-cart-coupon-card noselect"
                                    onClick={()=> {
                                        let newData = couponDisplay.map(item => {
                                            if(item.sid === value.sid)
                                                item.isActive = true
                                            else
                                                item.isActive = false
                                            return item
                                        })
                                        setCouponDisplay(newData)
                                }} key={value}>
                                <div className="ru-cart-coupon-discount" key={value.sid}>
                                    <div className="ru-cart-discount-num">{value.discount}</div>
                                    <div className="ru-cart-discount-name">{value.name}</div>
                                </div>
                                <div className={value.isActive ? "ru-cart-coupon-info ru-cart-coupon-active" : "ru-cart-coupon-info"}>
                                    <div className="ru-cart-coupon-id ml-auto">{value.sid}</div>
                                    <div className="ru-cart-coupon-exp">使用期限</div>
                                    <span className="ru-cart-coupon-date mr-2">{setTimeFormat(value.start_date)}</span>
                                    <span>到</span>
                                    <span className="ru-cart-coupon-date ml-2">{value.end_date  ? setTimeFormat(value.end_date) : '無期限'}</span>
                                    <div className="ru-cart-coupon-rule mt-2">*此禮券限使用一次</div>
                                    <div className="ru-cart-coupon-rule">消費需滿${value.minimum_amount}方可使用</div>
                                </div>
                            </div>)})}
                       </Modal.Body> 
                <Modal.Footer style={{ backgroundColor: '#44494A',color: '#F8F8F8' }}>
            {
                disableUse()
                ?
                <Button variant="primary use-btn radius-btn" onClick={handleSubmit} disabled>
                    立即使用
                </Button>
                :
                <Button variant="primary use-btn radius-btn" onClick={handleSubmit} >
                    立即使用
                </Button>
            }
                </Modal.Footer>
            </Modal>
            <aside className="">
                <div className="ru-cart-amount-info">
                    <div className="ru-cart-sum pb-2">
                        <h4>訂單總結</h4>
                    </div>
                    <div className="ru-cart-pd-price d-flex justify-content-between align-items-center w-100">
                        <div>訂單金額</div>
                        <div>NT$ {orderAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</div>
                    </div>
                    <div className="ru-cart-coupon d-flex justify-content-between align-items-center w-100">
                        <div>優惠券</div>
                        <div 
                        className="ru-cart-coupon-btn" 
                        variant="primary" 
                        onClick={() => {
                            handleShow()
                            getCoupon()
                            }}>
                            { disableUse() ? '選擇優惠券' : '換張優惠券' }
                            </div>
                    </div>
                    <div className="ru-cart-coupon d-flex justify-content-between align-items-center w-100">
                        <div>折扣</div>
                        <div>-NT$ {discount}</div>
                    </div>
                    <div className="ru-cart-coupon d-flex justify-content-between align-items-center w-100">
                        <div>運費</div>
                        <div>
                        { dFee > 0 ?
                            `NT$ ${dFee}`
                            :
                            null
                        }
                        </div>
                    </div>
                </div>
                <div className="ru-cart-amount-total d-flex justify-content-between align-items-center w-100 mb-5">
                    <div>總金額</div>
                    <h4>NT$ {totalAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</h4>
                </div>
                {/* <div className="ru-cart-next-btn ml-auto mt-auto d-flex align-items-center justify-content-center">
                    <div className="text-align-center ru-cart-next-btn-pay">選擇付款方式</div>
                    <MdNavigateNext size={32} style={{ color: '#2690DF', backgroundColor: '#F8F8F8', borderRadius: '50%'}} />
                </div> */}
            </aside>
            </div>
        </>
    )
}

export default ProductAmountList