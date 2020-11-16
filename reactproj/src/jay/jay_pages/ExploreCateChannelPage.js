import './../jay_styles/ExploreCateChannelPage.scss';
import 'animate.css/animate.min.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  initalExploreCatePageAsync,
  initMemberChannelCollectionAsync,
  addChannelCollection,
  delChannelCollection,
} from '../../jay_actions/index';
import { withRouter, useParams } from 'react-router-dom';

//components
import { fadeIn, fadeInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';
import ScrollToTop from 'react-scroll-to-top';
import InformLoginModal from './../jay_components/InformLoginModal';

// react icon
import { RiMusic2Fill } from 'react-icons/ri';
import { TiArrowSortedUp } from 'react-icons/ti';

function ExploreCateChannelPage(props) {
  const styles = {
    fadeIn01: {
      animation: '2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    fadeIn02: {
      animation: '2.5s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    fadeIn03: {
      opacity: '0',
      animation: '3s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
      animationDelay: '1.6s',
      animationFillMode: 'forwards',
    },
    fadeInLeft01: {
      opacity: '0',
      animation: '1s',
      animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft'),
      animationDelay: '3s',
      animationFillMode: 'forwards',
    },
  };

  const [showInformLoginModal, setShowInformLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cate_term } = useParams();
  const [breadcrumbCateTerm, setBreadcrumbCateTerm] = useState('');
  const [hoverChannel, setHoverChannel] = useState(0);
  const transTermToChinese = () => {
    switch (cate_term) {
      case 'news':
        setBreadcrumbCateTerm('新聞');
        break;
      case 'society':
        setBreadcrumbCateTerm('故事');
        break;
      case 'education':
        setBreadcrumbCateTerm('教育');
        break;
      case 'health':
        setBreadcrumbCateTerm('健康');
        break;
      case 'sports':
        setBreadcrumbCateTerm('運動');
        break;
      case 'technology':
        setBreadcrumbCateTerm('科技');
        break;
      case 'business':
        setBreadcrumbCateTerm('商業');
        break;
      case 'entertainment':
        setBreadcrumbCateTerm('娛樂');
        break;
      default:
        setBreadcrumbCateTerm('無此');
    }
  };

  const imgUrlArray = [];

  function preLoadImgs() {
    props.cate_channels.forEach((item) => {
      imgUrlArray.push(item.podcaster_img);
    });
    let tempImgUrlArray = [];
    for (let i = 0; i < imgUrlArray.length; i++) {
      tempImgUrlArray[i] = new Image();
      tempImgUrlArray[i].src = imgUrlArray[i];
      // console.log(tempImgUrlArray);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '......' : str;
  }

  useEffect(() => {
    setIsLoading(true);
    async function initialGetData() {
      transTermToChinese();
      await props.initalExploreCatePageAsync(cate_term);
    }
    initialGetData();
  }, []);

  useEffect(() => {
    preLoadImgs();
  }, [props.cate_channels]);

  useEffect(() => {
    async function initialGetData() {
      await props.initMemberChannelCollectionAsync(props.member.sid);
    }
    initialGetData();
  }, [props.member]);

  const displayCatePage = (
    <StyleRoot>
      <ScrollToTop
        smooth
        style={{
          bottom: '120px',
          right: '80px',
          borderRadius: '50%',
          outline: 'none',
          opacity: '0.75',
        }}
        component={<TiArrowSortedUp style={{ fontSize: '1.8rem' }} />}
      />
      <div className="explorePageBody" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent">
              <li
                className="breadcrumb-item jay-not-now-page"
                aria-current="page"
                onClick={() => {
                  props.history.push('/explore_home_page');
                }}
              >
                <RiMusic2Fill style={{ fontSize: '1.5rem' }} className="mx-1" />
                探索
              </li>
              <li className="breadcrumb-item jay-now-page" aria-current="page">
                {breadcrumbCateTerm}類
              </li>
            </ol>
          </nav>
          <div className="row mt-4">
            <div className="col-md-3 jay-cateHotList-section">
              <div className="jay-section-title-area py-2 px-3">
                <h5>{breadcrumbCateTerm}類熱門排行</h5>
              </div>
              <div className=" d-flex mt-4 jay-hot-list-toggle-area">
                <div className="px-3 py-2 jay-hot-list-toggle-btn">
                  <a
                    href="javascript"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <p>頻道</p>
                  </a>
                </div>
              </div>
              <div className=" jay-hot-list-cate-channel">
                {props.cate_channels.map((item, index) => {
                  if (index > 8) {
                    return null;
                  }
                  return (
                    <div key={index} style={styles.fadeIn01}>
                      <a
                        className=" d-block w-100 jay-hot-list-cate-channel-btn pt-3 pb-2 mh14"
                        href="javascript"
                        onClick={(event) => {
                          event.preventDefault();
                          props.history.push(
                            `/channel_page/${item.channel_catagory.toLowerCase()}/${
                              item.podcaster_id
                            }`
                          );
                        }}
                        onMouseEnter={() => {
                          setHoverChannel(index);
                        }}
                      >
                        <div className="jay-border-line pb-2 container-fluid">
                          <div className=" row no-gutters d-flex">
                            <div className="jay-hot-list-cate-channel-rank d-flex align-items-center col-1">
                              <h4>{index + 1}.</h4>
                            </div>
                            <div className="jay-hot-list-cate-channel-pic mx-3 col-lg-3 col-7">
                              <img
                                src={
                                  item.podcaster_img.indexOf('http') !== -1
                                    ? item.podcaster_img
                                    : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                                }
                                alt=""
                              />
                            </div>
                            <div className="jay-hot-list-cate-channel-info col-5">
                              <h6>{item.channel_title}</h6>
                              <span>
                                評分：{(+item.channel_rating).toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-9 col-12">
              <div className="jay-svg-animation">
                {props.cate_channels.map((item, index) => {
                  if (index === hoverChannel) {
                    return (
                      <div className=" d-flex">
                        <div className="jay-svg-area col-6 position-relative">
                          <div className="jay-svg-img-area position-absolute">
                            <img
                              src={
                                item.podcaster_img.indexOf('http') !== -1
                                  ? item.podcaster_img
                                  : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                              }
                              alt=""
                              onClick={() => {
                                props.history.push(
                                  `/channel_page/${item.channel_catagory.toLowerCase()}/${
                                    item.podcaster_id
                                  }`
                                );
                              }}
                            />
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="heart-loader"
                            viewBox="0 0 100 100"
                          >
                            <g className="heart-loader__group">
                              <path
                                fill="none"
                                strokeWidth="0.5"
                                d="M13 56v39h40V56z"
                                className="heart-loader__square"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <div style={{ overflow: 'hidden' }} className=" pl-3">
                          <h4
                            style={styles.fadeIn03}
                            className="jay-ani-channel-title"
                          >
                            TOP {index + 1}. &nbsp;&nbsp; {item.channel_title}
                          </h4>
                          <p style={styles.fadeInLeft01} className="pt-3">
                            {truncate(item.podcaster_description, 150)}
                          </p>
                          {props.subscribe_channels.indexOf(
                            item.podcaster_id
                          ) === -1 ? (
                            <button
                              type="button"
                              className=" btn btn-sm btn-info my-3 mr-3"
                              style={styles.fadeInLeft01}
                              onClick={async () => {
                                if (props.member.sid) {
                                  await props.addChannelCollection(
                                    props.member.sid,
                                    item.podcaster_id
                                  );
                                  await props.initMemberChannelCollectionAsync(
                                    props.member.sid
                                  );
                                } else {
                                  setShowInformLoginModal(true);
                                }
                              }}
                            >
                              訂閱
                            </button>
                          ) : (
                            <button
                              type="button"
                              className=" btn btn-sm btn-info my-3 mr-3 btn-danger"
                              style={styles.fadeInLeft01}
                              onClick={async () => {
                                if (props.member.sid) {
                                  await props.delChannelCollection(
                                    props.member.sid,
                                    item.podcaster_id
                                  );
                                  await props.initMemberChannelCollectionAsync(
                                    props.member.sid
                                  );
                                } else {
                                  setShowInformLoginModal(true);
                                }
                              }}
                            >
                              訂閱中
                            </button>
                          )}

                          <button
                            type="button"
                            className=" btn btn-sm btn-secondary my-3 mr-3"
                            style={styles.fadeInLeft01}
                            onClick={() => {
                              props.history.push(
                                `/channel_page/${item.channel_catagory.toLowerCase()}/${
                                  item.podcaster_id
                                }`
                              );
                            }}
                          >
                            前往
                          </button>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <hr className="jay-cate-hr" />
              <h4 className="cate-head-term py-3 px-5">{breadcrumbCateTerm}</h4>
              <div className="d-flex flex-wrap">
                {props.cate_channels.map((item, index) => {
                  return (
                    <div
                      className="col-6 col-lg-3 col-sm-4 cate-all-channel"
                      key={index}
                      style={styles.fadeIn02}
                    >
                      <a
                        className=" d-block"
                        href="javascript"
                        onClick={(event) => {
                          event.preventDefault();
                          props.history.push(
                            `/channel_page/${cate_term}/${item.podcaster_id}`
                          );
                        }}
                      >
                        <div className="cate-all-channel-pic">
                          <img
                            src={
                              item.podcaster_img.indexOf('http') !== -1
                                ? item.podcaster_img
                                : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                            }
                            alt=""
                          />
                        </div>
                        <p className="pt-2">{item.channel_title}</p>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <InformLoginModal
        show={showInformLoginModal}
        onHide={() => setShowInformLoginModal(false)}
        setShowInformLoginModal={setShowInformLoginModal}
      />
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

  return isLoading ? displaySpinner : displayCatePage;
}

const mapStateToProps = (store) => {
  return {
    cate_channels: store.exploreCateChannel,
    member: store.member,
    subscribe_channels: store.memberChannelCollection,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    initalExploreCatePageAsync,
    initMemberChannelCollectionAsync,
    addChannelCollection,
    delChannelCollection,
  })(ExploreCateChannelPage)
);
