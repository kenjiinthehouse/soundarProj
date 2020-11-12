import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// action、props
import { initalAudioListAsync, delAudioAsync } from '../../jay_actions/index';
import { withRouter, useParams } from 'react-router-dom';

// react icon
import { FaTrash, FaEdit } from 'react-icons/fa';
import { AiFillPlayCircle, AiOutlineToTop } from 'react-icons/ai';

// components
import AudioEditModal from './../jay_components/AudioEditModal';
import ScaleLoader from 'react-spinners/ScaleLoader';
import AudioAddModal from '../jay_components/AudioAddModal';
import ScrollToTop from 'react-scroll-to-top';
import SidebarMember from '../jay_components/SidebarMember.js';

//css
import './../jay_styles/PodcasterAudioList.scss';
import { css } from '@emotion/core';

function PodcasterAudioList(props) {
  const { globalAudioArry, setGlobalAudioArry } = props;

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [useFilter, setUseFilter] = useState(false);
  const [filterText, setFilterText] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    async function fetchInitData() {
      await props.initalAudioListAsync(props.member.sid);
      console.log(props.member.podcaster_id);
      setTimeout(() => setIsLoading(false), 2000);
    }
    fetchInitData();
  }, [props.member.sid]);

  const loader_css = css`
    display: inline-block;
  `;

  const displayAudioList = (
    <>
      <ScrollToTop
        smooth
        style={{ bottom: '120px', right: '80px' }}
        component={<AiOutlineToTop style={{ fontSize: '1.8rem' }} />}
      />

      <div className="col-12">
        <div className=" d-flex justify-content-around mt-3 align-items-center">
          <div className="text-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                setAddModalShow(true);
                setModalData({
                  modalTitle: '新增單集',
                  editTargetData: {
                    podcaster_id: props.member.podcaster_id,
                  },
                });
              }}
            >
              單集上傳
            </button>
          </div>
          <div className="text-center d-flex justify-content-center align-items-stretch">
            <input
              placeholder="單集關鍵字"
              className="jay-search-input"
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value.trim());
              }}
            />
            <button
              className="btn btn-primary btn-sm jay-search-btn"
              onClick={(e) => {
                e.preventDefault();
                setUseFilter(true);
              }}
            >
              搜尋
            </button>
          </div>
        </div>
        <div className=" justify-content-center custom-table-width">
          <table className="table col-10 table-hover jay-table">
            <thead>
              <tr>
                <th>序號</th>
                <th>單集名稱</th>
                <th>上傳日期</th>
                <th>播放</th>
                <th>編輯</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              {props.channel_audio_data.map((item) => {
                if (useFilter) {
                  if (item.audio_title.indexOf(filterText) === -1) {
                    return null;
                  }
                }
                return (
                  <tr key={item.sid}>
                    <th scope="row">{item.sid}</th>
                    <td>{item.audio_title}</td>
                    <td>{item.pubDate}</td>
                    <td className="jay-icon" style={{ fontSize: '1.6rem' }}>
                      <a
                        href="javascript"
                        onClick={(event) => {
                          event.preventDefault();
                          let editTargetData = null;
                          [editTargetData] = props.channel_audio_data.filter(
                            (v) => v.sid === item.sid
                          );
                          let payload = {
                            musicSrc:
                              editTargetData.audio_file.indexOf('http') !== -1
                                ? editTargetData.audio_file
                                : `http://localhost:3000/audios/${editTargetData.audio_file}`,
                            cover: editTargetData.podcaster_img,
                            name: editTargetData.audio_title,
                            singer: editTargetData.channel_title,
                          };
                          if (
                            globalAudioArry[0] &&
                            globalAudioArry[0].name === payload.name
                          ) {
                            return null;
                          } else {
                            setGlobalAudioArry([payload, ...globalAudioArry]);
                          }
                        }}
                      >
                        <AiFillPlayCircle />
                      </a>
                    </td>
                    <td className="icon">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setEditModalShow(true);
                          let editTargetData = null;
                          editTargetData = props.channel_audio_data.filter(
                            (v) => v.sid === item.sid
                          );
                          setModalData({
                            modalTitle: '編輯單集',
                            editTargetData: { ...editTargetData[0] },
                          });
                        }}
                        href="javascript"
                      >
                        <FaEdit />
                      </a>
                    </td>
                    <td className="icon">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setEditModalShow(true);
                          let editTargetData = null;
                          editTargetData = props.channel_audio_data.filter(
                            (v) => v.sid === item.sid
                          );
                          setModalData({
                            modalTitle: '刪除單集',
                            editTargetData: { ...editTargetData[0] },
                          });
                        }}
                        href="javascript"
                      >
                        <FaTrash />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AudioEditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        modalData={modalData}
        setModalData={setModalData}
        setIsLoading={setIsLoading}
      />

      <AudioAddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        modalData={modalData}
        setModalData={setModalData}
        setIsLoading={setIsLoading}
      />
    </>
  );
  const displaySpinner = (
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
  );

  return isLoading ? displaySpinner : displayAudioList;
}

const mapStateToProps = (store) => {
  return {
    channel_audio_data: store.podcasterAudioListState,
    member: store.member,
  };
};

// 綁定部份action creators
// 注意：第二個傳入參數` { addValue, minusValue, addValueAsync }`是個物件值
export default withRouter(
  connect(mapStateToProps, { initalAudioListAsync, delAudioAsync })(
    PodcasterAudioList
  )
);
