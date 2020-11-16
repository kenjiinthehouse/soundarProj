import { GET_ARTICLE_REPLY } from './../actions/actionTypes';

export default function articleMsgReply(state = [], action) {
  switch (action.type) {
    case GET_ARTICLE_REPLY:
      return action.payload;
    default:
      return state;
  }
}
