import { combineReducers } from 'redux';

import podcasterDashboardInfoState from './podcasterDashboardInfoState';
import podcasterAudioListState from './podcasterAudioListState';
import explorePopularChannel from './explorePopularChannel';
import exploreCateChannel from './exploreCateChannel';
import channelPageData from './channelPageData';

// 合併所有的reducers成一個大的reducer
export const jay_rootReducer = combineReducers({
  podcasterDashboardInfoState,
  podcasterAudioListState,
  explorePopularChannel,
  exploreCateChannel,
  channelPageData,
});
