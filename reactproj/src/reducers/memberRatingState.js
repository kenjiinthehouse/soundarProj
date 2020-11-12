import { INIT_RATE_MODAL } from '../jay_actions/actionTypes';

// action = { type: INIT_EXPLORE_HOMEPAGE, payload: payload }

export default function memberRatingState(state = [], action) {
  switch (action.type) {
    case INIT_RATE_MODAL:
      return action.payload;
    default:
      return state;
  }
}
