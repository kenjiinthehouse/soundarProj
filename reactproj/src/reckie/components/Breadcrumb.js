import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

function Breadcrumb(props){
    console.log("B",props)
    const { value, pds , viewFilter, setViewFilter,setValue}= props

    let path = '';
  switch (value){
    case 1:
      path = "周邊商品";
      break;
    case 2:
      path = "線下活動";
      break;
    case 3:
      path = "錄音室租借";
      break;
    default:
      path = "錄音設備";
  }
return(
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" aria-current="page">
                {/* <Link to="/productlist" >商品首頁</Link> */}
                </li>
               
                <li className="breadcrumb-item active" aria-current="page">
                {path}
                </li>
            </ol>
        </nav>
    </>
)
}

export default withRouter(Breadcrumb)