import { INIT_PODCASTER_AUDIO_LIST } from '../jay_actions/actionTypes';

// action = { type: 'INIT_PODCASTER_DASHBOARD', payload: {...state} }

export default function podcasterAudioListState(state = [], action) {
  switch (action.type) {
    case INIT_PODCASTER_AUDIO_LIST:
      return action.payload;
    default:
      return state;
  }
}
