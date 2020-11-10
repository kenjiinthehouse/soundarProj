import './../styles/article.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
//icons
import { FaCaretRight } from 'react-icons/fa'
//actions
import {
  getArticleDetailPre,
  getArticleDetailPreAsync,
  getArticleDetailNext,
  getArticleDetailNextAsync,
} from '../actions/index'
// import { MdSettingsInputHdmi } from 'react-icons/md'

function ArticlePagePreAndNext(props) {
  //componentDidMount
  useEffect(() => {
    props.getArticleDetailPreAsync(props.sid)
    props.getArticleDetailNextAsync(+props.sid + 1) //props.sid +1 無法work(props.sid-1可work)
  }, [])
  useEffect(() => {
    props.getArticleDetailPreAsync(props.sid)
    props.getArticleDetailNextAsync(+props.sid + 1)
  }, [props.sid])

  return (
    <>
      {' '}
      <div className="article-page-others d-flex justify-content-between align-items-center">
        <div className="article-page-previous">
          <span className="pr-2">
            <FaCaretRight />
            上一篇：
          </span>
          <span
            onClick={() => {
              props.setSid(props.sid - 1)
            }}
          >
            {props.articleDetailPre.article_title}
          </span>
        </div>
        <div className="article-page-next">
          <span className="pr-2">
            <FaCaretRight />
            下一篇：
          </span>
          <span
            onClick={() => {
              props.setSid(+props.sid + 1)
            }}
          >
            {props.articleDetailNext.article_title}
          </span>
        </div>
      </div>
    </>
  )
}
//取得redux中store的值
const mapStateToProps = (store) => {
  return {
    articleDetailPre: store.articleDetailPre,
    articleDetailNext: store.articleDetailNext,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    getArticleDetailPre,
    getArticleDetailPreAsync,
    getArticleDetailNext,
    getArticleDetailNextAsync,
  })(ArticlePagePreAndNext)
)
