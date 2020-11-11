import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { initMemberAsync, logOut } from '../../actions/index';
import { connect } from 'react-redux';
import '../styles/Audiocollection.scss';
//react icon
import { ImFolderDownload } from 'react-icons/im';
import { RiDislikeFill } from 'react-icons/ri';
import { BsPlayFill } from 'react-icons/bs';

function Audiocollection(props) {
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  // item.audio_id
  const [audio_collect, setAudio_collect] = useState([]);

  const [collect_box, setCollect_box] = useState('');

  const [filename, setFilename] = useState('');
  const [downloadingid, setDownloadingid] = useState('');
  // const [downloading, setdownLoading] = useState(false)

  const Filedownload = React.useRef(null);
  const handleClick = (event) => {
    Filedownload.current.click();
  };

  // const loading = (
  //   <div class="spinner-border text-primary" role="status">
  //     <span class="sr-only">Loading...</span>
  //   </div>
  // )

  const setbox = function () {
    console.log('length', audio_collect.length);
    if (audio_collect.length < 3) {
      setCollect_box('sa-100vh');
    } else {
      setCollect_box('sa-collection-wrap');
    }
  };

  const getaudio_collect = async function () {
    const url = 'http://localhost:5566/member_collection/audio_collection';
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
    setAudio_collect(data.rs);
  };

  const delete_audio = async function (audio_id) {
    const url = 'http://localhost:5566/member_collection/delete_audio';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: props.member.sid,
        audio_id: audio_id,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log('data', data);
    getaudio_collect();
  };
  // useEffect(() => {
  //   // props.logOut()
  //   props.initMemberAsync()
  //   // console.log("hi")
  // }, [])
  // useEffect(() => {
  //   props.initMemberAsync()
  // }, [])
  useEffect(() => {
    getaudio_collect();
    // setbox()
  }, [props.member]);

  useEffect(() => {
    setbox();
  }, [audio_collect]);

  const downloadfile = async function (link, audio_id) {
    // console.log('link', link)
    setDownloadingid(audio_id);
    const url = 'http://localhost:5566/member_collection/download';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        link: link,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    setFilename(data.name);
    handleClick();
    setDownloadingid('');
  };

  return (
    <>
      <div className={collect_box}>
        <div className="sa-collection-title-bc">
          <div className="container">
            <div className="row ">
              <div className="sa-collection-title-wrap">
                <div className="sa-collection-title-line1">
                  <span>播放清單</span>
                  <a
                    href={`music/${filename}.mp3`}
                    download={`${filename}.mp3`}
                    style={{ display: 'none' }}
                    ref={Filedownload}
                  >
                    {/* setFilename('music/' + data.name + '.mp3') */}
                    下載
                  </a>
                </div>
                <div className="sa-collection-title-line2">
                  <span>已收藏的節目</span>
                </div>
                <div className="sa-collection-title-line3">
                  <div className="sa-collection-title-photo">
                    {props.member.profile_picture ? (
                      <img
                        className="sa-collection-title-photo-img"
                        src={`ppicture/${props.member.profile_picture}`}
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
                    <span>{audio_collect.length}</span>
                    <span>個收藏節目</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sa-collection-list-wrap">
          <div className="container">
            <div className="row">
              {audio_collect.length == 0 ? (
                <>
                  <div className="sa-nothingbox">
                    <div className="sa-nothingbox-title">尚未有收藏的節目</div>
                    <div
                      onClick={() => {
                        props.history.push('/explore_home_page');
                      }}
                      className="sa-nothingbox-go"
                    >
                      前往探索
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sa-collection-list-head">
                    <div className="sa-collection-list-head-play">#</div>
                    <div className="sa-collection-list-head-channelname">
                      頻道名稱
                    </div>
                    <div className="sa-collection-list-head-audioname">
                      節目名稱
                    </div>
                    <div className="sa-collection-list-head-date">新增日期</div>
                    <div className="sa-collection-list-head-setting">設定</div>
                  </div>
                  <hr className="sa-collection-list-head-hr"></hr>

                  {audio_collect.map((item, index) => (
                    <div
                      key={item.member_id}
                      className="sa-collection-list-body"
                    >
                      <div className="sa-collection-list-body-play">
                        <div className="sa-collection-list-body-play-photo">
                          {/* 播放鍵 */}
                          <img
                            className="sa-collection-list-body-play-photo-img"
                            src="/sa_img/svgicon/play_arrow.svg"
                            alt=""
                          ></img>
                        </div>
                      </div>
                      <div className="sa-collection-list-body-channelname">
                        <div className="sa-collection-list-body-channel-picture">
                          <img
                            className="sa-collection-list-body-channel-picture-img"
                            src={item.cover}
                            alt=""
                          ></img>
                        </div>
                        <div className="sa-collection-list-body-channel-name">
                          {item.singer}
                        </div>
                      </div>
                      <div className="sa-collection-list-body-audioname">
                        {/* {item.name} */}
                        <span>{truncate(item.name, 12)} </span>
                      </div>
                      <div className="sa-collection-list-body-date">
                        {item.created_at}
                      </div>
                      <div className="sa-collection-list-body-setting">
                        <div
                          className="sa-collection-list-body-setting-cancel"
                          onClick={() => {
                            delete_audio(item.audio_id);
                          }}
                        >
                          <RiDislikeFill />
                          {/* 取消收藏 */}
                        </div>
                        <div
                          onClick={() => {
                            downloadfile(item.musicSrc, item.audio_id);
                          }}
                          className="sa-collection-list-body-setting-download"
                        >
                          {downloadingid != item.audio_id ? (
                            <span>
                              <ImFolderDownload />
                            </span>
                          ) : (
                            <div
                              class="spinner-border text-primary"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                        </div>

                        {/* <a href="music/8ddac11f-ccf5-e166-2889-77173af44824.mp3" download="test.mp3">
                      下載
                    </a> */}
                      </div>
                    </div>
                  ))}
                </>
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
  connect(mapStateToProps, { initMemberAsync, logOut })(Audiocollection)
);

// <div className="sa-collection-list-body">
// <div className="sa-collection-list-body-play">
//   <div className="sa-collection-list-body-play-photo">
//     <img
//       className="sa-collection-list-body-play-photo-img"
//       src="/svgicon/play_arrow.svg"
//       alt=""
//     ></img>
//   </div>
// </div>
// <div className="sa-collection-list-body-channelname">
//   <div className="sa-collection-list-body-channel-picture">
//     <img
//       className="sa-collection-list-body-channel-picture-img"
//       src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/5042908/5042908-1587973414327-b05dc3900bb48.jpg"
//       alt=""
//     ></img>
//   </div>
//   <div className="sa-collection-list-body-channel-name">
//     test1
//   </div>
// </div>
// <div className="sa-collection-list-body-audioname">
//   節目名稱
// </div>
// <div className="sa-collection-list-body-date">新增日期</div>
// <div className="sa-collection-list-body-setting">
//   <div className="sa-collection-list-body-setting-cancel">
//     取消
//   </div>
//   <div className="sa-collection-list-body-setting-download">
//     下載
//   </div>
// </div>
// </div>
