import { combineReducers } from 'redux';

//jay
import podcasterDashboardInfoState from './podcasterDashboardInfoState';
import podcasterAudioListState from './podcasterAudioListState';
import explorePopularChannel from './explorePopularChannel';
import exploreCateChannel from './exploreCateChannel';
import channelPageData from './channelPageData';

//jen
import articleList from './articleList'
import articleListPages from './articleListPages'
import articleListTotalRows from './articleListTotalRows'
import articleDetail from './articleDetail'
import articleDetailPre from './articleDetailPre'
import articleDetailNext from './articleDetailNext'

// 合併所有的reducers成一個大的reducer
export const rootReducer = combineReducers({
  podcasterDashboardInfoState,
  podcasterAudioListState,
  explorePopularChannel,
  exploreCateChannel,
  channelPageData,
  articleList,
  articleDetail,
  articleListPages,
  articleListTotalRows,
  articleDetailPre,
  articleDetailNext,
});