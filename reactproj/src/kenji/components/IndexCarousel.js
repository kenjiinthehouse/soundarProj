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
  useEffect(() => {
    // console.log(uu.get('jwt'))
    if (!localStorage.getItem('jwt')) {
      const uu = new URLSearchParams(window.location.search);
      if (uu.get('jwt')) {
        localStorage.setItem('jwt', JSON.stringify(uu.get('jwt')));
        props.initMemberAsync();
      }
    }
  }, []);

  let items = [
    {
      name: '百靈果NEWS',
      description: `“重新定義你對的自由的想像華語最自由的PODCAST頻道”`,
      img: './k_img/IndexBailingguoNews.jpg',
      click: '>>去聽聽',
      link: 'http://localhost:3000/channel_page/entertainment/2',
    },
    {
      name: 'Gooaye 股癌',
      description: '“晦澀金融投資知識直白講，重要海內外時事輕鬆談”',
      img: './k_img/IndexGooaye.jpg',
      click: '>>去聽聽',
      link: 'http://localhost:3000/channel_page/business/3',
    },
    {
      name: '法客電台',
      description: '“法律白話文運動無極限！跨界經營【法客電台】”',
      img: './k_img/IndexLawWhite.jpg',
      click: '>>去聽聽',
      link: 'http://localhost:3000/channel_page/news/8',
    },
    {
      name: '呱吉',
      description: `“賣房創業的87，是Youtuber，也是上班不要看的首腦。”`,
      img: './k_img/IndexFroggy.jpg',
      click: '>>去聽聽',
      link: 'http://localhost:3000/channel_page/society/5',
    },
    {
      name: 'Soundar',
      description: '“Podcast界到底發生了什麼事，透過我們的雷達幫你搜尋”',
      img: './k_img/IndexC2.jpg',
      click: '>>去聽聽',
      link: 'http://localhost:3000/explore_home_page',
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
      <Button className="CheckButton" href={props.item.link}>
        <label className="clickLabel">{props.item.click}</label>
        {props.item.name}
      </Button>
    </Paper>
  );
}
//samps引入會員登入
const mapStateToProps = (store) => {
  return { member: store.member };
};
export default withRouter(
  connect(mapStateToProps, { initMember, initMemberAsync })(IndexCarousel)
);
