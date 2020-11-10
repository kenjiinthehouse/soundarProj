import './../styles/article.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

//actions
import {
  getArticleDetailNext,
  getArticleDetailNextAsync,
} from '../actions/index'

function ArticlePageNext(props) {
  //componentDidMount
  useEffect(() => {
    props.getArticleDetailNextAsync(+(props.match.params.sid)+1)
  }, [])

  return (
    <>
      <span>{props.articleDetailNext.article_title}</span>
    </>
  )
}
//取得redux中store的值
const mapStateToProps = (store) => {
  return {
    articleDetailNext: store.articleDetailNext,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    getArticleDetailNext,
    getArticleDetailNextAsync,
  })(ArticlePageNext)
)
