import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux';


import StudioOrderContent from '../ch_components/StudioOrderContent'

function StudioOrder(props){
    const [studioOrder, setStudioOrder] = useState([])

    //Tab控制(切換訂單狀態:已完成order_status=0/已預訂1/未完成2/已取消3)
    const [key, setKey] = useState('complete');    
  
    async function getStudioOrderFromServer() {
      const url = `http://localhost:5566/rent_order/member/${props.member.sid}`
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      })
  
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
      setStudioOrder(data)
    } 
   
    useEffect(() => {
        getStudioOrderFromServer()
    }, [])

    let orderQuantity0=studioOrder.filter(item => item.order_status == 0).length
    let orderQuantity1=studioOrder.filter(item => item.order_status == 1).length
    let orderQuantity2=studioOrder.filter(item => item.order_status == 2).length
    let orderQuantity3=studioOrder.filter(item => item.order_status == 3).length

   

    return(
      <>
        <div className="activity-order">
            <div className="list-title mx-auto">租借錄音室查詢</div>            
            <Tabs
                id="controlled-tab-order"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="nav-pills d-flex justify-content-around"            
            >
                <Tab eventKey="complete" title={"已完成"+`(${orderQuantity0})`}>
              {studioOrder.filter(item => item.order_status == 0).map((item)=>{
                return(
                  <StudioOrderContent key={item} studioOrder={item}/>
              )})}
              </Tab>

                <Tab eventKey="unfinished" title={"已預訂"+`(${orderQuantity1})`}>
                {studioOrder.filter(item => item.order_status == 1).map((item)=>{
                return(
                  <StudioOrderContent key={item} studioOrder={item}/>
              )})}
                </Tab>
                <Tab eventKey="cancel" title={"未完成"+`(${orderQuantity2})`}>
                {studioOrder.filter(item => item.order_status == 2).map((item)=>{
                return(
                  <StudioOrderContent key={item} studioOrder={item}/>
              )})}
                </Tab>
                <Tab eventKey="refund" title={"已取消"+`(${orderQuantity3})`}>
                {studioOrder.filter(item => item.order_status == 3).map((item)=>{
                return(
                  <StudioOrderContent key={item} studioOrder={item}/>
              )})}
                </Tab>
            </Tabs>                         
        </div>
      </>
    )
}

const mapStateToProps = (store) => {
    return { member: store.member };
  };

export default withRouter(connect(mapStateToProps)(StudioOrder));

