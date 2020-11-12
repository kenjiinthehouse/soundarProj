import React, {useState,useEffect} from 'react'
import {ListGroup,Accordion,Card,Button} from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom"

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'



function PdSideBar2(props){
  // console.log('v',props.value)
  const { value, pdIndex,setDetailCate,setMainCate}= props
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

    return(
        <>
      <Accordion className="sidebar" hidden={(value===pdIndex)?false:true} defaultActiveKey={pdIndex+''}>
  
      <div>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
        <h5>錄音設備</h5>
        </Accordion.Toggle>
      </div>
  <Accordion.Collapse eventKey="0">
  {/* detailCate: 1:耳塞式耳機_有線 2:耳塞式耳機_無線 3:耳罩式耳機_有線 4:耳罩式耳機_無線 5:專業麥克風_有線 6:shirt 7:帆布包 8:馬克杯 */}
  <ListGroup variant="flush" className="bg-test">
      <ListGroup.Item onClick={()=> {setMainCate(1);setDetailCate('');}}>all</ListGroup.Item>
      <ListGroup.Item onClick={()=> setDetailCate(5)}>麥克風</ListGroup.Item>
      <Accordion className="sidebar" hidden={(value===pdIndex)?false:true}>
        <div>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <p className="body3 dark">耳機</p>
          </Accordion.Toggle>
        </div>

        <Accordion.Collapse eventKey="0">
        <ListGroup variant="flush" className="bg-test">
          <ListGroup.Item onClick={()=> setDetailCate(4)}>耳罩式無線</ListGroup.Item> 
          <ListGroup.Item onClick={()=> setDetailCate(3)}>耳罩式有線</ListGroup.Item> 
          <ListGroup.Item onClick={()=> setDetailCate(2)}>耳塞式無線</ListGroup.Item>
          <ListGroup.Item onClick={()=> setDetailCate(1)}>耳塞式有線</ListGroup.Item>
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
      <ListGroup.Item onClick={()=>{setMainCate(2);setDetailCate('');}}>all</ListGroup.Item>
      <ListGroup.Item onClick={()=> setDetailCate(6)}>T-shirt</ListGroup.Item>
      <ListGroup.Item onClick={()=> setDetailCate(7)}>帆布包</ListGroup.Item>
      <ListGroup.Item onClick={()=> setDetailCate(8)}>馬克杯</ListGroup.Item>
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