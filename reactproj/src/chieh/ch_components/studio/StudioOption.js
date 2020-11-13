import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Accordion, Card } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function StudioOption(props) {
  const {newStudio} = props

    
  //選擇日期和時段
  function DateOption() {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
      selected={startDate} 
      onChange={date => setStartDate(date)}
      dateFormat="yyyy-MM-dd h:mm aa"
      showTimeSelect
      />
    );
  };

  return (
    <>
    {newStudio.map((item)=>{
      return(
        <>
          <div className="container" key={item}>
            <div className="option-item d-flex justify-content-between" >
              <div className="option-content list-unstyled">
                  <h4>{item.studio_option}</h4>
                  <li>現場注意事項：</li>
                  <li>1.請提早十分鐘在樓下準備並準時上樓</li>
                  <li>2.下一組預定來賓有權準時進入，請準時結束使用空間，避免影響節目錄製</li>
                </div>
              <div className="option-action d-flex flex-wrap justify-content-between">           
                  <Accordion>                
                    <Card.Header className="d-flex flex-wrap justify-content-between">
                      <span style={{fontSize : '2rem', fontWeight:'bold', fontFamily:'Roboto'}}>NT$ {item.studio_price}</span>
                      <Accordion.Toggle as={Button} eventKey="0" className="btn-select">
                        選擇
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="d-flex justify-content-between counter mt-5">
                          <span>選擇日期和時段</span>
                          <DateOption style={{fontSize:'1.25rem'}}/>
                        </div>            
                        <hr/>
                        <div className="d-flex align-items-center justify-content-end mb-3">
                          <div className="mr-4">總金額</div>
                            <div style={{color:'#2690df', fontWeight:'bold', fontSize:'1.5rem', fontFamily:'Roboto'}}>NT$ {item.studio_price}</div>
                          </div>
                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-option ml-auto">立即預訂</button>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>              
                  </Accordion>
                </div>
            </div>      
          </div>  
        </>
      )      
    })}      
    </>
  )
}

export default withRouter(StudioOption)
