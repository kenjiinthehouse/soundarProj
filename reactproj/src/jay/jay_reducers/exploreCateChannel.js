import { INIT_EXPLORE_CATEPAGE } from '../jay_actions/actionTypes';

// action = { type: INIT_EXPLORE_HOMEPAGE, payload: payload }

export default function exploreCateChannel(state = [], action) {
  switch (action.type) {
    case INIT_EXPLORE_CATEPAGE:
      return action.payload;
    default:
      return state;
  }
}
