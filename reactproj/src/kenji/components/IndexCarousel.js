import React from 'react';
import '../styles/IndexCarousel.scss';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';


//samps引入會員登入
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initMember, initMemberAsync } from '../../actions/index';
import { withRouter } from 'react-router-dom';

function IndexCarousel(props) {
  let items = [
    {
      name: '百靈果NEWS',
      description: `“重新定義你對的自由的想像華語最自由的PODCAST頻道”`,
      img: './k_img/IndexBailingguoNews.jpg',
      click: '>>去聽聽',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      img: './k_img/IndexC2.jpg',
      click: '>>去聽聽',
    },
    {
      name: 'Random Name #3',
      description: 'Hello World!',
      img: './k_img/IndexC3.jpg',
      click: '>>去聽聽',
    },
    {
      name: 'Random Name #4',
      description: 'Hello World!',
      img: './k_img/IndexC4.jpg',
      click: '>>去聽聽',
    },
    {
      name: 'Random Name #5',
      description: 'Hello World!',
      img: './k_img/IndexC5.jpg',
      click: '>>去聽聽',
    },
  ];

  return (
    <>
      <Carousel
        className="indexCarousel mx-auto"
        autoPlay={false}
        timeout={300}
        indicators={true}
        navButtonsAlwaysVisible={true}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <div className="indexColorCard"></div>
    </>
  );
}

function Item(props) {
  return (
    <Paper>
      {/* <h2>{props.item.name}</h2> */}
      <p>{props.item.description}</p>
      <img src={props.item.img} />
      <Button className="CheckButton">
        <label className="clickLabel">{props.item.click}</label>
        {props.item.name}
      </Button>
    </Paper>
  );
}
export default IndexCarousel;
