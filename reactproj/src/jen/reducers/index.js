import { combineReducers } from 'redux'
import articleList from './articleList'
import articleListPages from './articleListPages'
import articleListTotalRows from './articleListTotalRows'
import articleDetail from './articleDetail'
import articleDetailPre from './articleDetailPre'
import articleDetailNext from './articleDetailNext'


export const jen_rootReducer = combineReducers({
  articleList,
  articleDetail,
  articleListPages,
  articleListTotalRows,
  articleDetailPre,
  articleDetailNext,
})