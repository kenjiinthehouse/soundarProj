import React, { useState, useEffect } from 'react'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'


function OptionCard(props) {
    const [activityData, setActivityData] = useState([])
  
    async function getActivityFromServer() {
      const url = 'http://localhost:5566/activity/api/1'
  
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      })
  
      const response = await fetch(request)
      const data = await response.json()
      let arr = []
      arr.push(data)
      console.log(arr)
      // 設定資料
      setActivityData(arr)
    }
   
  
    // 一開始就會開始載入資料
    useEffect(() => {
        getActivityFromServer()
    }, [])
  
     
    const display = (
      <>
      
         {activityData.map((value) => {
            return (
                <div className="option-card mt-3" key={value.sid}>
                    <h5>{value.activity_name}</h5>
                    <div className="text-card my-3"><FaRegCalendarAlt /><span>{value.activity_date.slice(0,10)}</span></div>
                    <div className="text-card my-3"><FaRegClock /><span>{value.activity_date.slice(11)}</span></div>
                    <button type="" className="btn btn-option" onClick={()=>{props.history.push('/activitymain')}}>選擇方案</button>
                </div>    
              )
            })}
   
     </>
    )
    
    

    return (
      <>
        {display}
      </>
    )
  }
  
  export default withRouter(OptionCard)
