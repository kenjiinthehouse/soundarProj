import React, {useState,useEffect} from 'react'
import {ListGroup,Accordion,Card,Button} from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom"

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'



function PdSideBar2(props){
  // console.log('v',props.value)
  const { value, pdIndex, pds , viewFilter, setViewFilter}= props
  const [activeKey, setActiveKey] = useState('0')
  

  

  useEffect(()=>{
    switch (value){
      case 1:
        setActiveKey("1");
        break;
      case 2:
        setActiveKey("2");
        break;
      case 3:
        setActiveKey("3");
        break;
    }
  },[value,activeKey])

  //sidebar展開內容 = Tab 所在頁面
  // let activeKey = "0"
  // switch (value){
  //   case 1:
  //     activeKey = "1";
  //     break;
  //   case 2:
  //     activeKey = "2";
  //     break;
  //   case 3:
  //     activeKey = "3";
  //     break;
  // }

  
  
    return(
        <>
      <Accordion className="sidebar" hidden={(value===pdIndex)?false:true} defaultActiveKey={pdIndex+''}>
  
      <div>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
        <h5>錄音設備</h5>
        </Accordion.Toggle>
      </div>
  <Accordion.Collapse eventKey="0">
  {/* 10:錄音設備 11:耳機 12:麥克風 20:播客周邊 1:耳塞式 2:耳罩式 3:t-shirt 4:杯 */}
  {/* 條件未完成 */}
  <ListGroup variant="flush" className="bg-test">
      <ListGroup.Item onClick={()=> setViewFilter(10)}>all</ListGroup.Item>
      <ListGroup.Item onClick={()=> setViewFilter(12)}>麥克風</ListGroup.Item>
      <Accordion className="sidebar" hidden={(value===pdIndex)?false:true}>
        <div>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <p>耳機</p>
          </Accordion.Toggle>
        </div>

        <Accordion.Collapse eventKey="0">
        <ListGroup variant="flush" className="bg-test">
            <ListGroup.Item onClick={()=> setViewFilter(1)}>耳塞式</ListGroup.Item>
            <ListGroup.Item onClick={()=> setViewFilter(2)}>耳罩式</ListGroup.Item> 
        </ListGroup>  
        </Accordion.Collapse>
      </Accordion>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle as={Button} variant="link" eventKey="1">
     <h5>播客周邊</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="1">
 
  <ListGroup variant="flush" className="bg-test">
      <ListGroup.Item onClick={()=> setViewFilter(20)}>all</ListGroup.Item>
      <ListGroup.Item onClick={()=> setViewFilter(3)}>T-shirt</ListGroup.Item>
      <ListGroup.Item onClick={()=> setViewFilter(4)}>馬克杯</ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle as={Button} variant="link" eventKey="2">
     <h5>線下活動</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="2">
 
  <ListGroup variant="flush" className="bg-test">
      <NavLink className="bg-test" to="/product?cate=1">Cras justo odio</NavLink>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle as={Button} variant="link" eventKey="3">
     <h5>錄音室租借</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="3">
 
  <ListGroup variant="flush" className="bg-test">
      <NavLink className="bg-test" to="/product?cate=1">Cras justo odio</NavLink>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>


</Accordion>


{/* <div className="box closing"> test</div> */}
 

          
        </>
        
    )
  
}

export default PdSideBar2