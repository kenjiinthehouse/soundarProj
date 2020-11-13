import {GET_REPLY} from '../actions/msgBoardActionTypes';




export default function replyReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_REPLY:
      return action.payload;
    default:
      return state;
  }
}

