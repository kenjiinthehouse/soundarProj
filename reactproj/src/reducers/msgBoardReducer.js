import {GET_MSG, GET_REPLY} from '../actions/msgBoardActionTypes';




export default function msgBoardReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_MSG:
      return action.payload;
    default:
      return state;
  }
}

// const initialState = {
//   cmt: [],
// };


// export default function msgBoardReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_MSG:
//       return {
//         ...state,
//         cmt: action.obj.rows,
//       };
//     default:
//       return state;
//   }
// }
