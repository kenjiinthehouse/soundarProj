import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';

// action、props
import {
  editChannelAsync,
  initalDashboardAsync,
} from '../../jay_actions/index';
import { withRouter, useParams } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';

function ChannelEdditImgModal(props) {
  const { editInputData, setIsLoading } = props;
  const [fileSrc, setFileSrc] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      setImgFile(event.target.files[0]);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileSrc(reader.result);
      };
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
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
    formData.append(
      'podcaster_img',
      imgFile === null ? editInputData.podcaster_img : imgFile
    );
    await props.editChannelAsync(formData);
    await props.initalDashboardAsync(props.member.sid);
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
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
            <h5>更換頻道封面</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container">
            <div className="form-group">
              <h6>選擇圖片</h6>
              <input
                type="file"
                className="form-control-file"
                name="podcaster_img"
                required={true}
                onChange={(event) => {
                  if (event.target.files[0].name) {
                    handleFileChange(event);
                  }
                }}
              />
              {fileSrc ? (
                <img
                  className=" mt-3"
                  src={fileSrc}
                  alt=""
                  style={{ width: '8rem', height: '8rem', objectFit: 'cover' }}
                />
              ) : null}
            </div>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit();
                  props.onHide();
                }}
              >
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
  connect(mapStateToProps, { editChannelAsync, initalDashboardAsync })(
    ChannelEdditImgModal
  )
);
