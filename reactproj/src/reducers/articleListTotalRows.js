import { GET_ARTICLE_LIST } from './../actions/actionTypes'

//只有根據page變動而改變頁碼的pages array
//get article data(必為陣列，後續需要map，後續需要map代入各個row)
export default function getArticleList(state = {}, action) {
    switch (action.type) {
        case GET_ARTICLE_LIST:
            return action.payload[2]
        default:
            return state
    }
}
