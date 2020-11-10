import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';

// action、props
import { addAudioAsync, initalAudioListAsync } from '../../jay_actions/index';
import { withRouter } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function AudioAddModal(props) {
  const { setIsLoading, modalData } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);

    await props.addAudioAsync(formData);
    await props.initalAudioListAsync(modalData.editTargetData.podcaster_id);

    props.onHide();
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
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
          <form className="container" name="audioForm" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={
                modalData.editTargetData
                  ? modalData.editTargetData.podcaster_id
                  : ''
              }
              style={{ display: 'none' }}
              name="podcaster_id"
              readOnly={true}
            />
            <div className="form-group">
              <h6>單集名稱：</h6>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="audio_title"
              />
            </div>
            <div className="form-group">
              <h6>簡介</h6>
              <textarea
                className="form-control"
                rows="2"
                name="audio_content_snippet"
              />
            </div>
            <div className="form-group">
              <h6>內容介紹</h6>
              <textarea
                className="form-control"
                rows="5"
                name="audio_content"
              />
            </div>
            <div className="form-group">
              <h6>選擇音檔</h6>
              <input
                type="file"
                className="form-control-file"
                name="audio_file"
                required={true}
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
}

const mapStateToProps = (store) => {
  return { channel_audio_data: store.podcasterAudioListState };
};

export default withRouter(
  connect(mapStateToProps, { addAudioAsync, initalAudioListAsync })(
    AudioAddModal
  )
);
