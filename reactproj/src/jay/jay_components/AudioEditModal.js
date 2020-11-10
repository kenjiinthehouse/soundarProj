import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';

// action、props
import {
  initalAudioListAsync,
  editAudioAsync,
  delAudioAsync,
} from '../jay_actions/index';
import { withRouter } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function AudioEditModal(props) {
  const { setIsLoading, modalData, setModalData } = props;

  const [initFormText, setInitFormText] = useState(null);

  useEffect(() => {
    setInitFormText(modalData.editTargetData);
  }, [modalData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    await props.editAudioAsync(formData);
    await props.initalAudioListAsync(modalData.editTargetData.podcaster_id);
    props.onHide();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleOnChange = (event) => {
    let copyInitFormText = { ...initFormText };
    copyInitFormText[event.target.name] = event.target.value;
    setInitFormText(copyInitFormText);
    console.log(initFormText);
  };

  const handelDelete = async (event) => {
    await props.delAudioAsync(initFormText.sid);
    props.onHide();
  };

  const displayDelModel = (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="alert alert-danger" role="alert">
          {`警告： ` + props.modalData.modalTitle}
        </div>
        <Modal.Body>
          <h6>
            你確定要刪除序號第{' '}
            <span className="text-danger">
              {' '}
              {initFormText ? initFormText.sid : ''}{' '}
            </span>{' '}
            的檔案？
          </h6>
          <h6>
            單集名稱：{' '}
            <span className="text-danger">
              {' '}
              {initFormText ? initFormText.audio_title : ''}{' '}
            </span>{' '}
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handelDelete}>
            確認刪除
          </button>
          <button onClick={props.onHide} className="btn-secondary btn">
            取消
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );

  const displayEditModel = (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalData.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="container"
            name="audioForm"
            onSubmit={handleSubmit}
            method="post"
            enctype="multipart/form-data"
          >
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={initFormText ? initFormText.sid : ''}
              readOnly={true}
              style={{ display: 'none' }}
              name="sid"
            />
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={initFormText ? initFormText.podcaster_id : ''}
              readOnly={true}
              style={{ display: 'none' }}
              name="podcaster_id"
            />
            <div className="form-group">
              <h6>單集名稱：</h6>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="audio_title"
                value={initFormText ? initFormText.audio_title : ''}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <h6>簡介</h6>
              <textarea
                className="form-control"
                rows="2"
                name="audio_content_snippet"
                value={initFormText ? initFormText.audio_content_snippet : ''}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <h6>內容介紹</h6>
              <textarea
                className="form-control"
                rows="5"
                name="audio_content"
                value={initFormText ? initFormText.audio_content : ''}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <h6>選擇音檔</h6>
              <input
                type="file"
                className="form-control-file"
                name="audio_file"
              />
            </div>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">
                確認送出
              </button>
              <button onClick={props.onHide} className="btn-secondary btn">
                取消
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );

  return props.modalData.modalTitle == '編輯單集'
    ? displayEditModel
    : displayDelModel;
}

const mapStateToProps = (store) => {
  return { channel_audio_data: store.podcasterAudioListState };
};

export default withRouter(
  connect(mapStateToProps, {
    initalAudioListAsync,
    editAudioAsync,
    delAudioAsync,
  })(AudioEditModal)
);
