import './../jay_styles/PodcasterDashboardHome.scss';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  initalDashboardAsync,
  editChannelAsync,
  createChannelAsync,
} from '../../jay_actions/index';
import { withRouter, useParams } from 'react-router-dom';
import ChannelEdditImgModal from '../jay_components/ChannelEdditImgModal.js';

function PodcasterDashboardHome(props) {
  const { channel_data } = props;
  const [editTargrt, setEditTargrt] = useState('');
  const [editInputData, setEditInputData] = useState({});
  const [editImgModalShow, setEditImgModalShow] = useState(false);

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
        return '無';
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('podcaster_id', editInputData.podcaster_id);
    formData.append('channel_title', editInputData.channel_title);
    formData.append('channel_summary', editInputData.channel_summary);
    formData.append(
      'podcaster_description',
      editInputData.podcaster_description
    );
    formData.append('channel_catagory', editInputData.channel_catagory);
    formData.append('channel_rss_link', editInputData.channel_rss_link);
    formData.append('owner_email', editInputData.owner_email);
    formData.append('podcaster_img', editInputData.podcaster_img);
    await props.editChannelAsync(formData);
    await props.initalDashboardAsync(props.member.sid);
  };

  useEffect(() => {
    props.initalDashboardAsync(props.member.sid);
  }, [props.member]);
  useEffect(() => {
    setEditInputData(...channel_data);
  }, [channel_data]);

  return (
    <>
      {channel_data.map((item, index) => {
        if (channel_data && channel_data[0]) {
          return (
            <div key={index}>
              <div className="row justify-content-center">
                <div className="jay-podcastImgArea my-3">
                  {channel_data.podcaster_img ? (
                    <img
                      src={
                        item.podcaster_img.indexOf('http') !== -1
                          ? item.podcaster_img
                          : `http://localhost:3000/images/podcaster_imgs/${item.podcaster_img}`
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      src={`http://localhost:3000/ppicture/profile_picture.png`}
                      alt=""
                    />
                  )}
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setEditImgModalShow(true);
                    }}
                  >
                    更換封面
                  </button>
                </div>
              </div>
              <hr className="jay-dashboard-hr" />
              <div className="row justify-content-center custom-table-width">
                <table className="table col-10 jay-table">
                  <tbody>
                    <tr>
                      <th scope="row">頻道編號</th>
                      <td>{item.podcaster_id}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">頻道名稱</th>
                      {editTargrt === 'edit_channel_title' ? (
                        <>
                          <td>
                            <input
                              className="form-control"
                              value={
                                editInputData.channel_title
                                  ? editInputData.channel_title
                                  : ''
                              }
                              onChange={(event) => {
                                let copyData = { ...editInputData };
                                copyData.channel_title = event.target.value;
                                setEditInputData(copyData);
                              }}
                            />
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.channel_title = item.channel_title;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.channel_title}</td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_channel_title');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">簡介</th>
                      {editTargrt === 'edit_channel_summary' ? (
                        <>
                          <td>
                            <textarea
                              className="form-control"
                              value={
                                editInputData.channel_summary
                                  ? editInputData.channel_summary
                                  : ''
                              }
                              onChange={(event) => {
                                let copyData = { ...editInputData };
                                copyData.channel_summary = event.target.value;
                                setEditInputData(copyData);
                              }}
                            />
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.channel_summary = item.channel_summary;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.channel_summary}</td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_channel_summary');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">詳細內容</th>
                      {editTargrt === 'edit_podcaster_description' ? (
                        <>
                          <td>
                            <textarea
                              className="form-control"
                              value={
                                editInputData.podcaster_description
                                  ? editInputData.podcaster_description
                                  : ''
                              }
                              onChange={(event) => {
                                let copyData = { ...editInputData };
                                copyData.podcaster_description =
                                  event.target.value;
                                setEditInputData(copyData);
                              }}
                            />
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.podcaster_description =
                                  item.podcaster_description;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.podcaster_description}</td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_podcaster_description');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">頻道類別</th>
                      {editTargrt === 'edit_channel_catagory' ? (
                        <>
                          <td className=" d-flex justify-content-around h-100">
                            <div className="form-check">
                              <input
                                className="form-check-input mr-3"
                                type="radio"
                                name="channel_catagory"
                                id="News"
                                value="News"
                                checked={
                                  editInputData.channel_catagory === 'News'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label mr-3"
                                htmlFor="News"
                              >
                                新聞
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Technology"
                                id="Technology"
                                checked={
                                  editInputData.channel_catagory ===
                                  'Technology'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Technology"
                              >
                                科技
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Sports"
                                id="Sports"
                                checked={
                                  editInputData.channel_catagory === 'Sports'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Sports"
                              >
                                運動
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Entertainment"
                                id="Entertainment"
                                checked={
                                  editInputData.channel_catagory ===
                                  'Entertainment'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Entertainment"
                              >
                                娛樂
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Society"
                                id="Society"
                                checked={
                                  editInputData.channel_catagory === 'Society'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Society"
                              >
                                故事
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Business"
                                id="Business"
                                checked={
                                  editInputData.channel_catagory === 'Business'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Business"
                              >
                                商業
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Education"
                                id="Education"
                                checked={
                                  editInputData.channel_catagory === 'Education'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Education"
                              >
                                教育
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="channel_catagory"
                                value="Health"
                                id="Health"
                                checked={
                                  editInputData.channel_catagory === 'Health'
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  let copyData = { ...editInputData };
                                  copyData.channel_catagory =
                                    event.target.value;
                                  setEditInputData(copyData);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Health"
                              >
                                健康
                              </label>
                            </div>
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.channel_catagory =
                                  item.channel_catagory;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            {transTermToChinese(
                              item.channel_catagory ? item.channel_catagory : ''
                            )}
                          </td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_channel_catagory');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">RSS連結</th>
                      {editTargrt === 'edit_channel_rss_link' ? (
                        <>
                          <td>
                            <textarea
                              className="form-control"
                              value={
                                editInputData.channel_rss_link
                                  ? editInputData.channel_rss_link
                                  : ''
                              }
                              onChange={(event) => {
                                let copyData = { ...editInputData };
                                copyData.channel_rss_link = event.target.value;
                                setEditInputData(copyData);
                              }}
                            />
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.channel_rss_link =
                                  item.channel_rss_link;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.channel_rss_link}</td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_channel_rss_link');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">聯絡信箱</th>
                      {editTargrt === 'edit_owner_email' ? (
                        <>
                          <td>
                            <textarea
                              className="form-control"
                              value={
                                editInputData.owner_email
                                  ? editInputData.owner_email
                                  : ''
                              }
                              onChange={(event) => {
                                let copyData = { ...editInputData };
                                copyData.owner_email = event.target.value;
                                setEditInputData(copyData);
                              }}
                            />
                          </td>
                          <td>
                            <a
                              className=" text-info"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                handleSubmit();
                              }}
                            >
                              確認
                            </a>
                            <br />
                            <br />
                            <a
                              className=" text-danger"
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('');
                                let copyData = { ...editInputData };
                                copyData.owner_email = item.owner_email;
                                setEditInputData(copyData);
                              }}
                            >
                              取消
                            </a>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.owner_email}</td>
                          <td>
                            <a
                              href="javascript"
                              onClick={(event) => {
                                event.preventDefault();
                                setEditTargrt('edit_owner_email');
                              }}
                            >
                              編輯
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        } else {
          return (
            <div className=" text-center d-flex flex-column align-items-center">
              <h3>尚未創建頻道</h3>
              <button
                type="button"
                className="btn btn-info my-5 d-block w-25"
                onClick={async () => {
                  await props.createChannelAsync(props.member.sid);
                  await props.initalDashboardAsync(props.member.sid);
                }}
              >
                申請開通
              </button>
            </div>
          );
        }
      })}
      <ChannelEdditImgModal
        show={editImgModalShow}
        onHide={() => setEditImgModalShow(false)}
        editInputData={editInputData}
        setEditInputData={setEditInputData}
      />
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    channel_data: store.podcasterDashboardInfoState,
    member: store.member,
  };
};

// 綁定部份action creators
// 注意：第二個傳入參數` { addValue, minusValue, addValueAsync }`是個物件值
export default withRouter(
  connect(mapStateToProps, {
    initalDashboardAsync,
    editChannelAsync,
    createChannelAsync,
  })(PodcasterDashboardHome)
);
