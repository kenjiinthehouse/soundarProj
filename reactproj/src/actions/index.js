import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_LIST,
  GET_ARTICLE_LIST_TOTALROWS,
  GET_ARTICLE_MSG,
  GET_ARTICLE_REPLY,
  INIT_MEMBER,
  LOG_OUT,
  GET_MSG,
  GET_REPLY,
} from './actionTypes';

//aciotn creator-get list
export const getArticleList = (payload) => {
  return { type: GET_ARTICLE_LIST, payload: payload };
};

export const getArticleListAsync = (page, category, tags, sort, search) => {
  return async function getArticleListFromServer(dispatch) {
    //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
    let query = '';
    if (page) query += `&page=${page}`;
    if (category) query += `&category=${category}`;
    if (tags) query += `&tags=${tags}`;
    if (sort) query += `&sort=${sort}`;
    if (search) query += `&search=${search}`;
    const url = `http://localhost:5566/article/?${query}`;

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    dispatch(getArticleList(data));
  };
};

//aciotn creator-get detail
export const getArticleDetail = (payload) => {
  return { type: GET_ARTICLE_DETAIL, payload: payload };
};

export const getArticleDetailAsync = (sid) => {
  return async function getArticleDetailFromServer(dispatch) {
    //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
    const url = `http://localhost:5566/article/${sid}`;

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    //API傳送過來的資料為Array(需先得到第0筆的物件)
    dispatch(getArticleDetail(data[0]));
  };
};


export const getArticleMsg = (payload) => {
  return { type: GET_ARTICLE_MSG, payload: payload };
};
//針對特定專欄取得對應留言
export const getArticleMsgAsync = (sid,msgSort) => {
  return async function getArticleMsgFunc(dispatch) {
    let query = '';
    if (sid) query += `&sid=${sid}`;
    if (msgSort) query += `&msgSort=${msgSort}` 
    const url = `http://localhost:5566/article/comment/index/?${query}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const msgList = await response.json();
    // console.log('msgList',msgList)
    dispatch(getArticleMsg(msgList));
  };
};

export const getArticleReply = (payload) => {
  return { type: GET_ARTICLE_REPLY, payload: payload };
};
export const getArticleReplyAsync = (pid) => {
  return async function getArticleReplyFunc(dispatch) {
    // let query = '';
    // if (sid) query += `&sid=${sid}`;
    // if (pid) query += `&pid=${pid}`;
    const url = `http://localhost:5566/article/comment/reply/${pid}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const replyList = await response.json();
    // console.log('parentId給多少:', replyList);
    dispatch(getArticleReply(replyList));
  };
};

//samps

export const logOut = () => {
  return { type: LOG_OUT };
};

export const logOutAsync = () => {
  return function clearJwt_logOut(dispatch, getState) {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      dispatch(logOut());
    }
  };
};

export const initMember = (obj) => {
  return { type: INIT_MEMBER, obj };
};

export const initMemberAsync = (obj) => {
  return async function JWT(dispatch, getState) {
    if (localStorage.getItem('jwt')) {
      // const member = JSON.parse(localStorage.getItem('jwt'))
      // console.log('jwt:', localStorage.getItem('jwt'))

      const url = 'http://localhost:5566/member/jwt';
      const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('jwt')),
        }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      try {
        const response = await fetch(request);
        const member = await response.json();
        // console.log('data', member)
        dispatch(initMember(member));
      } catch (error) {}
    }
  };
};

export const Member_nick_photo = (sid) => {
  return async function JWT(dispatch, getState) {
    const url = 'http://localhost:5566/member/picture-jwt';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: sid,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    try {
      const response = await fetch(request);
      const member = await response.json();
      if (localStorage.getItem('jwt')) {
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', JSON.stringify(member.token));
      } // console.log('data', member)
      dispatch(initMember(member.source));
    } catch (error) {}
  };
};

//kenji
export const getMsg = (payload) => {
  return { type: GET_MSG, payload: payload };
};
export const getMsgAsync = () => {
  return async function getMsgFunc(dispatch) {
    const url = 'http://localhost:5566/msg';
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const msgList = await response.json();
    // console.log(msgList)
    dispatch(getMsg(msgList));
  };
};

export const getReply = (payload) => {
  return { type: GET_REPLY, payload: payload };
};
export const getReplyAsync = (sid) => {
  return async function getReplyFunc(dispatch) {
    const url = `http://localhost:5566/msg/reply/${sid}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const replyList = await response.json();
    console.log('parentId給多少:', replyList);
    dispatch(getReply(replyList));
  };
};
