import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';

// action、props
import {
  submitRateScore,
  initalRateModalAsync,
  updateRateScore,
  calculateScore,
} from '../../jay_actions/index';
import { withRouter, useParams } from 'react-router-dom';

// bootstrap
import { Modal } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

function ChannelRatingModal(props) {
  const { podcaster_id } = useParams();
  const { setIsLoading, show } = props;
  const [rateValue, setRateValue] = useState(0);

  useEffect(() => {
    async function initialGetData() {
      await props.initalRateModalAsync(props.member.sid, podcaster_id);
    }
    initialGetData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.member && props.member.sid) {
      const formData = new FormData();
      formData.append('podcaster_id', podcaster_id);
      formData.append('reviewer_id', props.member.sid);
      formData.append('score', rateValue);
      if (props.rating_state[0] && props.rating_state[0].score) {
        await props.updateRateScore(formData);
        await props.initalRateModalAsync(props.member.sid, podcaster_id);
        await props.calculateScore();
      } else {
        await props.submitRateScore(formData);
        await props.initalRateModalAsync(props.member.sid, podcaster_id);
        await props.calculateScore();
      }
      props.onHide();
    } else {
      props.onHide();
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            對&nbsp;
            {props.channel_data.map((item) => {
              return item.channel_title;
            })}
            &nbsp;&nbsp;的評分
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '5rem' }}>
          <div className=" text-center">
            {props.member && props.member.sid ? (
              <Rate
                style={{ fontSize: '1.5rem', filter: 'brightness(0.95)' }}
                defaultValue={props.rating_state[0].score}
                onChange={(value) => {
                  setRateValue(value);
                }}
              />
            ) : (
              <h5>請先登入會員！</h5>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {props.member && props.member.sid ? (
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
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    channel_audio_data: store.channelPageData,
    channel_data: store.podcasterDashboardInfoState,
    member: store.member,
    rating_state: store.memberRatingState,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    submitRateScore,
    initalRateModalAsync,
    updateRateScore,
    calculateScore,
  })(ChannelRatingModal)
);
