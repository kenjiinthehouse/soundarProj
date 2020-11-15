import '../styles/reckieCustom.scss';
import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Breadcrumb from '../components/Breadcrumb'

import PdPicField from '../components/Pditem/PdPicField'
import PdMainField from '../components/Pditem/PdMainField'
import ItemTabBar from '../components/Pditem/ItemTabBar';
import { withRouter,useParams } from 'react-router-dom'

import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';



function ProductItemPage(props) {
  const {pd_id} = useParams()
  const [pdDetail,setPdDetail]= useState()
  const [isLoading, setIsLoading] = useState(false);
  const [MainImg,setMainImg]= useState('')


//SubPictures
const [SubImg,setSubImg] = useState([])
// const pdItem1 = pdDetail?pdDetail.pd_sub_imgs.split(','):''
// pdItem1.unshift(MainImg)


  //從後端抓商品資料
  useEffect(()=>{
    setIsLoading(true)
    const getProductDetailFromServer = async () => {
        try{
          const response = await fetch(`http://localhost:5566/products/get-api/${pd_id}`,{method:'GET',
          })
            const data = await response.json()
           
            
            setPdDetail(data)
        } catch(error){
          console.log(error)
        }
      }
      getProductDetailFromServer();
},[])
//查看後端抓回來的資料
useEffect(()=>{
  const newSubImg = pdDetail?pdDetail.combine_img:''
  

  setMainImg(pdDetail?pdDetail.pd_main_img:'')
  setSubImg([...SubImg,...newSubImg])
  
  setTimeout(()=>{
    setIsLoading(false)
},800)
}, [pdDetail])







  const PdItemPage = (
    <>
    <div className="reBgWhite">
    <div className="container">
      
      <Breadcrumb/>  
   
    <div className="row mt-3 pdItemPage" >
    <div className="col-6">
    <PdPicField 
    {...props} 
    pdDetail={pdDetail}
    MainImg={MainImg}
    setMainImg={setMainImg}
    SubImg={SubImg}
    />
    </div>
    <div className="col-6 pl-5">
    <PdMainField {...props} pdDetail={pdDetail} />
    </div>
    </div>
    
  </div>
    
      <ItemTabBar 
      {...props} 
      pdDetail={pdDetail}
      SubImg={SubImg}
      />
     
    </div>
      
        
      </>
  )
  const loader_css = css`
display: inline-block;
position: absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
`;
const displaySpinner = (
    <div className="re-spinnerArea">
      <ScaleLoader
        css={loader_css}
        color={'#4A90E2'}
        height={80}
        width={10}
        margin={6}
        radius={20}
      />
    </div>
  );
    return isLoading? displaySpinner : PdItemPage
  }
  
  export default ProductItemPage