import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';

// action、props
import { initalAudioListAsync } from '../../jay_actions/index';
import { withRouter } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function AudioAddModal(props) {
  //preloading file
  const [preloading, setPreloading] = useState(false);

  //formdata
  const [audioTitle, setAudioTitle] = useState('');
  const [audioContentSnippet, setAudioContentSnippet] = useState('');
  const [audioContent, setAudioContent] = useState('');
  const [audioFile, setAudioFile] = useState('');

  async function addAudioAsync(formData) {
    console.log('addAudioAsync');
    const url = `http://localhost:5566/podcaster_dashboard/channel_audio/add/api`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    await props.initalAudioListAsync(props.member.sid);
  }

  const handleFileChange = (event) => {
    setPreloading(true);
    if (event.target.files[0]) {
      setAudioFile(event.target.files[0]);
    }
    setTimeout(() => {
      setPreloading(false);
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('podcaster_id', props.member.sid);
    formData.append('audio_title', audioTitle);
    formData.append('audio_content_snippet', audioContentSnippet);
    formData.append('audio_content', audioContent);
    formData.append('audio_file', audioFile);

    addAudioAsync(formData);
    setAudioTitle('');
    setAudioContentSnippet('');
    setAudioContent('');
    props.onHide();
    props.setIsLoading(true);
    setTimeout(() => props.setIsLoading(false), 1000);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">上傳音檔</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container" name="audioForm">
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={props.member.sid ? props.member.sid : ''}
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
                value={audioTitle}
                onChange={(event) => {
                  setAudioTitle(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <h6>簡介</h6>
              <textarea
                className="form-control"
                rows="2"
                name="audio_content_snippet"
                value={audioContentSnippet}
                onChange={(event) => {
                  setAudioContentSnippet(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <h6>內容介紹</h6>
              <textarea
                className="form-control"
                rows="5"
                name="audio_content"
                value={audioContent}
                onChange={(event) => {
                  setAudioContent(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <h6>選擇音檔</h6>
              <input
                type="file"
                className="form-control-file"
                name="audio_file"
                required={true}
                onChange={(event) => {
                  if (event.target.files[0].name) {
                    handleFileChange(event);
                  }
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {preloading ? (
            <div className=" d-flex justify-content-center align-items-center">
              <h6 className=" mr-3">檔案讀取中，請稍後</h6>
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                確認送出
              </button>
              <button onClick={props.onHide} className="btn-secondary btn">
                取消
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    member: store.member,
  };
};

export default withRouter(
  connect(mapStateToProps, { initalAudioListAsync })(AudioAddModal)
);
