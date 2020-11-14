import React,{ useState,useEffect } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './../ruby_styles/OrderPage.scss'
// import Sidebar from '../sidebar_component/SidebarMember'
import { FiCheck } from 'react-icons/fi'
// import { AiFillPicture, AiOutlineConsoleSql } from 'react-icons/ai'
import ReactStars from "react-rating-stars-component"
import axios from 'axios'

function OrderPage(props){
    const [ orderStatus, setOrderStatus ] = useState(0)
    const [ orderDisplay, setOrderDisplay ] = useState([])
    const [ commentData,setCommentData] = useState([])
    const [ rateStars, setRateStars ] = useState(null)
    const [ commentText, setCommentText ] = useState('')
    const [ productID, setProductID ] = useState(null)
    const [ singleComment, setSingleComment ] = useState([])
    
    const ratingChanged = (newRating) => {
        let stars = newRating
        console.log(newRating);
        setRateStars(stars)
      };
    
    function submitComments(){
        if(!singleComment) return
        axios.post('http://localhost:5566/comment/insert', 
        singleComment
        )
        .then((res) => { console.table(res.data) })
        .catch((error) => { console.error(error) })
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
    function getOrderData(){
        axios.get('http://localhost:5566/order/get', {params: {client_sid: props.member.sid}})
            .then((result) => { 
                let newData = result.data.orderArr
                let commentID = 0
                newData.forEach(item=>{
                    item.comment = item.products.map(el => {
                         let commentObj = {
                             comment_id: commentID,
                             isCommented: false,
                             pic_url: el.pic_url,
                             name: el.name,
                             spec: el.spec,
                             pd_sid: el.pd_sid
                         }
                         commentID ++
                         return commentObj
                    })
                })
                setCommentData(newData.reduce(function(prev, curr) {
                    return [...prev, ...curr.comment] }, []))

                newData.sort(function(a, b) {
                    if (a.sid > b.sid) {
                      return -1;
                    }
                    if (a.sid < b.sid) {
                      return 1;
                    }
                    return 0;
                  });
                  setOrderDisplay(newData)
            })
            .catch((err) => { console.error(err) })
    }
    // 訂單畫面
    useEffect(()=>{
        getOrderData()
    },[props.member])

    useEffect(()=>{
        // console.log(commentData)
        let data = {
            "stars":rateStars,
            "pd_sid":productID,
            "cl_sid":props.member.sid,
            "content":commentText
        }
        setSingleComment(data)
    },[commentData, commentText, productID, rateStars])

    let deliveryStatus = {
        0 : "宅配",
        1 : "超商取貨"
    }

    let paymentStatus = {
        0 : "貨到付款",
        1 : "超商取貨付款",
        2 : "信用卡"
    }

    let orderStatusDisplay = {
        0: "處理中",
        1: "已出貨",
        2: "已到貨",
        3: "已取消"
    }

    return(
        <>
            <div className="order-page">
                {/* <div className="container d-flex mx-auto justify-content-between"> */}

                    <div className="row ru-odPage-display">
                        <div className="ru-odPage-title">
                            <h4>訂單查詢</h4>
                        </div>
                        <div className="ru-odPage-option-btn d-flex justify-content-around w-100">
                            <div className={ orderStatus === 0 ? "ru-odPage-order-status order-status-active" : "ru-odPage-order-status"} onClick={() => setOrderStatus(0)}>處理中</div>
                            <div className={ orderStatus === 1 ? "ru-odPage-order-status order-status-active" : "ru-odPage-order-status"} onClick={() => setOrderStatus(1)}>待收貨</div>
                            <div className={ orderStatus === 2 ? "ru-odPage-order-status order-status-active" : "ru-odPage-order-status"} onClick={() => setOrderStatus(2)}>已完成</div>
                            <div className={ orderStatus === 3 ? "ru-odPage-order-status order-status-active" : "ru-odPage-order-status"} onClick={() => setOrderStatus(3)}>已取消</div>
                        </div>
                        { orderDisplay.filter(item => item.status === orderStatus).length === 0 
                            ? 
                            <div className="text-center mt-5">查無資料</div>
                            :
                            null
                        } 
                        { orderDisplay.filter(item => item.status === orderStatus)
                            .map(value => {
                            return(
                                <div className="ru-odPage-order-card w-100" key={value}>
                                    <div className="ru-odPage-order-id">訂單編號:{value.sid}</div>
                                    <div className="ru-odPage-order-detail d-flex justify-content-between">
                                        <div className="ru-odPage-order-left">
                                            <div className="ru-odPage-order-date d-flex flex-wrap">
                                                <p>訂購日期</p>
                                                <p>{setTimeFormat(value.create_date)}</p>
                                            </div>
                                            <div className="ru-odPage-state-display d-flex flex-wrap">
                                                <p>訂單狀態</p>
                                                { orderStatus === 0  ?
                                                  <div className="ru-odPage-state-radius">
                                                    <p>{orderStatusDisplay[value.status]}</p>
                                                  </div>
                                                  :
                                                  null
                                                }
                                                { orderStatus === 1  ?
                                                  <div className="ru-odPage-state-radius ru-odPage-ship">
                                                    <p>{orderStatusDisplay[value.status]}</p>
                                                  </div>
                                                  :
                                                  null
                                                }
                                                { orderStatus === 2  ?
                                                  <div className="ru-odPage-state-radius ru-odPage-finish">
                                                    <p>{orderStatusDisplay[value.status]}</p>
                                                  </div>
                                                  :
                                                  null
                                                }
                                                { orderStatus === 3  ?
                                                  <div className="ru-odPage-state-radius ru-odPage-cancel">
                                                    <p>{orderStatusDisplay[value.status]}</p>
                                                  </div>
                                                  :
                                                  null
                                                }
                                            </div>
                                            <div className="ru-odPage-order-amount d-flex flex-wrap">
                                                <p>訂單金額</p>
                                                <p>NT$ {(value.amount).toLocaleString()}</p>
                                            </div>
                                            <div className="ru-odPage-order-remark d-flex flex-wrap">
                                                <p>訂單備註</p>
                                                <p>{value.remark}</p>
                                            </div>
                                        </div>
                                        <div className="ru-odPage-order-right">
                                            <div className="ru-odPage-order-pic d-flex justify-content-around">
                                                <p>購買項目</p>
                                                <div className="ru-odPage-pic-display">
                                                    <img alt="pic" src={`${value.pic_url[0]}`} />
                                                </div>
                                                <div className="ru-odPage-pic-display">
                                                    <img alt="pic" src={`${value.pic_url[1]}`} />
                                                    { (value.pic_url.length-2) !== 0 
                                                        ?
                                                        <div className="ru-odPage-pic-mask">
                                                        <div className="ru-odPage-pic-num">+{value.pic_url.length-2}</div>
                                                        </div>
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Accordion>
                                        <Card className="ru-orderPage-card">
                                        <Card.Header className="ru-odPage-check-detail-btn ml-auto">
                                            <Accordion.Toggle 
                                                    as={Button}
                                                    onClick={() => { 
                                                        let el = document.querySelector('.ru-odPage-button')
                                                        el.classList.toggle("check-btn-active") 
                                                        }}
                                                    className="mb-3 ru-odPage-button"
                                                    variant="link" 
                                                    eventKey="0">
                                                查看訂單細節
                                            </Accordion.Toggle>
                                        </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body className="ru-orderPage-card-body">
                                                    <div className="ru-odPage-detail-topic">訂單明細</div>
                                                    <div className="ru-odPage-detail">
                                                        <h5>配送進度</h5>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="ru-odPage-progress-init-state d-flex flex-column align-items-center w-25">
                                                                <div className="ru-odPage-progress-circle progress-circle-active">
                                                                    <FiCheck size={32} style={{ color:'#FFFFFF'}}/>
                                                                </div>
                                                                <div className="ru-odPage-progress-text">
                                                                    <div>成立訂單</div>
                                                                    <div>{setTimeFormat(value.create_date)}</div>
                                                                </div>
                                                            </div>
                                                            <div className="ru-odPage-progress-broder"></div>
                                                            <div className="ru-odPage-progress-delivery-state d-flex flex-column align-items-center w-25">
                                                               { orderStatus >= 1 
                                                                    ?
                                                                    <div className="ru-odPage-progress-circle progress-circle-active">
                                                                    <FiCheck size={32} style={{ color:'#FFFFFF'}}/>
                                                                    </div>
                                                                    :
                                                                   <div className="ru-odPage-progress-circle"></div>
                                                               }
                                                                <div className="ru-odPage-progress-text">
                                                                    <div>已出貨</div>
                                                                    <div>{value.d_time ? setTimeFormat(value.d_time) : null}</div>
                                                                </div>
                                                            </div>
                                                            <div className="ru-odPage-progress-broder"></div>
                                                            <div className="ru-odPage-progress-arrive-state d-flex flex-column align-items-center w-25">
                                                                { orderStatus === 2 
                                                                        ?
                                                                        <div className="ru-odPage-progress-circle progress-circle-active">
                                                                        <FiCheck size={32} style={{ color:'#FFFFFF'}}/>
                                                                        </div>
                                                                        :
                                                                    <div className="ru-odPage-progress-circle"></div>
                                                                }
                                                                <div className="ru-odPage-progress-text">
                                                                    <div>已送達</div>
                                                                    <div>{value.arrive_time ? setTimeFormat(value.arrive_time):null}</div> 
                                                                </div>
                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ru-odPage-detail">
                                                        <h5>訂單內容</h5>
                                                        { value.products.map(item => {
                                                            return(
                                                            <div className="ru-odPage-pd-card d-flex justify-content-between">
                                                                <div className="ru-odPage-pd-img" style={{backgroundImage:`url(${item.pic_url})`}}></div>
                                                                <div className="w-75 d-flex align-items-center justify-content-between">
                                                                    <div className="ru-odPage-intro-block">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="ru-odPage-intro-block">
                                                                       {item.spec}
                                                                    </div>
                                                                    <div className="ru-odPage-intro-block">
                                                                       {item.count}
                                                                    </div>
                                                                    <div className="ru-odPage-intro-block">
                                                                       NT$ {(item.price).toLocaleString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )
                                                        })} 
                                                        <div className="ru-odPage-amount-detail d-flex justify-content-end">
                                                            <div className="amount-detai-left">
                                                                <p>訂單金額</p>
                                                                <p>優惠券折抵</p>
                                                                <p>運費</p>
                                                            </div>
                                                            <div className="amount-detai-right">
                                                                <p>NT$ {(value.amount + value.discount - value.d_fee).toLocaleString()}</p>
                                                                <p>-NT$ {value.discount}</p>
                                                                <p>NT$ {value.d_fee}</p>
                                                            </div>
                                                        </div>
                                                        <div className="ru-odPage-total-amount d-flex flex-column align-items-end">
                                                            <div className="fake-hr-line"></div>
                                                            <div className="d-flex justify-content-end">
                                                                <p>總金額</p>
                                                                <h5>NT$ {(value.amount).toLocaleString()}</h5> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ru-odPage-detail">
                                                        <h5>收件人資料</h5>
                                                        <div className="ru-odPage-receiver-info d-flex">
                                                            <div className="receiver-info-left">
                                                                <p>收件人姓名</p>
                                                                <p>收件人手機</p>
                                                                <p>收件人地址</p>
                                                                <p>寄送方式</p>
                                                            </div>
                                                            <div className="receiver-info-right">
                                                                <p>{value.receiver}</p>
                                                                <p>{value.mobile}</p>
                                                                <p>{value.address}</p>
                                                                <p>{deliveryStatus[value.delivery]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ru-odPage-detail">
                                                        <h5>付款資訊</h5>
                                                        <div className="ru-odPage-other-detail d-flex">
                                                            <div className="ru-odPage-other-detail-left">
                                                                <p>付款方式</p>
                                                                <p>購買人備註</p>
                                                            </div>
                                                            <div className="ru-odPage-other-detail-right">
                                                                <p>{paymentStatus[value.payment]}</p>
                                                                <p>{value.remark}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { orderStatus === 2 ?
                                                        <div className="ru-odPage-detail">
                                                        <h5>商品評論</h5>
                                                        { value.comment.map(item => {
                                                            return(
                                                            <div className="ru-odPage-pd-comment d-flex justify-content-around">
                                                                <div className="ru-pd-img" style={{backgroundImage:`url(${item.pic_url})`}}></div>
                                                                <div className="ru-rate-info">
                                                                    <div className="ru-rate-pd-name">{item.name}<span>{item.spec}</span></div>
                                                                    <div className="ru-rate-stars">
                                                                        <ReactStars
                                                                            isHalf={true}
                                                                            count={5}
                                                                            onChange={ratingChanged}
                                                                            size={24}
                                                                            activeColor="#FADB28"
                                                                        />
                                                                    </div>
                                                                    {/* <div className="ru-rate-upload-pic">
                                                                        <AiFillPicture size={32} style={{color:'#2690DF'}} />
                                                                        <p>增加圖片</p>   
                                                                    </div> */}
                                                                    {
                                                                        commentData.filter(el => el.comment_id === item.comment_id)[0].isCommented ? 
                                                                        <div>
                                                                            已評論
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <textarea rows="3" cols="40"
                                                                            onChange={(e) => {
                                                                                let newText = e.target.value
                                                                            setCommentText(newText)
                                                                            setProductID(item.pd_sid) 
                                                                            }}
                                                                            placeholder="留下你的評論 ..."></textarea>
                                                                        </div>
                                                                    }                    
                                                                </div>
                                                                { commentData.filter(el => el.comment_id === item.comment_id)[0].isCommented ?
                                                                    null
                                                                    :
                                                                    <div className="btn ru-comment-btn mt-auto" onClick={()=>{
                                                                    let newData = commentData.map(el => {
                                                                        if(el.comment_id === item.comment_id)
                                                                            el.isCommented = true
                                                                        return el
                                                                    })
                                                                    setCommentData(newData)
                                                                    submitComments()
                                                                    }}>評論
                                                                    </div>
                                                                }
                                                            </div>
                                                            )
                                                        })}
                                                    </div>
                                                    :
                                                    null
                                                    }
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                                )})
                            }
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

const mapStateToProps = (store) => {
    return {member: store.member}
}
export default withRouter(connect(mapStateToProps)(OrderPage))