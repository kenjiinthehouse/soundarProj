import { GET_ARTICLE_MSG, GET_ARTICLE_REPLY } from './../actions/actionTypes';

export default function articleMsgBoard(state = [], action) {
  switch (action.type) {
    case GET_ARTICLE_MSG:
      return action.payload;
    default:
      return state;
  }
}
