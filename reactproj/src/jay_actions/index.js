import {
  INIT_PODCASTER_DASHBOARD,
  INIT_PODCASTER_AUDIO_LIST,
  INIT_EXPLORE_HOMEPAGE,
  INIT_EXPLORE_CATEPAGE,
  INIT_CHANNEL_PAGE_DATA,
  INIT_RATE_MODAL,
  INIT_MEMBER_COLLECTION,
  INIT_MEMBER_CHANNEL_COLLECTION,
} from './actionTypes';

export const initalDashboard = (payload) => {
  return { type: INIT_PODCASTER_DASHBOARD, payload: payload };
};

export const initalDashboardAsync = (podcaster_id) => {
  return async function getChannelInfo(dispatch) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_info/api/${podcaster_id}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    dispatch(initalDashboard(data[0]));
  };
};

// 修改頻道
export const editChannelAsync = (formData) => {
  return async function editChannelSubmit(dispatch) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_info/edit/api`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    console.log(response);
  };
};

export const initalAudioList = (payload) => {
  return { type: INIT_PODCASTER_AUDIO_LIST, payload: payload };
};

export const initalAudioListAsync = (podcaster_id) => {
  return async function getChannelAudioList(dispatch) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_audio/api/${podcaster_id}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    dispatch(initalAudioList(data));
  };
};

// 新增音檔
export const addAudioAsync = (formData) => {
  return async function addAudioSubmit(dispatch) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_audio/add/api`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  };
};

// 刪除音檔
export const delAudioAsync = (audioSid) => {
  return async function addAudioSubmit(dispatch, getState) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_audio/delete/api/${audioSid}`;
    const request = new Request(url, {
      method: 'GET',
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    let newState = getState().podcasterAudioListState.filter(
      (item) => item.sid !== audioSid
    );

    dispatch(initalAudioList(newState));
  };
};

// 修改音檔
export const editAudioAsync = (formData) => {
  return async function addAudioSubmit(dispatch) {
    const url = `http://localhost:5566/podcaster_dashboard/channel_audio/edit/api`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    console.log(data);
  };
};

//初始化探索頁面
export const initalExploreHomePage = (payload) => {
  return { type: INIT_EXPLORE_HOMEPAGE, payload: payload };
};

export const initalExploreHomePageAsync = () => {
  return async function getExploreHomePageData(dispatch) {
    const url = `http://localhost:5566/explore/popular_channels`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    dispatch(initalExploreHomePage(data));
  };
};

//初始化類別頁面
export const initalExploreCatePage = (payload) => {
  return { type: INIT_EXPLORE_CATEPAGE, payload: payload };
};

export const initalExploreCatePageAsync = (cate_term) => {
  return async function getExploreCatePageData(dispatch) {
    const url = `http://localhost:5566/explore/cate_popular_channels/${cate_term}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    dispatch(initalExploreCatePage(data));
  };
};

//初始化頻道頁面
export const initalChannelPage = (payload) => {
  return { type: INIT_CHANNEL_PAGE_DATA, payload: payload };
};

export const initalChannelPageAsync = (podcaster_id) => {
  return async function getChannelPageData(dispatch) {
    const url = `http://localhost:5566/explore/channel_page_data/${podcaster_id}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    dispatch(initalChannelPage(data));
  };
};

// 送出評分
export const submitRateScore = (formData) => {
  return async function sendScore(dispatch) {
    const url = `http://localhost:5566/explore/rate_score`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    console.log(data);
  };
};

export const updateRateScore = (formData) => {
  return async function sendScore(dispatch) {
    const url = `http://localhost:5566/explore/update_rate_score`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    console.log(data);
  };
};

// 整合評分
export const calculateScore = () => {
  return async function startCal(dispatch) {
    const url = `http://localhost:5566/explore/update_all_channel_rating`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    // console.log(data);
  };
};

export const initalRateModal = (payload) => {
  return { type: INIT_RATE_MODAL, payload: payload };
};

export const initalRateModalAsync = (reviewer_id, podcaster_id) => {
  return async function getChannelPageData(dispatch) {
    const url = `http://localhost:5566/explore/compare_rate_score/${reviewer_id}/${podcaster_id}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    dispatch(initalRateModal(data));
  };
};

export const initMemberAudioCollection = (payload) => {
  return { type: INIT_MEMBER_COLLECTION, payload: payload };
};

// INIT_COLLECTION
export const initMemberAudioCollectionAsync = (sid) => {
  return async function getAudioCollection(dispatch) {
    const formData = new FormData();
    formData.append('sid', sid);
    const url = `http://localhost:5566/member_collection/collect`;
    const request = new Request(url, {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    const data = await response.json();
    // data會是一個物件值
    console.log(['data', data]);
    dispatch(initMemberAudioCollection(data.rs));
  };
};

//update collection
export const addCollection = (member_sid, audio_sid) => {
  return async function sendData(dispatch) {
    const url = `http://localhost:5566/member_collection/add_audio`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ sid: member_sid, audio_id: audio_sid }),
    });

    const response = await fetch(request);
    const data = await response.json();
  };
};

export const delCollection = (member_sid, audio_sid) => {
  return async function sendData(dispatch) {
    const url = `http://localhost:5566/member_collection/delete_audio`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ sid: member_sid, audio_id: audio_sid }),
    });

    const response = await fetch(request);
    const data = await response.json();
  };
};

export const initMemberChannelCollection = (payload) => {
  return { type: INIT_MEMBER_CHANNEL_COLLECTION, payload: payload };
};

// INIT_CHANNEL_COLLECTION
export const initMemberChannelCollectionAsync = (sid) => {
  return async function getChannelCollection(dispatch) {
    const url = `http://localhost:5566/member_collection/channel_array`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ sid: sid }),
    });

    const response = await fetch(request);
    const data = await response.json();
    dispatch(initMemberChannelCollection(data.rs));
  };
};

//subscribe channel
export const addChannelCollection = (member_sid, channel_sid) => {
  return async function sendData(dispatch) {
    const url = `http://localhost:5566/member_collection/add_channel`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ sid: member_sid, channel_id: channel_sid }),
    });

    const response = await fetch(request);
    const data = await response.json();
  };
};

export const delChannelCollection = (member_sid, channel_sid) => {
  return async function sendData(dispatch) {
    const url = `http://localhost:5566/member_collection/delete_channel`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ sid: member_sid, channel_id: channel_sid }),
    });

    const response = await fetch(request);
    const data = await response.json();
  };
};
