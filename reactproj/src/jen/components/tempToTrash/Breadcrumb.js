import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GrEdit } from "react-icons/gr";

import { getArticleList, getArticleListAsync } from '../actions/index'
import { getArticleDetail, getArticleDetailAsync } from '../actions/index'

function Breadcrumb(props) {
  console.log('B props', props)
  useEffect(() => {
     props.getArticleDetailAsync(props.sid)
    props.getArticleDetailAsync(props.sid)
  }, [])
  return (
    <>
     <nav aria-label="breadcrumb">
       <ol className="breadcrumb">
          {(props.sid)? (<>
            <li className="breadcrumb-item">
            <Link to={'/'}><GrEdit className="icon mx-1" />專欄首頁</Link>
          </li>
           <li className="breadcrumb-item active">
            <Link to={''}>{props.articleData.article_sid}</Link>
          </li></>):(<>
           <li className="breadcrumb-item active">
                <Link to={'/'}><GrEdit className="icon mx-1" />專欄首頁</Link>
          </li>
          </>)}
        </ol>
      </nav> 
    </>
  )
}

export default Breadcrumb
// const mapStateToProps = (store) => {
//   return {
//     articleListData: store.articleListData,
//     articleDetailData: store.articleDetail,
//   }
// }
// export default withRouter(
//   connect(mapStateToProps, { getArticleDetail, getArticleDetailAsync,getArticleDetail,getArticleDetaileAsync })(
//     Breadcrumb
//   )
// )
