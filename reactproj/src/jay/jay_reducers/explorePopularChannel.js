import { INIT_EXPLORE_HOMEPAGE } from '../jay_actions/actionTypes';

// action = { type: INIT_EXPLORE_HOMEPAGE, payload: payload }

export default function explorePopularChannel(state = [], action) {
  switch (action.type) {
    case INIT_EXPLORE_HOMEPAGE:
      return action.payload;
    default:
      return state;
  }
}
