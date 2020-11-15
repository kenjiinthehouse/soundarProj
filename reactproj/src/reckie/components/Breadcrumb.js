import React, { useState, useEffect } from 'react'
import { Link, withRouter,useParams } from 'react-router-dom'
import { MdCardGiftcard } from "react-icons/md";

function Breadcrumb(props){
    console.log('Breadprops',props)
    const { value ,setMainCate,mainCate,detailCate,setDetailCate,setPage,setSearch,setFrontPrice,setBackPrice,setSort,pdDetail}= props
    // const {pd_id}=useParams()


    console.log('title', pdDetail)

    const resetData = () => {
      setDetailCate('');
      setPage(1);
      setSearch('');
      setFrontPrice('');
      setBackPrice('');
      setSort('');
    }

    let mainpath = '';
  switch (mainCate){
    case 1:
      mainpath = "錄音設備";
      break;

    case 2:
      mainpath = "周邊商品";
      break;
    case 3:
      mainpath = "線下活動";
      break;
    case 4:
      mainpath = "錄音室租借";
      break;
    
  }
  
 
    /* detailCate: 1:耳塞式耳機_有線 2:耳塞式耳機_無線 3:耳罩式耳機_有線 4:耳罩式耳機_無線 5:專業麥克風_有線 6:shirt 7:帆布包 8:馬克杯 */
  let secondPath ='';
  switch (detailCate){
    case 1:
      secondPath = "耳塞式耳機_有線";
      break;
    case 2:
      secondPath = "耳塞式耳機_無線";
      break;
    case 3:
      secondPath = "耳罩式耳機_有線";
      break;
    case 4:
      secondPath = "耳罩式耳機_無線";
      break;
    case 5:
      secondPath = "專業麥克風";
      break;
    case 6:
      secondPath = "上衣";
      break;
    case 7:
      secondPath = "帆布包";
      break;
    case 8:
      secondPath = "馬克杯";
      break;
    default:
      secondPath = "";
  }
  

  switch (pdDetail?pdDetail.cate_id:0){
    case 1:
      mainpath = "錄音設備";
      secondPath = "耳塞式耳機_有線";
      break;
    case 2:
      mainpath = "錄音設備";
      secondPath = "耳塞式耳機_無線";
      break;
    case 3:
      mainpath = "錄音設備";
      secondPath = "耳罩式耳機_有線";
      break;
    case 4:
      mainpath = "錄音設備";
      secondPath = "耳罩式耳機_無線";
      break;
    case 5:
      mainpath = "錄音設備";
      secondPath = "專業麥克風";
      break;
    case 6:
      mainpath = "播客周邊";
      secondPath = "上衣";
      break;
    case 7:
      mainpath = "播客周邊";
      secondPath = "帆布包";
      break;
    case 8:
      mainpath = "播客周邊";
      secondPath = "馬克杯";
      break;
    
  }
  
  

  const mainPageBread = (
    <>
       <nav aria-label="breadcrumb" className="reBreadcrumbWrap">
        <ol className="breadcrumb reBreadcrumb">
          <li 
            className="breadcrumb-item reBreadcrumbItem" 
            aria-current="page"
            onClick={() => {
              setMainCate(mainCate);
              resetData();
              }}
          >
                <MdCardGiftcard style={{fontSize:'1.5rem',lineHeight:'1.5rem',paddingRight:'0.5rem'}} />
                {mainpath}
                </li>
                <li className="breadcrumb-item reBreadcrumb" aria-current="page">
                {secondPath}
                </li>
            </ol>
        </nav>
    </>
)
const itemPageBread = (
  <>
     <nav aria-label="breadcrumb" style={{marginBottom:'2rem'}}>
      <ol className="breadcrumb reBreadcrumb">
        <li 
          className="breadcrumb-item reBreadcrumbItem" 
          aria-current="page"
          onClick={() => {
            props.history.push('/productlist')
            }}
        >
        <MdCardGiftcard style={{fontSize:'1.5rem',lineHeight:'1.5rem',paddingRight:'0.5rem'}} />
              {mainpath}
              </li>
              <li 
              className="breadcrumb-item reBreadcrumbItem" 
              aria-current="page"
              onClick={() => {
            props.history.goBack()
            }}
              >
              {secondPath}
              </li>
              <li className="breadcrumb-item reBreadcrumb" aria-current="page">
              {pdDetail?pdDetail.pd_title:''}
              </li>
          </ol>
      </nav>
  </>
)
if(props.location.pathname == '/productlist'){return mainPageBread
}else{
  return itemPageBread
}
}

export default withRouter(Breadcrumb)