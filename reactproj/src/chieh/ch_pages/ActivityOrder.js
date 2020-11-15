import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux';

import ActivityOrderContent from '../ch_components/ActivityOrderContent'

function ActivityOrder(props){
    const [activityOrder, setActivityOrder] = useState([])

    //Tab控制(切換訂單狀態:已報名order_status=0/未完成1/已取消2/退票紀錄3)
    const [key, setKey] = useState('complete');    
  
    async function getActivityOrderFromServer() {
      const url = `http://localhost:5566/ticket_order/member/${props.member.sid}`
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
      setActivityOrder(data)
    } 
   
    useEffect(() => {
        getActivityOrderFromServer()
    }, [])

    let orderQuantity0=activityOrder.filter(item => item.order_status == 0).length
    let orderQuantity1=activityOrder.filter(item => item.order_status == 1).length
    let orderQuantity2=activityOrder.filter(item => item.order_status == 2).length
    let orderQuantity3=activityOrder.filter(item => item.order_status == 3).length

   

    return(
      <>
        <div className="activity-order">
            <div className="list-title mx-auto">活動票券訂單查詢</div>            
            <Tabs
                id="controlled-tab-order"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="nav-pills d-flex justify-content-around"            
            >
                <Tab eventKey="complete" title={"已報名"+`(${orderQuantity0})`}>
              {activityOrder.filter(item => item.order_status == 0).map((item)=>{
                return(
                  <ActivityOrderContent key={item} activityOrder={item}/>
              )})}
              </Tab>

                <Tab eventKey="unfinished" title={"未完成"+`(${orderQuantity1})`}>
                {activityOrder.filter(item => item.order_status == 1).map((item)=>{
                return(
                  <ActivityOrderContent key={item} activityOrder={item}/>
              )})}
                </Tab>
                <Tab eventKey="cancel" title={"已取消"+`(${orderQuantity2})`}>
                {activityOrder.filter(item => item.order_status == 2).map((item)=>{
                return(
                  <ActivityOrderContent key={item} activityOrder={item}/>
              )})}
                </Tab>
                <Tab eventKey="refund" title={"退票紀錄"+`(${orderQuantity3})`}>
                {activityOrder.filter(item => item.order_status == 3).map((item)=>{
                return(
                  <ActivityOrderContent key={item} activityOrder={item}/>
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

export default withRouter(connect(mapStateToProps)(ActivityOrder));

