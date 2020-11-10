import { GET_ARTICLE_DETAIL } from './../actions/actionTypes'

//get article data(必為陣列，後續需要map，後續需要map代入各個row)
export default function getArticleDetail(state = {
    // sid: '',
    // article_create_at: '',
    // article_title: '',
    // article_img_name: '',
    // article_category: '',
    // article_tags: [],
    // article_content: '',
    // article_clicks:'',
}, action) {
    switch (action.type) {
        case GET_ARTICLE_DETAIL:
            return action.payload
        default:
            return state
    }
}
