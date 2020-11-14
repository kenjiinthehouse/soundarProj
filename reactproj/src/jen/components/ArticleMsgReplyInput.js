import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { MdAddCircle } from 'react-icons/md';
//引入留言 子留言
import { getArticleReply, getArticleReplyAsync } from '../../actions/index';

function ArticleMsgReplyInput(props) {
  const { parentId, sid } = props;
  console.log('reply', props);
  const [userId, setUserId] = useState('5566'); //memberId
  const [userNickname, setUserNickname] = useState('浪漫Duke'); //nickname
  const [textValue, setTextValue] = useState(''); //content

  const styleNone = {
    display: 'none',
  };

  const sendReply = async function () {
    const url = 'http://localhost:5566/article/comment/add/reply';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: props.sid, //對應到API article_sid
        parentId: parentId,
        memberId: userId,
        nickname: userNickname,
        content: textValue,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    // console.log('data', data);
    //完成後清空輸入框
    setTextValue('');
    async function replyList() {
      await props.getArticleReplyAsync(parentId);
    }
    replyList();
  };

  return (
    <>
      <div className="article-writeBox mt-3">
        <div className="writeBoxLogged">
          <form>
            <fieldset>
              <legend className="ghost">留下評論</legend>
              <div>
                <div className="userProfile">
                  <span className="parentId" style={styleNone}>
                    {parentId}
                  </span>
                  <span className="userId" style={styleNone}>
                    {userId}
                  </span>
                  <span className="userNickname" style={styleNone}>
                    {userNickname}
                  </span>
                </div>
                <div className="article-writeCmt">
                  <textarea
                    className="article-replyTextarea"
                    name="cmtTextarea"
                    id="cmtTextarea"
                    cols="20"
                    rows="3"
                    placeholder="輸入回應"
                    value={textValue}
                    onChange={(event) => setTextValue(event.target.value)}
                  ></textarea>
                </div>
                <div className="article-cmtSendBox">
                  <button
                    type="button"
                    className="article-cmtSendBtn"
                    onClick={() => sendReply()}
                  >
                    <IconContext.Provider value={{ className: 'addBtn' }}>
                      <MdAddCircle />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  return { reply: store.articleMsgReply };
};

export default connect(mapStateToProps, {
  getArticleReply,
  getArticleReplyAsync,
})(ArticleMsgReplyInput);
