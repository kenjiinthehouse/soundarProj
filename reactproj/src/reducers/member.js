import { INIT_MEMBER, LOG_OUT } from '../actions/actionTypes'

export default function member(state = {}, action) {
  switch (action.type) {
    case LOG_OUT:
      return {}
    case INIT_MEMBER:
      return action.obj
    default:
      return state
  }
}
