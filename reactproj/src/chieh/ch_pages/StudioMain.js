import React, { useState, useEffect } from 'react';
import './../ch_styles/custom.scss';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { withRouter } from 'react-router-dom'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
// import Breadcrumb from '../ch_components/Breadcrumb'
import StudioInfo from '../ch_components/StudioInfo'
import StudioOption from '../ch_components/StudioOption'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Tabs, Tab } from 'react-bootstrap';


function StudioMain(props){
    const [studioData, setStudioData] = useState([])  
    async function getStudioFromServer() {
      const url = 'http://localhost:5566/studio/option/1'  
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
      setStudioData(arr)
    }    
  
    useEffect(() => {
        getStudioFromServer()
    }, [])
  
  const introduction= (
    <>
      { studioData.map((item=>{
        return (
          <div className="studio-introduction" key={item}>
            <h2>{item[0].studio_name}</h2>
            <h3>NT$ {item[0].studio_price}</h3>
            <span>顧客評價
            <Rater rating={item[0].studio_review} total={5} interactive={false}/>
            {item[0].studio_review}(25)</span>
            <div className="location-wrap mt-4">
              <FaMapMarkerAlt className="mr-2"/>地點：{item[0].studio_location}
            </div>
            <button className="btn btn-option btn-lg" onClick={()=>{props.history.push('/studiomain')}}>選擇方案</button>
          </div>
        )
      }))}
    </>
  )

  //圖片切換
  class MyCarousel extends React.Component {
    constructor() {
      super()
      this.state = {
        value: 0,
        slides: [
          (<img src={"http://localhost:3000/ch_img/s000101.jpg"} className="img-demo" alt="" />),
          (<img src={"http://localhost:3000/ch_img/s000102.jpg"} className="img-demo" alt="" />),
          (<img src={"http://localhost:3000/ch_img/s000103.jpg"} className="img-demo" alt="" />),
        ],
        thumbnails: [
          (<img src={"http://localhost:3000/ch_img/s000101.jpg"} className="studio-img w-100" alt="" />),
          (<img src={"http://localhost:3000/ch_img/s000102.jpg"} className="studio-img w-100" alt="" />),
          (<img src={"http://localhost:3000/ch_img/s000103.jpg"} className="studio-img w-100" alt="" />),
        ],
      }
      this.onchange = this.onchange.bind(this);
    } 
  
    onchange(value) {
      this.setState({ value });
    }
  
    render() {
      return (
      <div className="img-area">
        <Carousel
          value={this.state.value}
          slides={this.state.slides}
          onChange={this.onchange}
        />
        <div className="img-wrap d-flex justify-content-between align-items-center">
          <MdKeyboardArrowLeft style={{fontSize:'3.5rem', color: 'rgba(144, 147, 147, 0.3)'}}/>
          <Dots number={this.state.thumbnails.length} thumbnails={this.state.thumbnails} value={this.state.value} onChange={this.onchange} number={this.state.slides.length} />
          <MdKeyboardArrowRight style={{fontSize:'3.5rem', color: 'rgba(144, 147, 147, 0.3)'}}/>
        </div>
      </div>
      );
    }
  }

    //方案,介紹,評價分頁切換
    function ControlledTabs() {
        const [key, setKey] = useState('option');      
        return (
          <Tabs
            id="controlled-tab-studio"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="nav-pills-studio d-flex justify-content-between"
          >
            <Tab eventKey="option" title="方案">
                <StudioOption studioData={studioData} setStudioData={setStudioData}/>              
            </Tab>
            <Tab eventKey="info" title="介紹">
                <StudioInfo />              
            </Tab>
            <Tab eventKey="evaluation" title="評價">
            <div><h1>評價</h1></div>
            </Tab>
          </Tabs>
        );
      }

    return(
        <>
            {/* <Breadcrumb /> */}
            <div className="studio-main">
              <div className="container d-flex">
                <MyCarousel />
                {introduction}
              </div>
              <ControlledTabs/>    
            </div>             
        </>
    )
}

export default withRouter(StudioMain)

