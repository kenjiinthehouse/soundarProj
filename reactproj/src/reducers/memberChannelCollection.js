import { INIT_MEMBER_CHANNEL_COLLECTION } from '../jay_actions/actionTypes';

// action = { type: INIT_EXPLORE_HOMEPAGE, payload: payload }

export default function memberChannelCollection(state = [], action) {
  switch (action.type) {
    case INIT_MEMBER_CHANNEL_COLLECTION:
      return action.payload;
    default:
      return state;
  }
}
