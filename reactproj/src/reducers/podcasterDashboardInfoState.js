import { INIT_PODCASTER_DASHBOARD } from '../jay_actions/actionTypes';

// action = { type: 'INIT_PODCASTER_DASHBOARD', payload: {...state} }

export default function podcasterDashboardInfoState(state = [], action) {
  switch (action.type) {
    case INIT_PODCASTER_DASHBOARD:
      return [action.payload];
    default:
      return state;
  }
}
