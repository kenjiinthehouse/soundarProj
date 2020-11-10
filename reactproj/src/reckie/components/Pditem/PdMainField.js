import React,{useEffect} from 'react';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket } from "react-icons/md";

function PdMainField(props){


const {pdDetail}=props
// useEffect(()=>{
//   // console.log('pdDetail inside',pdDetail?pdDetail.pd_title:'')
// },[pdDetail])

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
      <div className="d-flex">
  
    <p className="body3">數量</p>
    <h4>counter component</h4>
    </div>
    <div className="d-flex">
    <button className="btn btn-primary btn-rounded re-btn"><div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingCart className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>加入購物車</div></button>

    <button className="btn   btn-rounded btn-vital re-btn"><div className="d-flex align-items-baseline justify-content-center"><div><MdShoppingBasket className="mr-2 mb-1" style={{fontSize:'1.25rem'}} /></div>立即購買</div></button>
    </div>
  
   </div>
   


    </div>
    </>)

}
export default PdMainField