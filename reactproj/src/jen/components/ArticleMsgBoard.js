import React, { useState, useEffect } from 'react';
import { Button, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import '../styles/articleMsgBoard.scss';
//引入icon
import {
  MdAddCircle,
  MdWhatshot,
  MdSort,
  MdThumbUp,
  MdThumbDown,
  MdReport,
  MdExpandLess,
  MdExpandMore,
} from 'react-icons/md';
import { BsArrowReturnRight } from 'react-icons/bs';
//引入留言 子留言
import {
  getArticleMsg,
  getArticleMsgAsync,
  getArticleReply,
  getArticleReplyAsync,
} from '../../actions/index';
//引入輸入留言組件
import ArticleMsgInput from './ArticleMsgInput';
import ArticleMsgReplyInput from './ArticleMsgReplyInput';
import ArticlePaginationRounded from './ArticlePaginationRounded';

function ArticleMsgBoard(props) {
  const { msg, reply, sid } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageIndexTo, setPageIndexTo] = useState(10);
  const [msgSort, setMsgSort] = useState(true);
  useEffect(() => {
    async function msgList() {
      // 取的該專欄(sid)對應留言
      await props.getArticleMsgAsync(sid, msgSort);
    }
    msgList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function msgList() {
      // 取的該專欄(sid)對應留言
      await props.getArticleMsgAsync(sid, msgSort);
    }
    msgList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sid, msgSort]);

  const styleNone = {
    display: 'none',
  };

  const displayLoading = <></>;

  const displayBoard = (
    <>
      {/* <h1>{console.log(Array.isArray(msg))}</h1> */}
      {/* {msg.map((item) => {
        return <h1>{item.sid}</h1>;
      })} */}

      <div className="article-cmtArea mx-auto mt-5">
        <div className="article-cmtModule">
          <div className="article-cmtModuleHead d-flex align-items-center">
            <h5 className="cmtTitle pr-2">留言</h5>
            <span className="cmtCount">{msg.length}</span>
          </div>

          <ArticleMsgInput
            sid={props.sid}
            msgSort={msgSort}
            setMsgSort={setMsgSort}
          />

          <div className="article-cmtSortOption d-flex align-items-center">
            <ul className="article-cmtSortOptionList">
              <li className={msgSort ? 'pr-3 active' : 'pr-3'}>
                <span className="align-bottom pr-1">
                  <IconContext.Provider value={{ className: 'hotBtn' }}>
                    <MdWhatshot />
                  </IconContext.Provider>
                </span>
                <span className="align-bottom" onClick={() => setMsgSort(true)}>
                  依人氣排序
                </span>
              </li>
              <li className={msgSort ? '' : 'active'}>
                <span className="align-bottom pr-1">
                  <IconContext.Provider value={{ className: 'sortBtn' }}>
                    <MdSort />
                  </IconContext.Provider>
                </span>
                <span
                  className="align-bottom"
                  onClick={() => setMsgSort(false)}
                >
                  依發表新舊
                </span>
              </li>
            </ul>
          </div>
          {msg.length ? (
            <div className="article-cmtContainer">
              <Accordion>
                <ul className="cmtList">
                  {msg.map((item, index) => {
                    return (
                      <li key={item.sid}>
                        <div className="article-cmtBox">
                          <div className="article-cmtBoxArea">
                            <div className="article-cmtInfo d-flex align-items-center">
                              <div className="article-userHeadIcon mr-2">
                                <img
                                  src={
                                    item.profile_picture
                                      ? 'http://localhost:3000/ppicture/' +
                                        `${item.profile_picture}`
                                      : ''
                                  }
                                />
                              </div>
                              <div className="cmtSid" style={styleNone}>
                                {item.sid}
                              </div>
                              <div className="cmtNickname mr-auto">
                                {item.nickname}
                              </div>
                              <div className="cmtInfoDate">
                                {item.postTime2}
                              </div>
                            </div>
                            <div className="cmtTextWrap">
                              <span className="article-cmtBoxContent">
                                {item.content}
                              </span>
                            </div>

                            <div className="article-cmtTools d-flex align-items-center">
                              <div className="cmtToolsBtn mr-auto">
                                <div>
                                  <Accordion.Toggle
                                    as="span"
                                    variant="replyAccording"
                                    onClick={() => {
                                      async function sendSid() {
                                        await props.getArticleReplyAsync(
                                          item.sid
                                        );
                                      }
                                      sendSid();
                                      // console.log('item',item.sid);
                                    }}
                                    eventKey={item.sid}
                                  >
                                    <span className="pointAccording pr-1">
                                      回應
                                    </span>
                                  </Accordion.Toggle>
                                  <span
                                    className="cmtReplyCount"
                                    style={styleNone}
                                  >
                                    ({reply.length})
                                  </span>
                                  <span className="">
                                    <IconContext.Provider
                                      value={{ className: '.replyBtn' }}
                                    >
                                      <MdExpandMore />
                                    </IconContext.Provider>
                                  </span>
                                </div>
                              </div>

                              <div className="cmtToolsBtn pr-2">
                                <a href="" className="pr-2">
                                <span className="material-icons pr-1">
                                  <IconContext.Provider
                                    value={{ className: 'cmtToolsBtn' }}
                                  >
                                    <MdThumbUp />
                                  </IconContext.Provider>
                                </span>
                                <span>{item.upPoint}</span>
                                </a>
                                <a href="">
                                  <span className="material-icons pr-1">
                                    <IconContext.Provider
                                      value={{ className: 'cmtToolsBtn' }}
                                    >
                                      <MdThumbDown />
                                    </IconContext.Provider>
                                  </span>
                                  <span>{item.downPoint}</span>
                                </a>
                                <span className="cmtAccuseLink pl-2">
                                  <IconContext.Provider
                                    value={{ className: 'cmtToolsBtn' }}
                                  >
                                    <MdReport />
                                  </IconContext.Provider>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* 展開回應 */}
                          <Accordion.Collapse eventKey={item.sid}>
                            <div className="article-cmtReply">
                              <ul className="cmtList">
                                {reply.map((item) => {
                                  if (item.empty)
                                    return (
                                      <li className="replyList">
                                        <div className="d-flex no-gutters emptyReplyBox">
                                          <div className="emptyReplyWrap mx-auto">
                                            <span className="article-cmtBoxContent">
                                              目前沒有留言
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  else
                                    return (
                                      <li key={item.sid} className="replyList">
                                        <div className="d-flex no-gutters">
                                          <div className="article-cmtReplyIco d-flex justify-content-center col-1">
                                            <IconContext.Provider
                                              value={{
                                                className: 'replyArrow',
                                              }}
                                            >
                                              <BsArrowReturnRight />
                                            </IconContext.Provider>
                                          </div>
                                          <div className="article-cmtBoxReplyArea col-11">
                                            <div className="article-cmtInfo d-flex align-items-center">
                                              <div className="article-userHeadIcon mr-2"></div>
                                              <div className="replycmtSid"></div>
                                              <div className="article-cmtNickname mr-auto">
                                                {item.nickname}
                                              </div>
                                              <div className="article-cmtInfoDate">
                                                {item.postTime2}
                                              </div>
                                            </div>
                                            <div className="cmtTextWrap">
                                              <span className="article-cmtBoxContent">
                                                {item.content}
                                              </span>
                                            </div>
                                            <div className="article-cmtTools d-flex align-items-center">
                                              <div className="cmtToolsBtn ml-auto pr-2">
                                                <a href="" className="pr-2">
                                                  <span className="material-icons pr-1">
                                                    <IconContext.Provider
                                                      value={{
                                                        className:
                                                          'cmtToolsBtn',
                                                      }}
                                                    >
                                                      <MdThumbUp />
                                                    </IconContext.Provider>
                                                  </span>
                                                  <span>{item.upPoint}</span>
                                                </a>
                                                <a href="">
                                                  <span className="material-icons pr-1">
                                                    <IconContext.Provider
                                                      value={{
                                                        className:
                                                          'cmtToolsBtn',
                                                      }}
                                                    >
                                                      <MdThumbDown />
                                                    </IconContext.Provider>
                                                  </span>
                                                  <span>{item.downPoint}</span>
                                                </a>
                                                <span className="cmtAccuseLink pl-2">
                                                  <IconContext.Provider
                                                    value={{
                                                      className: 'cmtToolsBtn',
                                                    }}
                                                  >
                                                    <MdReport />
                                                  </IconContext.Provider>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                })}
                                <ArticleMsgReplyInput
                                  sid={props.sid}
                                  parentId={item.sid}
                                />
                              </ul>
                            </div>
                          </Accordion.Collapse>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>
              {/* <PaginationRounded /> */}
            </div>
          ) : (
            <div>目前尚無留言</div>
          )}
        </div>
      </div>
    </>
  );

  return isLoading ? displayLoading : displayBoard;
}

const mapStateToProps = (store) => {
  return {
    msg: store.articleMsgBoard,
    reply: store.articleMsgReply,
  };
};
export default connect(mapStateToProps, {
  getArticleMsg,
  getArticleMsgAsync,
  getArticleReply,
  getArticleReplyAsync,
})(ArticleMsgBoard);
