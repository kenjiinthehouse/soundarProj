import React from 'react'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'

function OptionCard(props) {   

    return (
      <>
        {props.activityData.map((value) => {
            return (
                <div className="option-card mt-3" key={value[0].sid}>
                    <h5>{value[0].activity_name}</h5>
                    <div className="text-card my-3"><FaRegCalendarAlt /><span>{value[0].activity_date.slice(0,10)}</span></div>
                    <div className="text-card my-3"><FaRegClock /><span>{value[0].activity_date.slice(11)}</span></div>
                    <button type="" className="btn btn-option" onClick={()=>{props.history.push('/activitymain')}}>選擇方案</button>
                </div>    
              )
            })}
      </>
    )
  }
  
  export default withRouter(OptionCard)
