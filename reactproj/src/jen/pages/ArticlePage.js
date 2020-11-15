import './../styles/article.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
//icons
import { FaPencilAlt, FaCaretRight } from 'react-icons/fa';
import { TiArrowSortedUp } from 'react-icons/ti';
//components
import ArticleCarousel from './../components/ArticleCarousel';
import ArticleComment from './../components/ArticleComment';
// import ClickToTop from './../components/ClickToTop'
import ScrollToTop from 'react-scroll-to-top';
import ArticlePagePreAndNext from './../components/ArticlePagePreAndNext';
import ArticleMsgBoard from './../components/ArticleMsgBoard'; //MsgBorad for ArticlePage
// import MsgBoard from './../../kenji/components/MsgBoard'; //MsgBorad
//actions
import {
  getArticleDetail,
  getArticleDetailAsync,
  getArticleList,
  getArticleListAsync,
} from '../actions/index';

function ArticlePage(props) {
  const [sid, setSid] = useState(+props.match.params.sid);
  const [fontSize, setFontSize] = useState('1rem');
  // 先字串化,再陣列化,才能map
  const articleTagsArray = ('' + props.articleDetailData.article_tags).split(
    ','
  );
  //componentDidMount
  useEffect(() => {
    props.getArticleDetailAsync(sid);
  }, []);

  //componentDidUpdate
  useEffect(() => {
    props.getArticleDetailAsync(sid);
    //每當更換新文章時自動滾至頁首
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, [sid]);
  return (
    <div className="article-body">
      <ScrollToTop
        smooth
        style={{
          bottom: '120px',
          right: '80px',
          borderRadius: '50%',
          outline: 'none',
          opacity: '0.75',
        }}
        component={
          <TiArrowSortedUp style={{ fontSize: '1.8rem', color: '#000000' }} />
        }
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
              <FaCaretRight />
              <FaCaretRight />
              {props.articleDetailData.article_title}
            </div>
            <div className="article-img">
              <img src={props.articleDetailData.article_img_url} alt="..." />
            </div>
            <div className="article-font-change d-flex justify-content-end align-items-end">
              <div className="title">字體大小：</div>
              <div
                className={
                  fontSize === '0.9rem' ? 'fz-select active' : 'fz-select'
                }
                style={{ width: '0.5rem', height: '0.5rem' }}
                onClick={() => {
                  setFontSize('0.9rem');
                }}
              ></div>
              <div
                className={
                  fontSize === '1rem' ? 'fz-select active' : 'fz-select'
                }
                style={{ width: '0.7rem', height: '0.7rem' }}
                onClick={() => {
                  setFontSize('1rem');
                }}
              ></div>
              <div
                className={
                  fontSize === '1.2rem' ? 'fz-select active' : 'fz-select'
                }
                style={{ width: '0.9rem', height: '0.9rem' }}
                onClick={() => {
                  setFontSize('1.2rem');
                }}
              ></div>
            </div>
            <div
              className="article-content-area"
              style={{ fontSize: fontSize }}
            >
              <p>{props.articleDetailData.article_content}</p>
            </div>
            <div className="article-page-category">
              <span className="span-category mr-1">專欄分類：</span>
              <Link to={{ pathname: '/article' }}>
                <span
                  className="span-category mr-5"
                  onClick={() => {
                    props.setCategory(
                      `${props.articleDetailData.article_category}`
                    );
                  }}
                >
                  {props.articleDetailData.article_category}
                </span>
              </Link>
              <span className="span-category mr-1">標籤分類：</span>
              {/* tags經過處理後,字串化並變成陣列才map至各個span中 */}
              {articleTagsArray.map((tag, index) => {
                return (
                  <span key={index} className="my-auto">
                    <Link
                      to={{
                        pathname: '/article',
                      }}
                    >
                      <button
                        type="button"
                        className="article-tags-btn"
                        onClick={() => {
                          props.setTags(`${tag}`);
                        }}
                      >
                        {tag}
                      </button>
                    </Link>
                  </span>
                );
              })}
              <span className="span-clicks ml-auto">
                瀏覽次數：
                {props.articleDetailData.article_clicks}
              </span>
            </div>
            <ArticlePagePreAndNext
              sid={sid}
              setSid={setSid}
              articleDetailData={props.articleDetailData}
            />
            {/* <ArticleComment /> */}
            <ArticleMsgBoard sid={sid} />
            {/* <MsgBoard /> */}
          </div>
        </div>
      </div>
      {/* <ClickToTop /> */}
    </div>
  );
}
//取得redux中store的值
const mapStateToProps = (store) => {
  return {
    articleDetailData: store.articleDetail,
    articleRows: store.articleList,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getArticleDetail,
    getArticleDetailAsync,
    getArticleList,
    getArticleListAsync,
  })(ArticlePage)
);
