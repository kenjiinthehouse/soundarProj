import './../styles/article.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
//icons
import { FaPencilAlt } from 'react-icons/fa'
import { TiArrowSortedUp } from "react-icons/ti";
//components
import ArticleCarousel from './../components/ArticleCarousel'
import ArticleComment from './../components/ArticleComment'
// import ClickToTop from './../components/ClickToTop'
import ArticlePagePreAndNext from './../components/ArticlePagePreAndNext'
import ScrollToTop from 'react-scroll-to-top';
//actions
import { getArticleDetail, getArticleDetailAsync,getArticleList,getArticleListAsync } from '../actions/index'

function ArticlePage(props) {
  const [fontSize, setFontSize] = useState('1rem')
  const [sid, setSid] = useState(props.match.params.sid)
  // 先字串化,再陣列化,才能map
  const articleTagsArray = ('' + props.articleDetailData.article_tags).split(',')

  //componentDidMount
  useEffect(() => {
    props.getArticleDetailAsync(sid)
  }, [])
  // console.log(props)
  //componentDidUpdate
  useEffect(() => {
    props.getArticleDetailAsync(sid)
  }, [fontSize, sid])
  useEffect(() => {
    //每當更換新文章時自動滾至頁首
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  },[sid])
  return (
    <div className="article-body">
      <ScrollToTop
        smooth
        style={{ bottom: '120px', right: '80px',borderRadius:'50%',outline:'none', opacity:'0.75' }}
        component={<TiArrowSortedUp style={{ fontSize: '1.8rem',color:'#000000' }} />}
      />
      <ArticleCarousel />
      <div className="article-container mx-auto">
        <nav aria-label="breadcrumb" className="article-breadcrumb">
          <ol className="breadcrumb article-breadcrumb">
            <li className="breadcrumb-item">
              <Link to={'/article'}>
                <FaPencilAlt className="mr-2" />
                專欄首頁
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a onClick={(event) => event.preventDefault()}>
                {props.articleDetailData.article_title}
              </a>
            </li>
          </ol>
        </nav>
        {/* Content */}
        <div className="d-flex">
          <div className="article-page-date">
            {/* 該時間為字串,非dateTime需先變成dateTime格式才使用getDate() */}
            {new Date(props.articleDetailData.article_created_at).getDate()}
            <br />
            {/* 先變換時間格式,再取得月份 */}
            {new Date(props.articleDetailData.article_created_at)
              .toDateString()
              .slice(4, 8)}
          </div>
          <div className="article-content-wrap">
            <div className="article-title">
              {props.articleDetailData.article_title}
            </div>
            <div className="article-img">
              <img src={props.articleDetailData.article_img_url} alt="..." />
            </div>
            <div className="article-font-change d-flex justify-content-end">
              <p className="title">字體大小：</p>
              <p
                className={fontSize === '0.9rem' ? 'active' : ''}
                onClick={() => {
                  setFontSize('0.9rem')
                }}
              >
                小
              </p>
              <p
                className={fontSize === '1rem' ? 'active' : ''}
                onClick={() => {
                  setFontSize('1rem')
                }}
              >
                中
              </p>
              <p
                className={fontSize === '1.2rem' ? 'active' : ''}
                onClick={() => {
                  setFontSize('1.2rem')
                }}
              >
                大
              </p>
            </div>
            <div
              className="article-content-area"
              style={{ fontSize: fontSize }}
            >
              <p>{props.articleDetailData.article_content}</p>
            </div>
            <div className="article-page-category d-flex align-content-center">
              <span className="span-font mr-1">專欄分類：</span>
              <span className="span-font mr-5">
                {props.articleDetailData.article_category}
              </span>
              <span className="span-font mr-1">標籤分類：</span>
              {/* tags經過處理後,字串化並變成陣列才map至各個span中 */}
              {articleTagsArray.map((tag, index) => {
                return (
                  <span key={index} className="my-auto">
                    {/* <Link to={'/'}> */}
                    <button
                      type="button"
                      className="article-tags-btn"
                      // onClick={() => {
                      //   props.setTags(`${tag}`)
                      // }}
                    >
                      {tag}
                    </button>
                    {/* </Link> */}
                  </span>
                )
              })}
            </div>
            <ArticlePagePreAndNext sid={sid} setSid={setSid} />
          </div>
        </div>
        <ArticleComment />
      </div>
      {/* <ClickToTop /> */}
    </div>
  )
}
//取得redux中store的值
const mapStateToProps = (store) => {
  return {
    articleDetailData: store.articleDetail,
    articleRows: store.articleList,
  }
}
export default withRouter(
  connect(mapStateToProps, { getArticleDetail, getArticleDetailAsync,getArticleList,getArticleListAsync })(
    ArticlePage
  )
)
