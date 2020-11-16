import { combineReducers } from 'redux';

//jay
import podcasterDashboardInfoState from './podcasterDashboardInfoState';
import podcasterAudioListState from './podcasterAudioListState';
import explorePopularChannel from './explorePopularChannel';
import exploreCateChannel from './exploreCateChannel';
import channelPageData from './channelPageData';
import memberRatingState from './memberRatingState';
import memberAudioCollection from './memberAudioCollection';
import memberChannelCollection from './memberChannelCollection';

//jen
import articleList from './articleList';
import articleListPages from './articleListPages';
import articleListTotalRows from './articleListTotalRows';
import articleDetail from './articleDetail';
// import articleDetailPre from './articleDetailPre';
// import articleDetailNext from './articleDetailNext';
import articleMsgBoard from './articleMsgBoard';
import articleMsgReply from './articleMsgReply'; 

//samps
import member from './member';

//kenji
import msgBoardReducer from './msgBoardReducer';
import replyReducer from './replyReducer';

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
  // articleDetailPre,
  // articleDetailNext,
  articleMsgBoard,
  articleMsgReply,
  member,
  memberRatingState,
  memberAudioCollection,
  msgBoardReducer,
  replyReducer,
  memberChannelCollection,
});
