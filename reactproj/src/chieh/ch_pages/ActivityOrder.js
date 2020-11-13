import React, { useState, useEffect } from 'react'
import './../ch_styles/custom.scss';
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'

import ActivityOrderContent from '../ch_components/ActivityOrderContent'

function ActivityOrder(props){
    const [activityOrder, setActivityOrder] = useState([])

    //Tab控制(切換訂單狀態:已報名/未完成/已取消/退票紀錄)
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
                      {activityOrder.map((item)=>{
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

