import './../jay_styles/ChannelAudioPage.scss';
import 'animate.css/animate.min.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  initalChannelPageAsync,
  initalDashboardAsync,
  initMemberChannelCollectionAsync,
  initMemberAudioCollectionAsync,
  addCollection,
  delCollection,
  addChannelCollection,
  delChannelCollection,
} from '../../jay_actions/index';
import { getMsgAsync } from '../../actions/index';
import { withRouter, useParams } from 'react-router-dom';

//components
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';
import ScrollToTop from 'react-scroll-to-top';
import MsgBoard from './../../kenji/components/MsgBoard';
import InformLoginModal from './../jay_components/InformLoginModal';
import InformAudioActionModal from './../jay_components/InformAudioActionModal';
// bootstrap
import ChannelRatingModal from './../jay_components/ChannelRatingModal';

// react icon
import { RiMusic2Fill, RiPlayListAddLine } from 'react-icons/ri';
import { FaRss, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillPlayCircle } from 'react-icons/ai';
import { TiArrowSortedUp } from 'react-icons/ti';

//ant design
import 'antd/dist/antd.css';
import { Rate, Input } from 'antd';

function ChannelAudioPage(props) {
  const styles = {
    fadeIn01: {
      animation: '2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    fadeIn02: {
      animation: '2.5s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
  };

  const {
    globalAudioArry,
    setGlobalAudioArry,
    playingAudio,
    setPlayingAudio,
  } = props;
  const { Search } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const [showInformLoginModal, setShowInformLoginModal] = useState(false);
  const [showRatingModel, setShowRatingModel] = useState(false);
  const { cate_term, podcaster_id, audio_sid } = useParams();
  const [breadcrumbCateTerm, setBreadcrumbCateTerm] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalText, setActionModalText] = useState('');
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

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '......' : str;
  }

  useEffect(() => {
    setIsLoading(true);
    async function initialGetData() {
      transTermToChinese();
      await props.initalDashboardAsync(podcaster_id);
      await props.initalChannelPageAsync(podcaster_id);
      await props.getMsgAsync();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    initialGetData();
  }, []);

  useEffect(() => {
    props.initMemberAudioCollectionAsync(props.member.sid);
    props.initMemberChannelCollectionAsync(props.member.sid);
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
              <li
                className="breadcrumb-item jay-not-now-page"
                aria-current="page"
                onClick={() => {
                  props.history.push(`/explore/category/${cate_term}`);
                }}
              >
                {breadcrumbCateTerm}類
              </li>
              <li
                className="breadcrumb-item jay-not-now-page"
                aria-current="page"
                onClick={() => {
                  props.history.push(
                    `/channel_page/${cate_term}/${podcaster_id}`
                  );
                }}
              >
                {props.channel_data.map((item) => item.channel_title)}
              </li>
              <li className="breadcrumb-item jay-now-page" aria-current="page">
                {props.channel_audio_data.map((item) => {
                  if (item.sid === +audio_sid) {
                    return truncate(item.audio_title, 50);
                  }
                })}
              </li>
            </ol>
          </nav>
          <div className="row mt-4">
            {props.channel_data.map((item, index) => {
              return (
                <div
                  className="col-lg-3 col-12 jay-side-bar"
                  key={index}
                  style={styles.fadeIn01}
                >
                  <div className="jay-channel-head-pic-area">
                    <img src={item.podcaster_img} alt="" />
                  </div>
                  <div className="col-12 col-sm mb-5">
                    <h3 className="pt-3" style={{ lineHeight: '1.5' }}>
                      {item.channel_title}
                    </h3>
                    <div>
                      <span>{breadcrumbCateTerm}</span>
                    </div>
                    <div>
                      {props.subscribe_channels.indexOf(item.sid) === -1 ? (
                        <button
                          type="button"
                          className=" btn btn-sm btn-info my-3 mr-3"
                          style={styles.fadeInLeft01}
                          onClick={async () => {
                            if (props.member.sid) {
                              await props.addChannelCollection(
                                props.member.sid,
                                item.sid
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
                                item.sid
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
                      >
                        分享
                      </button>
                      <button
                        type="button"
                        className=" btn btn-sm btn-secondary my-3"
                        onClick={() => {
                          if (props.member && props.member.sid) {
                            setShowRatingModel(true);
                          } else {
                            setShowInformLoginModal(true);
                          }
                        }}
                      >
                        評分
                      </button>
                    </div>
                    <div className=" mb-1">
                      <Rate
                        style={{
                          filter: 'brightness(1.5)',
                          fontSize: '1.5rem',
                        }}
                        allowHalf
                        disabled
                        defaultValue={item.channel_rating}
                      />
                    </div>
                    <div>
                      <span>
                        網友評比： &nbsp;&nbsp;
                        {(+item.channel_rating).toFixed(1)}
                        &nbsp;/&nbsp; 5
                      </span>
                    </div>
                    <div className="pt-4">
                      <a target="_blank" href={item.channel_rss_link}>
                        <FaRss style={{ fontSize: '1.25rem' }} />
                        <span className="px-2">RSS訂閱</span>
                      </a>
                    </div>
                    <div className="pt-2">
                      <a href={'mailto:' + item.owner_email}>
                        <MdEmail style={{ fontSize: '1.25rem' }} />
                        <span className="px-2">聯絡我們</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="col-lg-9 col-12 jay-main-bar"
              style={styles.fadeIn02}
            >
              {props.channel_audio_data.map((item, index) => {
                if (item.sid === +audio_sid) {
                  return (
                    <div key={index}>
                      <div className=" d-flex py-3 px-5 mb-3 audio-info">
                        <div className="w-100">
                          <h5 className=" mb-3">
                            單集名稱：
                            <br />
                            {item.audio_title}
                          </h5>
                          <p
                            style={{
                              whiteSpace: 'pre-wrap',
                              fontSize: '1rem',
                            }}
                          >
                            {item.audio_content}
                          </p>
                          <div className="d-flex justify-content-between align-items-end mt-3">
                            <span className=" d-block w-50">
                              {item.pubDate}
                            </span>
                            <div className=" d-flex justify-content-around align-items-center w-50">
                              <div
                                className="audio-info-icon"
                                onClick={(event) => {
                                  let playTargetAudio = null;
                                  [
                                    playTargetAudio,
                                  ] = props.channel_audio_data.filter(
                                    (v) => v.sid === item.sid
                                  );
                                  let payload = {
                                    musicSrc:
                                      playTargetAudio.audio_file.indexOf(
                                        'http'
                                      ) !== -1
                                        ? playTargetAudio.audio_file
                                        : `http://localhost:3000/audios/${playTargetAudio.audio_file}`,
                                    cover: playTargetAudio.podcaster_img,
                                    name: playTargetAudio.audio_title,
                                    singer: playTargetAudio.channel_title,
                                  };
                                  if (
                                    globalAudioArry[0] &&
                                    globalAudioArry[0].name === payload.name
                                  ) {
                                    return null;
                                  } else {
                                    setGlobalAudioArry([
                                      payload,
                                      ...globalAudioArry,
                                    ]);
                                  }
                                }}
                              >
                                {playingAudio &&
                                playingAudio.name === item.audio_title ? (
                                  <AiFillPlayCircle
                                    style={{
                                      fontSize: '2.5rem',
                                      color: '#F780AE',
                                    }}
                                  />
                                ) : (
                                  <AiFillPlayCircle
                                    style={{ fontSize: '2.5rem' }}
                                  />
                                )}
                              </div>
                              <div
                                className="audio-info-icon"
                                onClick={(event) => {
                                  setActionModalText('已加入至播放儲列');
                                  setShowActionModal(true);
                                  let playTargetAudio = null;
                                  [
                                    playTargetAudio,
                                  ] = props.channel_audio_data.filter(
                                    (v) => v.sid === item.sid
                                  );
                                  let payload = {
                                    musicSrc:
                                      playTargetAudio.audio_file.indexOf(
                                        'http'
                                      ) !== -1
                                        ? playTargetAudio.audio_file
                                        : `http://localhost:3000/audios/${playTargetAudio.audio_file}`,
                                    cover: playTargetAudio.podcaster_img,
                                    name: playTargetAudio.audio_title,
                                    singer: playTargetAudio.channel_title,
                                  };
                                  if (globalAudioArry[0]) {
                                    let alreadyInArry = false;
                                    globalAudioArry.forEach((item) => {
                                      if (item.name === payload.name) {
                                        alreadyInArry = true;
                                      }
                                    });
                                    if (alreadyInArry !== true) {
                                      setGlobalAudioArry([
                                        ...globalAudioArry,
                                        payload,
                                      ]);
                                    }
                                  } else {
                                    setGlobalAudioArry([
                                      ...globalAudioArry,
                                      payload,
                                    ]);
                                  }
                                }}
                              >
                                <RiPlayListAddLine
                                  style={{ fontSize: '2rem' }}
                                />
                              </div>
                              <div
                                className="audio-info-icon"
                                onClick={async () => {
                                  if (props.member.sid) {
                                    //寫回資料庫
                                    if (
                                      props.audioCollection.indexOf(
                                        item.sid
                                      ) === -1
                                    ) {
                                      setActionModalText('已加入我的收藏');
                                      setShowActionModal(true);
                                      await props.addCollection(
                                        props.member.sid,
                                        item.sid
                                      );
                                      await props.initMemberAudioCollectionAsync(
                                        props.member.sid
                                      );
                                    } else {
                                      setActionModalText('已從我的收藏移除');
                                      setShowActionModal(true);
                                      await props.delCollection(
                                        props.member.sid,
                                        item.sid
                                      );
                                      await props.initMemberAudioCollectionAsync(
                                        props.member.sid
                                      );
                                    }
                                  } else {
                                    setShowInformLoginModal(true);
                                  }
                                }}
                              >
                                {props.audioCollection.indexOf(item.sid) ===
                                -1 ? (
                                  <FaHeart style={{ fontSize: '2rem' }} />
                                ) : (
                                  <FaHeart
                                    style={{
                                      fontSize: '2rem',
                                      color: '#F780AE',
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <hr className="jay-cate-hr" />
              <div>
                <MsgBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChannelRatingModal
        show={showRatingModel}
        onHide={() => setShowRatingModel(false)}
      />
      <InformLoginModal
        show={showInformLoginModal}
        onHide={() => setShowInformLoginModal(false)}
        setShowInformLoginModal={setShowInformLoginModal}
      />
      {showActionModal ? (
        <InformAudioActionModal
          setShowActionModal={setShowActionModal}
          actionModalText={actionModalText}
        />
      ) : null}
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
    channel_audio_data: store.channelPageData,
    channel_data: store.podcasterDashboardInfoState,
    subscribe_channels: store.memberChannelCollection,
    member: store.member,
    audioCollection: store.memberAudioCollection,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    initalChannelPageAsync,
    initalDashboardAsync,
    getMsgAsync,
    initMemberChannelCollectionAsync,
    initMemberAudioCollectionAsync,
    addCollection,
    delCollection,
    addChannelCollection,
    delChannelCollection,
  })(ChannelAudioPage)
);
