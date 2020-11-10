import {
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_LIST,
  GET_ARTICLE_LIST_TOTALROWS,
  GET_ARTICLE_DETAIL_PRE,
  GET_ARTICLE_DETAIL_NEXT,
} from './actionTypes'

//aciotn creator-get list
export const getArticleList = (payload) => {
    return { type: GET_ARTICLE_LIST, payload: payload}
}

export const getArticleListAsync = (page,category, tags, sort, search) => {
    return async function getArticleListFromServer(dispatch) {

        //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
        let query = ''
        if (page) query += `&page=${page}`
        if (category) query += `&category=${category}`
        if (tags) query += `&tags=${tags}`
        if (sort) query += `&sort=${sort}`
        if (search) query += `&search=${search}`
        const url = `http://localhost:5566/article/?${query}`;
        
        const request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })

        const response = await fetch(request)
        const data = await response.json()
        dispatch(getArticleList(data))
        
    }
}

//aciotn creator-get detail
export const getArticleDetail = (payload) => {
    return {type:GET_ARTICLE_DETAIL,payload:payload}
}

export const getArticleDetailAsync = (sid) => {
    return async function getArticleDetailFromServer(dispatch) {

        //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
        const url = `http://localhost:5566/article/${sid}`;
        
        const request = new Request( url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })

        const response = await fetch(request)
        const data = await response.json()
        //API傳送過來的資料為Array(需先得到第0筆的物件)
        dispatch(getArticleDetail(data[0]))
       
        
    }
}
      
//aciotn creator-get detail-PRE
export const getArticleDetailPre = (payload) => {
    return { type: GET_ARTICLE_DETAIL_PRE, payload: payload }
}

export const getArticleDetailPreAsync = (sid) => {
    return async function getArticleDetailPreFromServer(dispatch) {

        //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
        const url = `http://localhost:5566/article/${sid - 1}`
        
        const request = new Request( url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })

        const response = await fetch(request)
        const data = await response.json()
        //API傳送過來的資料為Array(需先得到第0筆的物件)
        dispatch(getArticleDetailPre(data[0]))
       
        
    }
}

//aciotn creator-get detail-NEXT
export const getArticleDetailNext = (payload) => {
  return { type: GET_ARTICLE_DETAIL_NEXT, payload: payload }
}

export const getArticleDetailNextAsync = (sid) => {
  return async function getArticleDetailNextFromServer(dispatch) {
    //欲加入網址列需使用字串(將條件也設定在fetch API來獲取已篩選過的資料)
    const url = `http://localhost:5566/article/${sid}`

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    //API傳送過來的資料為Array(需先得到第0筆的物件)
    dispatch(getArticleDetailNext(data[0]))
  }
}