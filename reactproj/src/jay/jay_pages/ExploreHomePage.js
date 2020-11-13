import './../jay_styles/ExploreHomePage.scss';
import 'animate.css/animate.min.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { initalExploreHomePageAsync } from '../../jay_actions/index';
import { withRouter, Link } from 'react-router-dom';

//components
import { fadeInUp, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

// react icon
import { RiMusic2Fill } from 'react-icons/ri';
import {
  FaRegNewspaper,
  FaWalking,
  FaBook,
  FaSuitcase,
  FaGraduationCap,
} from 'react-icons/fa';
import { CgSmartphoneChip } from 'react-icons/cg';
import { GiPartyFlags, GiHealthNormal } from 'react-icons/gi';

function ExploreHomePage(props) {
  const styles = {
    fadeInUp01: {
      animation: '2s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp02: {
      animation: '2.2s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp03: {
      animation: '2.4s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp04: {
      animation: '2.6s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp05: {
      animation: '2.8s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp06: {
      animation: '3s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp07: {
      animation: '3.2s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInUp08: {
      animation: '3.4s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeIn01: {
      animation: '4s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  const transTermToChinese = (cate_term) => {
    let tempCateTerm = cate_term.toLowerCase();
    switch (tempCateTerm) {
      case 'news':
        return '新聞';
        break;
      case 'society':
        return '故事';
        break;
      case 'education':
        return '教育';
        break;
      case 'health':
        return '健康';
        break;
      case 'sports':
        return '運動';
        break;
      case 'technology':
        return '科技';
        break;
      case 'business':
        return '商業';
        break;
      case 'entertainment':
        return '娛樂';
        break;
      default:
        return '無此';
    }
  };

  const imgUrlArray = [
    'http://localhost:3000/images/explore_categories/pexels-sahidin-sahidin-2695975.jpg',
    'http://localhost:3000/images/explore_categories/board-22098_1920.jpg',
    'http://localhost:3000/images/explore_categories/sport.jpg',
    'http://localhost:3000/images/explore_categories/pexels-teddy-2263410.jpg',
    'http://localhost:3000/images/explore_categories/story02.jpg',
    'http://localhost:3000/images/explore_categories/dices-over-newspaper-2656028_1920.jpg',
    'http://localhost:3000/images/explore_categories/book-1822474_1920.jpg',
    'http://localhost:3000/images/explore_categories/salad-2756467_1920.jpg',
  ];

  function preLoadImgs() {
    props.popular_channel.forEach((item) => {
      imgUrlArray.push(item.podcaster_img);
    });
    let tempImgUrlArray = [];
    for (let i = 0; i < imgUrlArray.length + 8; i++) {
      tempImgUrlArray[i] = new Image();
      tempImgUrlArray[i].src = imgUrlArray[i];
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  useEffect(() => {
    setIsLoading(true);
    async function initialGetData() {
      await props.initalExploreHomePageAsync();
    }
    initialGetData();
  }, []);

  useEffect(() => {
    preLoadImgs();
  }, [props.popular_channel]);

  const displayExploreHomePage = (
    <StyleRoot>
      <div className="explorePageBody" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent">
              <li className="breadcrumb-item jay-now-page" aria-current="page">
                <RiMusic2Fill style={{ fontSize: '1.5rem' }} className="mx-1" />
                探索
              </li>
            </ol>
          </nav>
          <div className="jay-section-title-area py-2 px-3 col-md-2 col-6">
            <h5>探索分類</h5>
          </div>
          <div className="row d-flex mb-5">
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp01}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/news');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/pexels-sahidin-sahidin-2695975.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <FaRegNewspaper />
                  <h3 className=" text-center mt-1">新聞</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp02}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/technology');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/board-22098_1920.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <CgSmartphoneChip />
                  <h3 className=" text-center mt-1">科技</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp03}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/sports');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/sport.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <FaWalking />
                  <h3 className=" text-center mt-1">運動</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp04}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/entertainment');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/pexels-teddy-2263410.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <GiPartyFlags />
                  <h3 className=" text-center mt-1">娛樂</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp05}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/society');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/story02.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <FaBook />
                  <h3 className=" text-center mt-1">故事</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp06}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/business');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/dices-over-newspaper-2656028_1920.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <FaSuitcase />
                  <h3 className=" text-center mt-1">商業</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp07}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/education');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/book-1822474_1920.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <FaGraduationCap />
                  <h3 className=" text-center mt-1">教育</h3>
                </div>
              </a>
            </div>
            <div
              className="col-md-3 col-6 jay-cate-img-area py-3 position-relative"
              style={styles.fadeInUp08}
            >
              <a
                href="javascript"
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push('/explore/category/health');
                }}
              >
                <img
                  src="http://localhost:3000/images/explore_categories/salad-2756467_1920.jpg"
                  alt=""
                />
                <div className="position-absolute jay-cate-icon-layer">
                  <GiHealthNormal />
                  <h3 className=" text-center mt-1">健康</h3>
                </div>
              </a>
            </div>
          </div>
          <div className="jay-section-title-area py-2 px-3 col-md-2 col-6 mb-5">
            <h5>熱門頻道排行</h5>
          </div>
          <div className="row d-flex">
            {props.popular_channel.map((item, index) => {
              if (index >= 5) {
                return null;
              }
              return (
                <div
                  className="col-6 col-lg d-flex position-relative jay-channel-rating-section1"
                  style={styles.fadeIn01}
                  key={index}
                >
                  <div className="jay-channel-rating-number">
                    <img
                      src={require(`../jay_imgs_svgs/rating_number/${
                        index + 1
                      }.svg`)}
                      alt=""
                    />
                  </div>
                  <div className="jay-channel-rating-pic position-absolute">
                    <a
                      href="javascript"
                      onClick={(event) => {
                        event.preventDefault();
                        props.history.push(
                          `/channel_page/${item.channel_catagory.toLowerCase()}/${
                            item.podcaster_id
                          }`
                        );
                      }}
                    >
                      <img
                        src={
                          item.podcaster_img.indexOf('http') !== -1
                            ? item.podcaster_img
                            : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                        }
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row d-flex mt-3 no-gutters">
            {props.popular_channel.map((item, index) => {
              if (index < 5) {
                return null;
              }
              return (
                <a
                  className="jay-rank-6-10-btn col-6 col-lg d-block"
                  key={index}
                  href="javascript"
                  onClick={(event) => {
                    event.preventDefault();
                    props.history.push(
                      `/channel_page/${item.channel_catagory.toLowerCase()}/${
                        item.podcaster_id
                      }`
                    );
                  }}
                  style={{
                    display: 'block',
                    zIndex: '100',
                  }}
                >
                  <div className="d-flex jay-channel-rating-section2 py-3 px-3 mh14 w-100">
                    <div className="jay-section2-part1">
                      <div className="jay-number-circle-area position-relative">
                        <h6 className=" position-absolute">{index + 1}</h6>
                      </div>
                    </div>
                    <div className="jay-section2-part2">
                      <div className="jay-channel-rating-pic-part2">
                        <img
                          src={
                            item.podcaster_img.indexOf('http') !== -1
                              ? item.podcaster_img
                              : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="jay-section2-part3">
                      <h6>{item.channel_title}</h6>
                      <span>{transTermToChinese(item.channel_catagory)}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </StyleRoot>
  );

  const loader_css = css`
    display: inline-block;
  `;

  const displaySpinner = (
    <div className="explorePageBody">
      <div className="jay-spinnerArea">
        <ScaleLoader
          css={loader_css}
          color={'#4A90E2'}
          height={80}
          width={10}
          margin={6}
          radius={20}
        />
      </div>
    </div>
  );

  return isLoading ? displaySpinner : displayExploreHomePage;
}

const mapStateToProps = (store) => {
  return { popular_channel: store.explorePopularChannel };
};

export default withRouter(
  connect(mapStateToProps, { initalExploreHomePageAsync })(ExploreHomePage)
);
