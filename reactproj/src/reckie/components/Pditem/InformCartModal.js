import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'react-jinke-music-player/assets/index.css';
import { withRouter } from 'react-router-dom';

//css mod
import { fadeInDown, fadeOutUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import { MdCheckCircle } from "react-icons/md";

function InformCartModal(props) {
  const { setShowActionModal, actionModalText } = props;
  const [startAni, setStartAni] = useState(true);
  const styles = {
    fadeInDown01: {
      animation: '0.3s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
    },
    fadeOutDown01: {
      animation: '0.3s',
      animationName: Radium.keyframes(fadeOutUp, 'fadeOutUp'),
      animationFillMode: 'forwards',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setStartAni(false);
      document
        .querySelector('.informCartModal')
        .addEventListener('animationend', () => {
          setShowActionModal(false);
        });
    }, 1000);
  }, []);

  return (
    <StyleRoot>
      <div
        className="alert alert-secondary informCartModal"
        role="alert"
        style={startAni ? styles.fadeInDown01 : styles.fadeOutDown01}
      >
         <MdCheckCircle style={{margin:'4px 4px 8px 0px' }} /> {actionModalText}
      </div>
    </StyleRoot>
  );
}

const mapStateToProps = (store) => {
  return { channel_audio_data: store.podcasterAudioListState };
};

export default withRouter(connect(mapStateToProps)(InformCartModal));
