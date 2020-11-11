import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { MdAddCircle } from 'react-icons/md';
//引入留言 子留言
import { getReply, getReplyAsync } from '../../actions/index';

function MsgReplyInput(props) {
  const { parentId } = props;
  const [userId, setUserId] = useState('5566'); //memberId
  const [userNickname, setUserNickname] = useState('浪漫Duke'); //nickname
  const [textValue, setTextValue] = useState(''); //content

  const styleNone = {
    display: 'none',
  };

  const sendReply = async function () {
    const url = 'http://localhost:5566/msg/add/reply';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
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
    console.log('data', data);
    //完成後清空輸入框
    setTextValue('');
    async function replyList() {
      await props.getReplyAsync(parentId);
    }
    replyList();
  };

  return (
    <>
      <div className="writeBox mt-3">
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
                <div className="writeCmt">
                  <textarea
                    className="replyTextarea"
                    name="cmtTextarea"
                    id="cmtTextarea"
                    cols="20"
                    rows="3"
                    placeholder="輸入回應"
                    value={textValue}
                    onChange={(event) => setTextValue(event.target.value)}
                  ></textarea>
                </div>
                <div className="cmtSendBox">
                  <button
                    type="button"
                    className="cmtSendBtn"
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
  return { reply: store.replyReducer };
};

export default connect(mapStateToProps, {
  getReply,
  getReplyAsync,
})(MsgReplyInput);
