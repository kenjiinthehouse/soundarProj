import React, { useState, useEffect } from 'react'
import { FaRegCalendarAlt,FaMapMarkerAlt,FaTags } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap';
import './../ch_styles/custom.scss';
// import Breadcrumb from '../ch_components/Breadcrumb'

//方案票價、活動內容、注意事項
import ActivityAttention from '../ch_components/ActivityAttention'
import ActivityInfo from '../ch_components/ActivityInfo'
import ActivityOption from '../ch_components/ActivityOption'
import OptionCard from '../ch_components/OptionCard'

function ActivityMain(props) {
    const [activityData, setActivityData] = useState([])
    const [newData, setNewData] = useState([])
  
    async function getActivityFromServer() {
      const url = 'http://localhost:5566/activity/option/1'
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
      setNewData(data)
      let arr = []
      arr.push(data)
      console.log(arr)
      setActivityData(arr)
    } 
   
    // 一開始就會開始載入資料
    useEffect(() => {
        getActivityFromServer()
    }, [])



    //活動資訊
    const introduction = (
      <>
      <div className="container d-flex">
         {activityData.map((item) => {
            return (
              <div className="introduction" key={item}>
                <h3>{item[0].activity_name}</h3>
                <div className="d-flex mt-4">
                  <div className="activity-wrap mr-4">
                    <FaRegCalendarAlt className="mr-2"/>日期：{item[0].activity_date}
                  </div>
                  <div className="activity-wrap">
                   <FaMapMarkerAlt className="mr-2"/>地點：{item[0].activity_location}
                  </div>
                </div>

                <div className="activity-wrap mt-4">
                  <FaTags className="mr-2"/>標籤：
                  <button type="button" className="btn btn-tag1">講座</button>
                  <button type="button" className="btn btn-tag2">商業</button>
                  <button type="button" className="btn btn-tag3">教育</button>
                </div>               
              </div>       
              )
            })}
          <div className="option align-self-center">
            <button type="button" className="btn-option btn" onClick={()=>{props.history.push('/activitymain')}}>選擇方案</button>
          </div>     
       </div>    
     </>
    )
    
  //切換方案票價、活動內容、注意事項  
    function ControlledTabs() {
      const [key, setKey] = useState('option');
    
      return (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="nav-pills d-flex justify-content-around"
        >
          <Tab eventKey="option" title="方案票價">
            <ActivityOption 
            activityData={activityData} setActivityData={setActivityData}
            newActivity={newActivity} setNewActivity={setNewActivity} 
            />
          </Tab>
          <Tab eventKey="info" title="活動內容">
          <div className="container d-flex">
            <ActivityInfo/>
            <OptionCard activityData={activityData} setActivityData={setActivityData}/>
          </div>
            
          </Tab>
          <Tab eventKey="attention" title="注意事項">
            <div className="container d-flex">
              <ActivityAttention/>
              <OptionCard activityData={activityData} setActivityData={setActivityData}/>
            </div>            
          </Tab>
        </Tabs>
      );
    }

    return (
      <>
        
        <div className="activity-main">
        {activityData.map((item)=>{
          return (
            <img key={item} src= {item[0].activity_img} className="activity-demo"/>
          )
        })}
          {introduction}          
          <div className="container">
            <ControlledTabs/>
          </div>     
        </div>      
      </>
    )
  }
  
  export default withRouter(ActivityMain)

