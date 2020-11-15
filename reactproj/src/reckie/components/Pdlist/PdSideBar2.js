import React, {useState,useEffect} from 'react'
import {ListGroup,Accordion,Card,Button} from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";

import PdPriceSlider from './PdPriceSlider'









function PdSideBar2(props){
  // console.log('v',props.value)
  const { 
    value,
    pdIndex,
    setDetailCate,
    setMainCate,
    setSearch,
    setFrontPrice,
    setBackPrice,
    setPage,
    setSort
  }= props
  const [activeKey, setActiveKey] = useState('0')
  const [activeArrow, setActiveArrow] = useState(false)
  const [rangeValue, setRangeValue] = useState([1000, 5000]);
  
  //展開時Arrow轉向
  useEffect(()=>{
    if(activeArrow){
      document.querySelector('.reArrow').classList.add('turnArrow')
    }else{
      document.querySelector('.reArrow').classList.remove('turnArrow')
    }
  },[activeArrow])
  
  //選擇哪個大項目展開
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

  const handleStyle = {
    color: '#fff',
    fontSize: 12,
    width: 32,
    height: 22,
    background: '#000'
  };
  
  //搜尋設定值reset
  const resetData = () => {
    setDetailCate('');
    setPage(1);
    setSearch('');
    setFrontPrice('');
    setBackPrice('');
    setSort('');
  }

    return(
        <>
      
      <Accordion className="sidebar" hidden={(value===pdIndex)?false:true} defaultActiveKey={pdIndex+''}>
      <div className="d-flex align-items-baseline">
        <h2 className="head5 reSidebarTitle">分類</h2>
        <div style={{
          borderBottom:'1px solid #ccc',
          width:'60%'}}></div>
      </div>
      
      <div>
        <Accordion.Toggle 
        as={Button} 
        variant="link" 
        eventKey="0" 
        className="rePaddingX0"
        onClick={()=> {setMainCate(1);resetData();}}
        >
        <h5>錄音設備</h5>
        </Accordion.Toggle>
      </div>
  <Accordion.Collapse eventKey="0" className="rePaddingX0">
  {/* detailCate: 1:耳塞式耳機_有線 2:耳塞式耳機_無線 3:耳罩式耳機_有線 4:耳罩式耳機_無線 5:專業麥克風_有線 6:shirt 7:帆布包 8:馬克杯 */}
  <ListGroup variant="flush" className="bg-test rePaddingX0">
      <ListGroup.Item className="rePaddingX0" onClick={()=> {setDetailCate(5);setSearch('')}}> <MdKeyboardArrowRight className="reArrowSpace" />麥克風</ListGroup.Item>
      <Accordion className="sidebar rePaddingX0" hidden={(value===pdIndex)?false:true}>
        <div>
          <Accordion.Toggle 
          className="rePaddingX0" 
          as={Button} 
          variant="link" 
          eventKey="0"
          onClick={()=>{setSearch("耳機");setDetailCate('');setActiveArrow(!activeArrow)}}
           >
          <p className="body3 dark" ><MdKeyboardArrowRight className="reArrow reArrowSpace" />耳機</p>
          </Accordion.Toggle>
        </div>

        <Accordion.Collapse eventKey="0">
        <ListGroup variant="flush" className="bg-test rePaddingX0">
          <ListGroup.Item className="rePaddingX1" onClick={()=> setDetailCate(4)}>耳罩式無線</ListGroup.Item> 
          <ListGroup.Item className="rePaddingX1" onClick={()=> setDetailCate(3)}>耳罩式有線</ListGroup.Item> 
          <ListGroup.Item className="rePaddingX1" onClick={()=> setDetailCate(2)}>耳塞式無線</ListGroup.Item>
          <ListGroup.Item className="rePaddingX1" onClick={()=> setDetailCate(1)}>耳塞式有線</ListGroup.Item>
        </ListGroup>  
        </Accordion.Collapse>
      </Accordion>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle 
    className="rePaddingX0" 
    as={Button} 
    variant="link" 
    eventKey="1"
    onClick={()=> {setMainCate(2);resetData();}}
    >
     <h5>播客周邊</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="1">
 
  <ListGroup variant="flush" className="bg-test rePaddingX0">
      <ListGroup.Item className="rePaddingX0" onClick={()=> {setDetailCate(6);setSearch('');}}>
      <MdKeyboardArrowRight className="reArrowSpace" />
      T-shirt
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0" onClick={()=> {setDetailCate(7);setSearch('');}}>
      <MdKeyboardArrowRight className="reArrowSpace" />
      帆布包
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0" onClick={()=> {setDetailCate(8);setSearch('');}}>
      <MdKeyboardArrowRight className="reArrowSpace" />
      馬克杯
      </ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle as={Button} className="rePaddingX0" variant="link" eventKey="2">
     <h5>線下活動</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="2">
 
  <ListGroup variant="flush" className="bg-test rePaddingX0">
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      講座
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      見面會
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      簽書會
      </ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>
  <div>
    <Accordion.Toggle className="rePaddingX0" as={Button} variant="link" eventKey="3">
     <h5>錄音室租借</h5>
    </Accordion.Toggle>
  </div>
  <Accordion.Collapse eventKey="3">
 
  <ListGroup variant="flush" className="bg-test rePaddingX0">
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      北部
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      中部
      </ListGroup.Item>
      <ListGroup.Item className="rePaddingX0">
      <MdKeyboardArrowRight className="reArrowSpace" />
      南部
      </ListGroup.Item>
  </ListGroup>  
  </Accordion.Collapse>

  <div className="d-flex align-items-baseline">
    <h2 className="head5 reSidebarTitle">篩選</h2>
    <div style={{
          borderBottom:'1px solid #ccc',
          width:'60%'}}>
    </div>
  </div>
  <p className="font-weight-bold">價格</p>
  <PdPriceSlider
    rangeValue={rangeValue}
    setRangeValue={setRangeValue}
  />
  <div className="d-flex justify-content-center mt-4">
    <button 
    className="btn re-btn btn-rounded re-btn-border-color"
    onClick={()=>{
      setFrontPrice(rangeValue[0]);
      setBackPrice(rangeValue[1]);
      }}
    >查看商品</button>
  </div>
  

</Accordion>



{/* <div className="box closing"> test</div> */}
 

          
        </>
        
    )
  
}

export default PdSideBar2