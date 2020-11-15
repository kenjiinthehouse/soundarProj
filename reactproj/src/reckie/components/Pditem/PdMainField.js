import '../../styles/reckieCustom.scss';
import React,{useState,useEffect} from 'react';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket,MdAddCircleOutline,MdRemoveCircleOutline} from "react-icons/md";
import { withRouter } from 'react-router-dom';

function PdMainField(props){
const {pdDetail}=props
const [counterNum,setCounterNum]=useState(1)
const addToCart=(event)=>{
    let cart = []
    if(localStorage.getItem('cart'))
      cart = JSON.parse(localStorage.getItem('cart'))
    //id一樣的話只加count
    console.log(cart.map(item => item.sid))
    if(cart.map(item => item.sid).indexOf(pdDetail.pd_id) > -1) {
      let index = cart.map(item => item.sid).indexOf(pdDetail.pd_id)
      cart[index].count += counterNum
    }
    else{
      let obj = {
        sid: pdDetail.pd_id,
        name: pdDetail.pd_title,
        spec: pdDetail.pd_type,
        price: pdDetail.pd_price,
        count: counterNum,
        pic_url: pdDetail.pd_main_img
      }
      cart.push(obj)
    }
    localStorage.setItem('cart',JSON.stringify(cart))

}

    return(<>
    <div className="pdMainfield d-flex flex-column justify-content-between h-100">
    <div className="pdMainFieldLT">
      <h2 className="head2 ">{pdDetail?pdDetail.pd_title:''}</h2>

    <h3 className="pdMainFieldPrice">NT${pdDetail?pdDetail.pd_price:''}</h3>

    <div className="d-flex align-items-baseline commentStarPart justify-content-between">
      <p className="pdMainFieldStars caption">顧客好評</p>
      <div style={{color:'gold', fontSize:'1.375rem'}}>
      {/* 星星不會跟著評分調整 */}
      <MdStar/><MdStar/><MdStar/><MdStar/><MdStarHalf/>   
      </div>
        <p className="pdMainFieldStars subtitle1">{pdDetail?pdDetail.stars:''}</p>
        <p className="pdMainFieldStars caption">(30)</p>
      </div>  
    </div>
    

   <div className="pdMainFieldLB d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-baseline" style={{width:'40%'}}>
  
    <p className="body3" style={{paddingBottom:0}}>數量</p>
    
    <div className="d-flex justify-content-between align-items-center" style={{width:'60%'}}>
    <MdRemoveCircleOutline
    onClick={()=>(counterNum > 1)?setCounterNum(counterNum - 1):''} 
    style={{fontSize:"1.5rem"}}/>
    <div className="head5">{counterNum}</div>
    <MdAddCircleOutline 
    style={{fontSize:"1.5rem"}}
    onClick={()=>setCounterNum(counterNum + 1)}
    />
    </div>
    
   
   
    </div>
    <div className="d-flex">
    <button 
    className="btn btn-primary btn-rounded re-btn re-btn-color"
    onClick={(event)=>{addToCart(event)}}
     ><div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingCart className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>加入購物車</div></button>

    <button 
    className="btn btn-rounded btn-vital re-btn"
    onClick={(event)=>{
      addToCart(event);
      props.history.push('/checkout')
      }}
    ><div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingBasket className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>立即購買</div></button>
    </div>
  
   </div>
   


    </div>
    </>)

}
export default withRouter(PdMainField)