import '../../styles/reckieCustom.scss';
import React,{useState} from 'react';
import Rater from 'react-rater'
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket,MdAddCircleOutline,MdRemoveCircleOutline} from "react-icons/md";
import { withRouter } from 'react-router-dom';
import InformCartModal from './InformCartModal';
import { fadeIn, fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

function PdMainField(props){
const {pdDetail,navCartNum,setNavCartNum}=props
const [counterNum,setCounterNum]=useState(1)

const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalText, setActionModalText] = useState('');


//加入購物車，將資訊存loacalStorage
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
    //將購物車數量傳入nav
    console.log('cart',localStorage.getItem('cart'))
    setNavCartNum(JSON.parse(localStorage.getItem('cart')).length)
}



    return(<>
    {showActionModal ? <InformCartModal setShowActionModal={setShowActionModal} actionModalText={actionModalText} /> : null}
   
    <div className="pdMainfield d-flex flex-column justify-content-between h-100">
    <div className="pdMainFieldLT">
      <h2 className="head2 ">{pdDetail?pdDetail.pd_title:''}</h2>

    <h3 className="pdMainFieldPrice">NT${pdDetail?pdDetail.pd_price:''}</h3>

    <div className="d-flex align-items-baseline commentStarPart justify-content-between">
      <p className="pdMainFieldStars caption">顧客好評</p>
      
        <Rater total={5} rating={pdDetail?pdDetail.stars:''} interactive={false} /> 
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
    onClick={(event)=>{
      addToCart(event);
      setActionModalText('商品已放入購物車');
      setShowActionModal(true);
      }}
     >
     <div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingCart className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>加入購物車</div></button>

    <button 
    className="btn btn-rounded btn-vital re-btn"
    onClick={(event)=>{
      addToCart(event);
      props.history.push('/cart')
      }}
    ><div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingBasket className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>立即購買</div></button>
    </div>
  
   </div>
   


    </div>
    
    
    </>)

}
export default withRouter(PdMainField)