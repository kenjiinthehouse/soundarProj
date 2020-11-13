import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { MdAddCircle } from 'react-icons/md';
//引入留言
import { getArticleMsg, getArticleMsgAsync } from '../../actions/index';

function ArticleMsgInput(props) {
  const [userId, setUserId] = useState('9527'); //memberId
  const [userNickname, setUserNickname] = useState('七星刀雷恩'); //nickname
  const [textValue, setTextValue] = useState(''); //content
  const styleNone = {
    display: 'none',
  };

  const sendInput = async function () {
    const url = 'http://localhost:5566/article/comment/add';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
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
    console.log('data', data);
    //完成後清空輸入框
    setTextValue('');
    async function msgList() {
      await props.getArticleMsgAsync();
    }
    msgList();
  };

  return (
    <>
      <div className="article-writeBox">
        <div className="writeBoxLogged">
          <form>
            <fieldset>
              <legend className="ghost">留下評論</legend>
              <div>
                <div className="userProfile">
                  <span className="userId" style={styleNone}>
                    {userId}
                  </span>
                  <span className="userNickname" style={styleNone}>
                    {userNickname}
                  </span>
                </div>
                <div className="article-writeCmt">
                  <textarea
                    className="article-cmtTextarea"
                    name="cmtTextarea"
                    id="cmtTextarea"
                    cols="20"
                    rows="2"
                    placeholder="輸入留言"
                    value={textValue}
                    onChange={(event) => setTextValue(event.target.value)}
                  ></textarea>
                </div>
                <div className="article-cmtSendBox">
                  <button
                    type="button"
                    className="article-cmtSendBtn"
                    onClick={() => sendInput()}
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
  return { msg: store.articleMsgBoard };
};

export default connect(mapStateToProps, {
  getArticleMsg,
  getArticleMsgAsync,
})(ArticleMsgInput);
