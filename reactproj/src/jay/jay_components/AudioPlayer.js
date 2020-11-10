import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { withRouter } from 'react-router-dom';

function AudioPlayer(props) {
  // 用redux改變的store不會更新元件，所以用上層傳參數
  const {
    globalAudioArry,
    setGlobalAudioArry,
    setAudioPlayerTheme,
    audioPlayerTheme,
    setPlayingAudio,
    playingAudio,
  } = props;
  const [audioLists, setAudioLists] = useState([]);
  const [autoPlayState, setAutoPlayState] = useState(false);

  // 馬上撥放
  useEffect(() => {
    setAudioLists(globalAudioArry);
    setAutoPlayState(true);
  }, [globalAudioArry]);

  return (
    <div>
      <ReactJkMusicPlayer
        mode={'full'}
        defaultVolume={0.6}
        autoPlay={autoPlayState}
        defaultPosition={{ top: '80%', left: '90%' }}
        quietUpdate
        clearPriorAudioLists
        audioLists={audioLists}
        theme={audioPlayerTheme}
        onThemeChange={(theme) => {
          setAudioPlayerTheme(theme);
        }}
        onAudioListsChange={(currentPlayId, audioLists, audioInfo) => {
          if (audioLists.length === 0) {
            setGlobalAudioArry([]);
            setPlayingAudio(null);
          } else {
            setGlobalAudioArry(audioLists);
            setPlayingAudio(audioInfo);
          }
        }}
        onAudioPlay={(audioInfo) => {
          setPlayingAudio(audioInfo);
        }}
      />
    </div>
  );
}

const mapStateToProps = (store) => {
  return { audioPlayerList: store.audioPlayerList };
};

export default withRouter(connect(mapStateToProps)(AudioPlayer));
