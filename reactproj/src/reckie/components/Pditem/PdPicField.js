import React,{useEffect} from 'react';
import Carousel from 'react-elastic-carousel'
import { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

function PdPicField(props){
const {MainImg,SubImg,setMainImg}=props

//Loading
// const [isLoading, setIsLoading] = useState(false);
//MainPicture
// const [MainImg,setMainImg]= useState('')
//SubPictures
// const [SubImg,setSubImg] = useState([])
// const pdItem1 = pdDetail?pdDetail.pd_sub_imgs.split(','):''
// pdItem1.unshift(MainImg)


// useEffect(()=>{
//     const newSubImg = pdDetail?pdDetail.combine_img:''
//     setMainImg(pdDetail?pdDetail.pd_main_img:'')
    
//     setSubImg([...SubImg,...newSubImg])
// //     if(MainImg.indexOf('http') == -1){
// //     setMainImg(pdDetail?(`/img/${pdDetail.pd_main_img}`):'')
// // }else{
// //     setMainImg(pdDetail?pdDetail.pd_main_img:'')
// // }
    
// },[pdDetail])



return (
   <>
   
    <div className="pdPicfield">
    <img src={MainImg.indexOf('http')=== -1 ? `/reckie_img/${MainImg}`:MainImg} className="pdMainImg"/>
    
   
    </div>
    <Carousel itemsToScroll={4} itemsToShow={4} pagination={false}>
  
    { SubImg.map((item, index) => {
        
          return <><img src={item.indexOf('http')=== -1 ? `/reckie_img/${item}`:item} key={index} className="pdSubImgs" onClick={()=>setMainImg(item)}/></>
        })}  
       
    </Carousel>
    </> 
)

}
export default PdPicField