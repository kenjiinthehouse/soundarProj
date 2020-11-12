import React from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';
import { withRouter } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function InformLoginModal(props) {
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">請先登入！</h4>
            <hr />
            <p
              class="my-3"
              onClick={() => {
                props.history.push(`/memberedit`);
              }}
            >
              前往登入頁面
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (store) => {
  return { channel_audio_data: store.podcasterAudioListState };
};

export default withRouter(connect(mapStateToProps)(InformLoginModal));
