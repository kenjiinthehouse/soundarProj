import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { initMemberAsync, logOut } from '../../actions/index';
import { connect } from 'react-redux';
import '../styles/Channelcollection.scss';

function Channelcollection(props) {
  const [channel_collect, setChannel_collect] = useState([]);
  const [collect_box, setCollect_box] = useState('');
  //設定大頭貼來源是否有http
  const [pictureurl, setPictureurl] = useState('');
  const setPicture = function (pic) {
    if (pic.includes('http')) {
      setPictureurl(pic);
    } else {
      setPictureurl(`ppicture/${pic}`);
    }
  };
  const getChannel = async function () {
    const url = 'http://localhost:5566/member_collection/channel_collection';

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: props.member.sid,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    setChannel_collect(data.rs);
  };

  const setbox = function () {
    console.log('length', channel_collect.length);
    if (channel_collect.length < 2) {
      setCollect_box('sa-100vh');
    } else {
      setCollect_box('sa-collection-wrap');
    }
  };
  // useEffect(() => {
  //   props.initMemberAsync()
  // }, [])

  useEffect(() => {
    getChannel();
    if (props.member.profile_picture) {
      setPicture(props.member.profile_picture);
    }
  }, [props.member]);

  useEffect(() => {
    setbox();
  }, [channel_collect]);

  return (
    <>
      <div className={collect_box}>
        <div className="sa-collection-title-bc">
          <div className="container">
            <div className="row ">
              <div className="sa-collection-title-wrap">
                <div className="sa-collection-title-line1">
                  <span>追蹤清單</span>
                </div>
                <div className="sa-collection-title-line2">
                  <span>已追蹤的頻道</span>
                </div>
                <div className="sa-collection-title-line3">
                  <div className="sa-collection-title-photo">
                    {props.member.profile_picture ? (
                      <img
                        className="sa-collection-title-photo-img"
                        src={pictureurl}
                      ></img>
                    ) : (
                      <img
                        className="sa-collection-title-photo-img"
                        src={'sa_img/side_bar/profile_picture.png'}
                      ></img>
                    )}
                  </div>
                  <div className="sa-collection-title-nickname">
                    <span>{props.member.nickname}</span>
                  </div>
                  <div className="sa-collection-title-audionumber">
                    <span>{channel_collect.length}</span>
                    <span>個追蹤頻道</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sa-channel-list-wrap">
          <div className="container">
            <div className="row">
              {channel_collect.length == 0 ? (
                <>
                  <div className="sa-nothingbox">
                    <div className="sa-nothingbox-title">尚未有追蹤的頻道</div>
                    <div
                      className="sa-nothingbox-go"
                      onClick={() => {
                        props.history.push('/explore_home_page');
                      }}
                    >
                      前往探索
                    </div>
                  </div>
                </>
              ) : (
                channel_collect.map((item, index) => (
                  <div key={item.channel_id} className="col-3">
                    <div
                      onClick={() => {
                        props.history.push(
                          `/channel_page/${item.channel_catagory}/${item.channel_id}`
                        );
                      }}
                      className="sa-channel-collection-colbox"
                    >
                      <div className="sa-channel-collection-img-area">
                        {item.channel_img.includes('http') ? (
                          <img
                            className="sa-channel-collection-img"
                            src={item.channel_img}
                            alt=""
                          />
                        ) : (
                          <img
                            className="sa-channel-collection-img"
                            src={`podcaster_imgs/${item.channel_img}`}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="sa-channel-collection-title-area">
                        <span className="sa-channel-collection-title">
                          {item.channel_title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (store) => {
  return { member: store.member };
};
export default withRouter(
  connect(mapStateToProps, { initMemberAsync, logOut })(Channelcollection)
);
