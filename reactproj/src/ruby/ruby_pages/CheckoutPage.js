import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ProductAmountList from './../ruby_components/ProductAmountList'
import './../ruby_styles/CheckoutPage.scss'
import { Accordion, Card, Button, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { GrNext } from 'react-icons/gr'
import { MdNavigateNext } from 'react-icons/md'
import axios from 'axios'
// import Cleave from 'cleave.js/react'

function CheckoutPage(props){
    const [sid,setSid] = useState(props.member.sid)
    const {mycartDisplay,setMycartDisplay}= props;
    const [isActive,setIsActive] = useState([false,false,false])
    const [status, setStatus] = useState(0)
    const [cardInput1, setCardInput1] = useState('')
    const [cardInput2, setCardInput2] = useState('')
    const [cardInput3, setCardInput3] = useState('')
    const [cardInput4, setCardInput4] = useState('')
    const [creditCardNum, setCardNum] = useState('')
    const [expDate1, setExpDate1] = useState('')
    const [expDate2, setExpDate2] = useState('')

    const [payment, setPayment] = useState('')
    const [delivery, setDelivery] = useState('')
    const [discount,setDiscount] = useState(0)
    const [dFee, setDFee] = useState(null)
   
    const [remark, setRemark] = useState('')
    const [products, setProducts] = useState([])
    const [coupon, setCoupon] = useState('')
    const [receiver, setReceiver] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')

    const [totalAmount, setTotalAmount] = useState(0)

    const [ memberData, setMemberData ] = useState({})
    const [ memberCheckbox1, setMemberCheckbox1 ] = useState(false)
    const [ memberCheckbox2, setMemberCheckbox2 ] = useState(false)

    const [ fakeStoreData, setFakeStoreData ] = useState(false)

    const [ cashForm, setCashForm ] = useState({
        receiver:'',
        mobile:'',
        address:'',
        remark:''
    })
    const [ storeForm, setStoreForm ] = useState({
        storeType:'',
        storeID:'',
        storeName:'',
        storeAddress:'',
        receiver:'',
        mobile:'',
        remark:''
    })
    const [ creditCardForm, setCreditCardForm ] = useState({
        cardNum:null,
        cardExp:'',
        cardBackCode:null,
        cardOwner:'',
        cardOwnerMobile:'',
        receiver:'',
        mobile:'',
        address:'',
        remark:''
    })

    function setCardInput(index,value) {
        if(value.length < 5) {
            switch (parseInt(index)) {
                case 1:
                    setCardInput1(value)
                    break;
                case 2:
                    setCardInput2(value)
                    break;
                case 3:
                    setCardInput3(value)
                    break;
                case 4:
                    setCardInput4(value)
                    break;
                default:
                    break;
            }
        }
    }

    function setExpDateInput(index,value){
        if(value.length < 3){
            switch (parseInt(index)) {
                case 1:
                    setExpDate1(value)
                    break;
                case 2:
                    setExpDate2(value)
                    break;
                default:
                    break;
            }
        }
    }

    let sevenElevenStore = {
        storeID:187921,
        storeName:'合旺',
        storeAddress:'台北市大安區復興南路二段151巷41號'
    }

    let familyMartStore = {
        storeID:10076,
        storeName:'全家大安店',
        storeAddress:'台北市大安區大安路一段20號'
    }

    function getMemberData(){
        axios.post('http://localhost:5566/member/getmember', 
            { sid: props.member.sid })
                .then((res) => { 
                    let members = res.data.rs
                    console.log(members)
                    let newMemberData = {
                        name: members.name,
                        phone: members.phone,
                        address: members.address
                    }
                    setMemberData(newMemberData) 
                    })
                .catch((error) => { console.error(error) })
    }

    useEffect(()=>{
        let finalData = {
            sid:sid,
            payment:payment,
            delivery:delivery,
            d_fee:dFee,
            amount:totalAmount,
            remark:remark,
            products:products,
            coupon:coupon,
            discount:discount,
            receiver:receiver,
            mobile:mobile,
            address:address
        }
        localStorage.setItem('orderData',JSON.stringify(finalData))

    },[address, coupon, dFee, delivery, discount, mobile, payment, products, receiver, remark, sid, totalAmount])

    useEffect(()=>{
        getMemberData()
        let data = {}
            if(localStorage.getItem('amountData'))
                data = JSON.parse(localStorage.getItem('amountData'))
                setDiscount(data.discount)
                setCoupon(data.coupon)
                setProducts(data.products)
                setTotalAmount(data.totalAmount)
    },[props.member])
    useEffect(()=>{

        if(cardInput1.length === 4)
            document.querySelector('#cardInput2').focus()
        if(cardInput2.length === 4)
            document.querySelector('#cardInput3').focus()
        if(cardInput3.length === 4)
            document.querySelector('#cardInput4').focus()
        setCardNum(`${cardInput1}-${cardInput2}-${cardInput3}-${cardInput4}`)
        
        if(expDate1.length === 2)
            document.querySelector('#credit-card-expire-date2').focus()
        if(expDate2.length === 2)
            document.querySelector('#credit-card-expire-date3').focus()

        isActive.filter(item => item === true).length > 0 ? setStatus(1) : setStatus(0)

        // console.log(storeForm)
    }, [cashForm,storeForm,isActive, cardInput2, cardInput3, cardInput4, cardInput1, expDate2, expDate1])

    const finishPage = (
            <div className="ru-ckpage-step-content w-100 position-relative">
                <div className="animate-img popout d-flex flex-column justify-content-center align-items-center">
                    <div className="guiding-frame d-flex flex-column justify-content-center align-items-center">
                        <h2>感謝您的購買</h2>
                        <Link to="/memberedit" className="text-decoration-none ru-ckpage-go-to-order-btn">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="text-align-center ru-cart-next-btn-pay">查看訂單</div>
                                <MdNavigateNext size={32} style={{ color: '#2690DF', backgroundColor: '#F8F8F8', borderRadius: '50%'}} />
                            </div>
                        </Link>               
                    </div>
                    <img alt="pic" src={'/ruby_images/OBJECTS.svg'}/>
                </div>
            </div>
    )

    const startPage = (
        <div className="ru-ckpage-step-content w-100 d-flex justify-content-between">
        <Accordion className="ru-ckpage-ship-state">
            <Card className="ru-ckpage-card">
                <Card.Header className="ru-ckpage-choose-payment">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="ru-ckpage-payment-btn" onClick={()=>{ 
                        isActive[0] ? setIsActive([false,false,false]) : setIsActive([true,false,false])
                        setPayment(0)
                        setDelivery(0)
                        isActive[0] ? setDFee(null) : setDFee(100) 
                        }}>
                        <h5>貨到付款</h5>
                        { isActive[0] ?
                            <img src="ruby_images/delivery-active.svg" alt="pic" />
                            :
                            <img src="ruby_images/delivery.svg" alt="pic" />
                        }
                    </Accordion.Toggle>
                    <div className="ru-ckpage-payment-info">
                        貨到付款運費 $100
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="ru-ckpage-card-body">
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>收件資料</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form className="ru-ckpage-form">
                            <Form.Group controlId="receiver-name1" className="row align-items-center">
                                <Form.Label className="mx-3">收件人姓名</Form.Label>
                                <Form.Control id="receiver-name1" 
                                              className="w-50" 
                                              type="text"
                                              defaultValue={`${memberCheckbox1 ? memberData.name : ''}`}
                                              onChange={(e)=>{
                                                  const newData = JSON.parse(JSON.stringify(cashForm))
                                                  newData.receiver = e.target.value
                                                  setCashForm(newData)
                                                //   let receiverName = e.target.value
                                                //   setReceiver(receiverName)
                                                  }} 
                                              placeholder="請輸入收件人姓名" isInvalid/>
                                <Form.Control.Feedback type="invalid">You did it!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="receiver-mobile1" className="row align-items-center">
                                <Form.Label className="mx-3">收件人手機</Form.Label>
                                <Form.Control id="receiver-mobile1" 
                                              className="w-50"  
                                              type="text"
                                              defaultValue={`${memberCheckbox1 ? memberData.phone : ''}`}
                                              onChange={(e)=>{
                                                  const newData = JSON.parse(JSON.stringify(cashForm))
                                                  newData.mobile = e.target.value
                                                  setCashForm(newData)
                                                //   let receiverMobile = e.target.value
                                                //   setMobile(receiverMobile)
                                                  }} 
                                              pattern="^09[0-9]{8}$"
                                              maxlength="10" 
                                              placeholder="請輸入收件人手機" />
                            </Form.Group>
                            <Form.Group controlId="receiver-address1" className="row align-items-center">
                                <Form.Label className="mx-3">收件人地址</Form.Label>
                                <Form.Control id="receiver-address1" 
                                              className="w-75"  
                                              type="text" 
                                              defaultValue={`${memberCheckbox1 ? memberData.address : ''}`}
                                              onChange={(e)=>{
                                                  const newData = JSON.parse(JSON.stringify(cashForm))
                                                  newData.address = e.target.value
                                                  setCashForm(newData)
                                                //   let receiverAddress = e.target.value
                                                //   setAddress(receiverAddress)
                                                  }} 
                                              placeholder="請輸入收件人地址" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox1">
                                <Form.Check id="formBasicCheckbox1"
                                            type="checkbox"
                                            onClick={()=> {
                                                let attrOfCheckbox = document.querySelector('#formBasicCheckbox1').checked
                                                setMemberCheckbox1(attrOfCheckbox)
                                                setReceiver(memberData.name)
                                                setMobile(memberData.phone)
                                                setAddress(memberData.address)
                                            } } 
                                            label="同訂購人資料" />
                            </Form.Group>
                        </Form>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>訂單備註</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                          onChange={(e)=>{
                                              const newData = JSON.parse(JSON.stringify(cashForm))
                                              newData.remark = e.target.value
                                              setCashForm(newData)
                                            //   let newRemark = e.target.value
                                            //   setRemark(newRemark)
                                          }} 
                                          rows={3} 
                                          style={{ resize:'none' }} />
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="ru-ckpage-card">
                <Card.Header className="ru-ckpage-choose-payment d-flex ">
                    <Accordion.Toggle as={Button} variant="link" eventKey="1" className="ru-ckpage-payment-btn" onClick={()=>{ 
                        isActive[1] ? setIsActive([false,false,false]) : setIsActive([false,true,false])
                        setPayment(1)
                        setDelivery(1)
                        isActive[1] ? setDFee(null) : setDFee(60) 
                        }}>
                        <h5>超商付款</h5>
                        { isActive[1] ?
                            <img src="ruby_images/shop-active.svg" alt="pic" />
                            :
                            <img src="ruby_images/shop.svg" alt="pic" />
                        }
                    </Accordion.Toggle>
                    <div className="ru-ckpage-payment-info d-flex flex-column">
                        <div>超商取貨運費 $60</div>
                        <div className="ru-ckpage-ship-rules d-flex align-items-center">
                            <div className="d-flex">
                                <img src="ruby_images/7-eleven_logo.png" alt="pic"/>
                                <img src="ruby_images/familymart-vector-logo.svg" alt="pic"/>
                            </div>
                            若您的訂單金額超過單筆超商取貨的訂購上限(NT$5,000)，請變更您的配送方式為宅配。
                        </div>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body className="ru-ckpage-card-body">
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>選擇超商</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <div className="d-flex ru-store-radio">
                            <div className="seven-eleven-img d-flex align-items-center mr-3">
                                <input className="mr-2" 
                                       type="radio" 
                                       name="store-type"
                                       onChange={(e)=>{
                                            let newData = JSON.parse(JSON.stringify(storeForm))
                                            newData.storeType = e.target.value
                                            setStoreForm(newData) 
                                        }} 
                                       value="sevenEleven"/>
                                <img src="ruby_images/7-eleven_logo.png" alt="pic"/>
                                <p>7-11便利商店</p>
                            </div>
                            <div className="family-mart-img d-flex align-items-center">
                                <input className="mr-2" 
                                       type="radio" 
                                       name="store-type"
                                       onChange={(e)=>{
                                            let newData = JSON.parse(JSON.stringify(storeForm))
                                            newData.storeType = e.target.value
                                            setStoreForm(newData) 
                                        }}
                                       value="familyMart"/>
                                <img src="ruby_images/familymart-vector-logo.svg" alt="pic"/>
                                <p>全家便利商店</p>
                            </div>
                        </div>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>取貨門市</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <div className="d-flex ru-ckpage-choose-store justify-content-around align-items-center">
                            <div type="button"
                                 onClick={() => {
                                     if(fakeStoreData){
                                        setFakeStoreData(false)
                                     }else{
                                        setFakeStoreData(true)
                                     }
                                     
                                     let newData = JSON.parse(JSON.stringify(storeForm))
                                     if(storeForm.storeType === 'sevenEleven'){
                                        newData.storeID = sevenElevenStore.storeID
                                        newData.storeName = sevenElevenStore.storeName
                                        newData.storeAddress = sevenElevenStore.storeAddress
                                        setStoreForm(newData) 
                                     }
                                     if(storeForm.storeType === 'familyMart'){
                                        newData.storeID = familyMartStore.storeID
                                        newData.storeName = familyMartStore.storeName
                                        newData.storeAddress = familyMartStore.storeAddress
                                        setStoreForm(newData) 
                                     }
                                 } } 
                                 className="btn  btn-primary choose-store-btn">搜尋門市</div>
                            <div className="d-flex ru-ckpage-store-info">
                                <div className="store-info-key">
                                    <p>門市店號</p>
                                    <p>門市店名</p>
                                    <p>門市地址</p>
                                </div>
                                <div className="store-info-value">
                                    { fakeStoreData === true && storeForm.storeType === 'sevenEleven'
                                        ?
                                        <>
                                        <p>{sevenElevenStore.storeID}</p>
                                        <p>{sevenElevenStore.storeName}</p>
                                        <p>{sevenElevenStore.storeAddress}</p>
                                        </>
                                        :
                                        ''
                                    }
                                    { fakeStoreData === true && storeForm.storeType === 'familyMart'
                                        ?
                                        <>
                                        <p>{familyMartStore.storeID}</p>
                                        <p>{familyMartStore.storeName}</p>
                                        <p>{familyMartStore.storeAddress}</p>
                                        </>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>收件資料</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form>
                            <Form.Group controlId="reciever-name2" className="row align-items-center">
                                <Form.Label className="mx-3">收件人姓名</Form.Label>
                                <Form.Control id="reciever-name2" 
                                              className="w-50" 
                                              type="text"
                                              onChange={(e)=>{
                                                  const newData = JSON.parse(JSON.stringify)
                                                //   let receiverName = e.target.value
                                                //   setReceiver(receiverName)
                                                  }} 
                                              placeholder="請輸入收件人姓名" />
                            </Form.Group>
                            <Form.Group controlId="reciever-mobile2" className="row align-items-center">
                                <Form.Label className="mx-3">收件人手機</Form.Label>
                                <Form.Control id="reciever-mobile2" 
                                              className="w-50"  
                                              type="text"
                                              onChange={(e)=>{
                                                  let receiverMobile = e.target.value
                                                  setMobile(receiverMobile)
                                                  }} 
                                              pattern="^09[0-9]{8}$"
                                              maxlength="10"
                                              placeholder="請輸入收件人手機" />
                            </Form.Group>
                        </Form>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>訂單備註</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                          onChange={(e)=>{
                                              let newRemark = e.target.value
                                              setRemark(newRemark)
                                          }} 
                                          rows={3} 
                                          style={{ resize:'none' }} />
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="ru-ckpage-card">
            <Card.Header className="ru-ckpage-choose-payment" onClick={()=>{ 
                isActive[2] ? setIsActive([false,false,false]) : setIsActive([false,false,true])
                setPayment(2)
                setDelivery(0)
                isActive[2] ? setDFee(null) : setDFee(100) 
                }}>
                <Accordion.Toggle as={Button} variant="link" eventKey="2" className="ru-ckpage-payment-btn credit-card">
                    <h5>信用卡</h5>
                    { isActive[2] ?
                            <img src="ruby_images/credit-card-edit-active.svg" alt="pic" />
                            :
                            <img src="ruby_images/credit-card-edit.svg" alt="pic" />
                        }
                </Accordion.Toggle>
                <div className="ru-ckpage-payment-info">
                    宅配運費 $100
                </div>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                    <Card.Body className="ru-ckpage-card-body">
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>信用卡付款</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form>
                            <Form.Group controlId="credit-card-num" className="row align-items-center ru-credit-card-board">
                                <Form.Label className="mx-3 mb-0">信用卡號</Form.Label>
                                <Form.Control id="credit-card-num" 
                                              value={cardInput1} 
                                              type="text" 
                                              onChange={e=>setCardInput(1,e.target.value)} />
                                <span className="mx-1">－</span>
                                <Form.Control id="cardInput2" 
                                              type="text" 
                                              value={cardInput2} 
                                              onChange={e=>setCardInput(2,e.target.value)} />
                                <span className="mx-1">－</span>
                                <Form.Control id="cardInput3" 
                                              type="text" 
                                              value={cardInput3} 
                                              onChange={e=>setCardInput(3,e.target.value)} />
                                <span className="mx-1">－</span>
                                <Form.Control className="mr-3" 
                                              id="cardInput4" 
                                              value={cardInput4} 
                                              type="text" 
                                              onChange={e=>setCardInput(4,e.target.value)} />
                                <img src="ruby_images/credit-card-icon.svg" alt="pic"/>
                            </Form.Group>
                            <Form.Group controlId="credit-card-expire-date" 
                                        className="row align-items-center ru-credit-card-detail">
                                <Form.Label className="mx-3 mb-0">有效期限</Form.Label>
                                <Form.Control id="credit-card-expire-date" 
                                              value={expDate1}
                                              className="" 
                                              type="text" 
                                              placeholder="MM" 
                                              onChange={e=>setExpDateInput(1,e.target.value)} />
                                <span className="mx-1">－</span>
                                <Form.Control id="credit-card-expire-date2" 
                                              className="mr-3"
                                              value={expDate2} 
                                              type="text" 
                                              placeholder="YY" 
                                              onChange={e=>setExpDateInput(2,e.target.value)} />
                                <Form.Label className="mb-0">背面末三碼</Form.Label>
                                <Form.Control id="credit-card-expire-date3" 
                                              className="mx-3"
                                              maxlength="3"
                                              type="text"/>
                                <img src="ruby_images/check-backnum.svg" alt="pic"/>
                            </Form.Group>
                            <Form.Group controlId="card-owner-name" className="row align-items-center">
                                <Form.Label className="mx-3 mb-0">持卡人姓名</Form.Label>
                                <Form.Control id="card-owner-name" 
                                              className="w-50" 
                                              type="text"
                                              placeholder="請輸入持卡人姓名"  />
                            </Form.Group>
                            <Form.Group controlId="card-owner-mobile" className="row align-items-center">
                                <Form.Label className="mx-3 mb-0">持卡人手機</Form.Label>
                                <Form.Control id="card-owner-mobile" 
                                              className="w-50" 
                                              type="text"
                                              pattern="^09[0-9]{8}$"
                                              maxlength="10"
                                              placeholder="請輸入持卡人手機"  />
                            </Form.Group>
                        </Form>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>收件資料</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form>
                            <Form.Group controlId="reciever-name3" className="row align-items-center">
                                <Form.Label className="mx-3">收件人姓名</Form.Label>
                                <Form.Control className="w-50" 
                                              type="text"
                                              defaultValue={`${memberCheckbox2 ? memberData.name : ''}`}
                                              onChange={(e)=>{
                                                  let receiverName = e.target.value
                                                  setReceiver(receiverName)
                                                  }} 
                                              placeholder="請輸入收件人姓名"  />
                            </Form.Group>
                            <Form.Group controlId="reciever-mobile3" className="row align-items-center">
                                <Form.Label className="mx-3">收件人手機</Form.Label>
                                <Form.Control className="w-50"  
                                              type="text"
                                              defaultValue={`${memberCheckbox2 ? memberData.phone : ''}`}
                                              onChange={(e)=>{
                                                  let receiverMobile = e.target.value
                                                  setMobile(receiverMobile)
                                                  }} 
                                              pattern="^09[0-9]{8}$"
                                              maxlength="10" 
                                              placeholder="請輸入收件人手機"  />
                            </Form.Group>
                            <Form.Group controlId="reciever-address2" className="row align-items-center">
                                <Form.Label className="mx-3">收件人地址</Form.Label>
                                <Form.Control id="reciever-address2" 
                                              className="w-75"  
                                              type="text" 
                                              defaultValue={`${memberCheckbox2 ? memberData.address : ''}`}
                                              onChange={(e)=>{
                                                  let receiverAddress = e.target.value
                                                  setAddress(receiverAddress)
                                                  }}
                                              placeholder="請輸入收件人地址"  />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox2">
                                <Form.Check id="formBasicCheckbox2" 
                                            type="checkbox"
                                            onClick={() => {
                                                let attrOfCheckbox = document.querySelector('#formBasicCheckbox2').checked
                                                setMemberCheckbox2(attrOfCheckbox)
                                            }} 
                                            label="同訂購人資料" />
                            </Form.Group>
                        </Form>
                        <div className="payment-info-topic d-flex align-items-center justify-content-between">
                            <div className="info-topic-border-front"></div>
                            <h5>訂單備註</h5>
                            <div className="info-topic-border-end"></div>
                        </div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                          onChange={(e)=>{
                                              let newRemark = e.target.value
                                              setRemark(newRemark)
                                          }} 
                                          rows={3} 
                                          style={{ resize:'none' }} />
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <div className="main-font-color d-flex flex-column align-items-end ru-cart-aside">
            <ProductAmountList {...props}
                dFee={dFee}
                setDFee={setDFee}
                mycartDisplay={mycartDisplay} 
                setMycartDisplay={setMycartDisplay}/>
            { status === 1 
                ?
                <div className="ru-ckpage-next-btn ml-auto d-flex align-items-center justify-content-center"
                     onClick={()=>{
                        if(!receiver || !mobile || !address) return
                            setStatus(2)
                            let data = JSON.parse(localStorage.getItem('orderData'))
                            console.log(data)
                            axios.post('http://localhost:5566/order/insert', 
                            data
                            )
                                .then((res) => { console.table(res.data) })
                                .catch((error) => { console.error(error) })  
                     }}>
                    <div className="text-align-center ru-cart-next-btn-pay">完成訂購</div>
                    <MdNavigateNext size={32} style={{ color: '#FC774C', backgroundColor: '#F8F8F8', borderRadius: '50%'}} />
                </div>
                :
                null
            }
        </div>
    </div>
    )

    return(
        <>
            <div className="checkout-page">
                <div className="container">
                    <div className="row ru-ckpage-main flex-column mx-auto">
                        <div className="ru-ckpage-step d-flex justify-content-between align-items-center mt-3">
                            <div className="ru-ckpage-step-one">
                                <img src="ruby_images/payment-method.svg" alt="pic"/>
                                { status === 0 
                                    ?
                                    <p className="" style={{color: '#2690DF'}}>付款方式</p>
                                    :
                                    <p className="" >付款方式</p>
                                }
                            </div>
                            <div className="ru-ckpage-next-icon"><GrNext /></div>
                            <div className="ru-ckpage-step-two">
                                { status >= 1 
                                    ?
                                    <img src="ruby_images/delivery-1.svg"  alt="pic"/>
                                    :
                                    <img src="ruby_images/delivery-1.svg" style={{opacity: '0.5'}} alt="pic"/>
                                }
                                {
                                    status === 0 
                                    ?
                                    <p className="" style={{color: '#909393'}}>收件資料</p>
                                    :
                                    null
                                }
                                { status === 1 
                                    ?
                                    <p className="" style={{color: '#2690DF'}}>收件資料</p>
                                    :
                                    null
                                }
                                { status === 2 
                                    ?
                                    <p className="">收件資料</p>
                                    :
                                    null
                                }
                            </div>
                            <div className="ru-ckpage-next-icon"><GrNext /></div>
                            <div className="ru-ckpage-step-three">
                                { status === 2 
                                    ?
                                    <img src="ruby_images/gift.svg"  alt="pic"/>
                                    :
                                    <img src="ruby_images/gift.svg" style={{opacity: '0.5'}} alt="pic"/>
                                }
                                { status === 2 
                                    ?
                                    <p className="" style={{color: '#2690DF'}}>訂購成功</p>
                                    :
                                    <p className="" style={{color: '#909393'}}>訂購成功</p>
                                }
                            </div>
                        </div>
                        { status === 2 ? finishPage : startPage }
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (store) => {
    return {member: store.member}
}
export default withRouter(connect(mapStateToProps)(CheckoutPage))