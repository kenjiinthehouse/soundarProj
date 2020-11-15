import React, { useState, useEffect } from 'react';
import './../ch_styles/custom.scss';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { withRouter } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
// import Breadcrumb from '../ch_components/Breadcrumb'
import StudioInfo from '../ch_components/studio/StudioInfo';
import StudioOption from '../ch_components/studio/StudioOption';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Tabs, Tab } from 'react-bootstrap';

import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

function StudioMain(props) {
  const [studioData, setStudioData] = useState([]);
  const [newStudio, setNewStudio] = useState([])

  const [dataLoading, setDataLoading] = useState(false)
    const loader_css = css`
    display: inline-block;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    `;
    const displaySpinner = (
        <div className="re-spinnerArea">
          <ScaleLoader
            css={loader_css}
            color={'#4A90E2'}
            height={80}
            width={10}
            margin={6}
            radius={20}
          />
        </div>
      );

  async function getStudioFromServer() {
    setDataLoading(true)
    const url = 'http://localhost:5566/studio/option/1';
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    setNewStudio(data)
    let arr = [];
    arr.push(data);
    console.log(arr);
    setStudioData(arr);
  }

  useEffect(() => {
    getStudioFromServer();
    setTimeout(() => setDataLoading(false), 1200);
  }, []);

  const introduction = (
    <>
      {studioData.map((item) => {
        return (
          <div className="studio-introduction" key={item}>
            <h2>{item[0].studio_name}</h2>
            <h3>NT$ {item[0].studio_price} </h3>
            <span style={{color:'#44494A'}}>
              顧客評價
              <Rater rating={item[0].studio_review} total={5} interactive={false} />
              {item[0].studio_review}(25)
            </span>
            <div className="location-wrap mt-4">
              <FaMapMarkerAlt className="mr-2" />
              地點：{item[0].studio_location}
            </div>
            <button
              className="btn btn-option btn-lg"
              onClick={() => {
                props.history.push('/studiomain');
              }}
            >
              選擇方案
            </button>
          </div>
        );
      })}
    </>
  );

  //圖片切換
  class ImgCarousel extends React.Component {
    constructor() {
      super();
      this.state = {
        value: 0,
        slides: [
          <img
            src={'http://localhost:3000/ch_img/s000101.jpg'}
            className="img-demo"
            alt=""
          />,
          <img
            src={'http://localhost:3000/ch_img/s000102.jpg'}
            className="img-demo"
            alt=""
          />,
          <img
            src={'http://localhost:3000/ch_img/s000103.jpg'}
            className="img-demo"
            alt=""
          />,
        ],
        thumbnails: [
          <img
            src={'http://localhost:3000/ch_img/s000101.jpg'}
            className="studio-img w-100"
            alt=""
          />,
          <img
            src={'http://localhost:3000/ch_img/s000102.jpg'}
            className="studio-img w-100"
            alt=""
          />,
          <img
            src={'http://localhost:3000/ch_img/s000103.jpg'}
            className="studio-img w-100"
            alt=""
          />,
        ],
      };
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
            <MdKeyboardArrowLeft
              style={{ fontSize: '3.5rem', color: 'rgba(144, 147, 147, 0.3)' }}
            />
            <Dots
              number={this.state.thumbnails.length}
              thumbnails={this.state.thumbnails}
              value={this.state.value}
              onChange={this.onchange}
              number={this.state.slides.length}
            />
            <MdKeyboardArrowRight
              style={{ fontSize: '3.5rem', color: 'rgba(144, 147, 147, 0.3)' }}
            />
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
          <StudioOption newStudio={newStudio} setNewStudio={setNewStudio} />
        </Tab>
        <Tab eventKey="info" title="介紹">
          <StudioInfo />
        </Tab>
        <Tab eventKey="evaluation" title="評價"></Tab>
      </Tabs>
    );
  }

  const display = (
    <> 
      {/* <Breadcrumb /> */}
      <div className="studio-main">
        <div className="container studio-head">
          <div className="d-flex ">
            <ImgCarousel />
            {introduction}
          </div>          
        </div>
        <ControlledTabs />
      </div>
    </>
  )

  return dataLoading ? displaySpinner : display
}

export default withRouter(StudioMain);
