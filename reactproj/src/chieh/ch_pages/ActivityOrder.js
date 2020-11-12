import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { Link, Switch, withRouter } from 'react-router-dom'
import { Button, Collapse, Tabs, Tab } from 'react-bootstrap'

import ActivityOrderContent from '../ch_components/ActivityOrderContent'

function ActivityOrder(props){
    const [activityOrder, setActivityOrder] = useState([])
    const [key, setKey] = useState('complete');
  
    async function getActivityOrderFromServer() {
      const url = 'http://localhost:5566/ticket_order/member/3'
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
   
    // 一開始就會開始載入資料
    useEffect(() => {
        getActivityOrderFromServer()
    }, [])
   

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
                      <Tab eventKey="complete" title="已報名">
                      {activityOrder.map((item,index)=>{
                        return(
                          <ActivityOrderContent key={item.id} activityOrder={item}/>
                          )})}   
                      </Tab>
                      <Tab eventKey="unfinished" title="未完成"></Tab>
                      <Tab eventKey="cancel" title="已取消"></Tab>
                      <Tab eventKey="refund" title="退票紀錄"></Tab>
                  </Tabs>                         
        </div>
      </>
    )
}

export default withRouter(ActivityOrder)

