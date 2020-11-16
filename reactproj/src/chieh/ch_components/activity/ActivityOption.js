import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Accordion, Card } from 'react-bootstrap'
import ActivityOptionCounter from './ActivityOptionCounter'

function ActivityOption(props) {
  const {newActivity,activityData,setActivityData} = props

  return (
    <>
       {newActivity.map((item,index)=>{
          return (
            <div className="container" key={item}>
              <div className="option-item d-flex justify-content-between" >
                <div className="option-content">
                  <h4>{item.ticket_option}</h4>
                  {index===0 ? <li>11/30前報名享早鳥優惠價</li> :
                  index===1 ? null :
                  index===2? <li>三人團體報名享團體優惠價</li> : 
                  null
                  }
                  <li>課程附贈教材、午餐、午茶</li>
                  <li>每堂贈送《數位時代》三期 (課程隔月號起算)</li>            
                </div>
                <Accordion>                
                    <Card.Header className="d-flex flex-wrap justify-content-between">
                      <span style={{fontSize : '2rem', fontWeight:'bold', fontFamily:'Roboto'}}>NT$ {item.ticket_price} / 每人</span>
                      <Accordion.Toggle as={Button} eventKey="0" className="btn-select">
                        選擇
                      </Accordion.Toggle>
                    </Card.Header>
                    <ActivityOptionCounter activityData={activityData} setActivityData={setActivityData} index={index} price={item.ticket_price} option={item.ticket_option}/>        
                </Accordion>
              </div>
         </div>         
           )
         })}
    </>
  )
}

export default withRouter(ActivityOption)