import { INIT_CHANNEL_PAGE_DATA } from '../jay_actions/actionTypes';

// action = { type: INIT_EXPLORE_HOMEPAGE, payload: payload }

export default function channelPageData(state = [], action) {
  switch (action.type) {
    case INIT_CHANNEL_PAGE_DATA:
      return action.payload;
    default:
      return state;
  }
}
