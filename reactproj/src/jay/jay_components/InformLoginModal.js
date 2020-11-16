import React from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';
import { withRouter } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function InformLoginModal(props) {
  const { setShowInformLoginModal } = props;
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body
          style={{ height: 'auto', padding: '0px'}}
          className=" text-center"
        >
        <div style={{backgroundColor:'#2690DF',color:'#fff',margin: '0px',padding:'10px 0'}}>
          <h4 class="alert-heading pt-2">請先登入</h4>
        </div>
          <div
            class="alert alert-light"
            role="alert"
            style={{ margin: '0px'}}
          >
            <h5
              class="alert-heading"
              onClick={() => {
                props.history.push(`/login`);
                setShowInformLoginModal(false);
              }}
              style={{ cursor: 'pointer',margin: '0px',padding:'10px 0' }}
            >
              點我前往登入頁面
            </h5>
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
