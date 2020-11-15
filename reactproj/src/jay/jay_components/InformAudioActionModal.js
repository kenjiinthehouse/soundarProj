import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';
import { withRouter } from 'react-router-dom';

//css mod
import { fadeInDown, fadeOutDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

function InformAudioActionModal(props) {
  const { setShowActionModal, actionModalText } = props;
  const [startAni, setStartAni] = useState(true);
  const styles = {
    fadeInDown01: {
      animation: '0.3s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
    },
    fadeOutDown01: {
      animation: '0.3s',
      animationName: Radium.keyframes(fadeOutDown, 'fadeOutDown'),
      animationFillMode: 'forwards',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setStartAni(false);
      document
        .querySelector('.informAudioActionModal')
        .addEventListener('animationend', () => {
          setShowActionModal(false);
        });
    }, 1000);
  }, []);

  return (
    <StyleRoot>
      <div
        className="alert alert-success informAudioActionModal"
        role="alert"
        style={startAni ? styles.fadeInDown01 : styles.fadeOutDown01}
      >
        {actionModalText}
      </div>
    </StyleRoot>
  );
}

const mapStateToProps = (store) => {
  return { channel_audio_data: store.podcasterAudioListState };
};

export default withRouter(connect(mapStateToProps)(InformAudioActionModal));
