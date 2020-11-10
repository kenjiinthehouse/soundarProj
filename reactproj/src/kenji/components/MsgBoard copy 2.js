import React, { useState, useEffect } from 'react';
import { Collapse, Button, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
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
import { getMsg, getMsgAsync, getReply, getReplyAsync } from '../actions/index';
//引入輸入留言組件
import MsgInput from './MsgInput';

function MsgBoard(props) {
  const { msg,reply } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  

  useEffect(() => {
    setIsLoading(true);
    async function msgList() {
      await props.getMsgAsync();
    }
    msgList();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleNone = {
    display: 'none',
  };
  const styleForZIndex = {
    zIndex: '10',
  };

  const displayLoading = <></>;

  const displayBoard = (
    <>
      {/* <h1>{console.log(Array.isArray(msg))}</h1> */}
      {/* {msg.map((item) => {
        return <h1>{item.sid}</h1>;
      })} */}

      <div className="cmtArea container mx-auto mt-5">
        <div className="cmtModule">
          <div className="cmtModuleHead row align-items-center">
            <h5 className="cmtTitle pr-2">留言</h5>
            <span className="cmtCount">124</span>
          </div>

          <MsgInput />

          <div className="cmtSortOption d-flex align-items-center">
            <ul className="cmtSortOptionList">
              <li className="pr-3">
                <span className="align-bottom pr-1">
                  <IconContext.Provider value={{ className: 'hotBtn' }}>
                    <MdWhatshot />
                  </IconContext.Provider>
                </span>
                <span className="align-bottom">依人氣排序</span>
              </li>
              <li className="">
                <span className="align-bottom pr-1">
                  <IconContext.Provider value={{ className: 'sortBtn' }}>
                    <MdSort />
                  </IconContext.Provider>
                </span>
                <span className="align-bottom">依發表新舊</span>
              </li>
            </ul>
          </div>

          <div className="cmtContainer">
            <ul className="cmtList">
              {msg.map((item) => {
                return (
                  <li key={item.sid}>
                    <div className="cmtBox">
                      <div className="cmtBoxArea">
                        <div className="cmtInfo d-flex align-items-center">
                          <div className="userHeadIcon mr-2"></div>
                          <div className="cmtSid" style={styleNone}>
                            {item.sid}
                          </div>
                          <div className="cmtNickname mr-auto">
                            {item.nickname}
                          </div>
                          <div className="cmtInfoDate">{item.postTime2}</div>
                        </div>
                        <div className="cmtTextWrap">
                          <span className="cmtBoxContent">{item.content}</span>
                        </div>
                        <div className="cmtTools d-flex align-items-center">
                          <div className="cmtToolsBtn mr-auto">
                            <div
                              className="replyBtn"
                              onClick={() => {
                                async function sendSid() {
                                  await props.getReplyAsync(item.sid);
                                }
                                sendSid();      
                                console.log(item.sid)                          
                                // setOpen(!open);
                              }}
                            >
                              <span className="pr-1">回應</span>
                              <span className="cmtReplyCount">(20)</span>
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
                      <Collapse in={open}>
                        <div className="cmtReply collapse">
                          <ul className="cmtList">
                            {reply.map((item)=>{
                              return (
                                <li className="replyList">
                                  <div className="d-flex no-gutters">
                                    <div className="cmtReplyIco d-flex justify-content-center col-1">
                                      <IconContext.Provider
                                        value={{ className: 'replyArrow' }}
                                      >
                                        <BsArrowReturnRight />
                                      </IconContext.Provider>
                                    </div>
                                    <div className="cmtBoxReplyArea col-11">
                                      <div className="cmtInfo d-flex align-items-center">
                                        <div className="userHeadIcon mr-2"></div>
                                        <div className="replycmtSid"></div>
                                        <div className="cmtNickname mr-auto">
                                          {item.nickname}
                                        </div>
                                        <div className="cmtInfoDate">
                                          {item.postTime2}
                                        </div>
                                      </div>
                                      <div className="cmtTextWrap">
                                        <span className="cmtBoxContent">
                                          {item.content}
                                        </span>
                                      </div>
                                      <div className="cmtTools d-flex align-items-center">
                                        <div className="cmtToolsBtn mr-auto">
                                          <span className="cmtAccuseLink">
                                            檢舉
                                          </span>
                                        </div>

                                        <div className="cmtToolsBtn pr-2">
                                          <a href="">
                                            <span className="material-icons pr-1">
                                              thumb_up_alt
                                            </span>
                                            <span>{item.upPoint}</span>
                                          </a>
                                          <a href="">
                                            <span className="material-icons pr-1">
                                              thumb_down_alt
                                            </span>
                                            <span>{item.downPoint}</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}                            
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  return isLoading ? displayLoading : displayBoard;
}

const mapStateToProps = (store) => {
  return { 
    msg: store.msgBoardReducer,
    reply: store.replyReducer, };
};
export default connect(mapStateToProps, {
  getMsg,
  getMsgAsync,
  getReply,
  getReplyAsync,
})(MsgBoard);
