import './../styles/article.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
//icons
import { FaTags, FaHotjar, FaCaretRight, FaPencilAlt } from 'react-icons/fa';
import { MdAutorenew } from 'react-icons/md';
import { TiArrowSortedUp } from 'react-icons/ti';
//components
import ArticleCarousel from './../components/ArticleCarousel';
import Searchbar from './../components/Searchbar';
// import ClickToTop from './../components/ClickToTop'
import ScrollToTop from 'react-scroll-to-top';
import Pagination from './../components/Pagination';
//actions
import { getArticleList, getArticleListAsync } from '../actions/index';

function ArticleHome(props) {
  const [page, setPage] = useState(1);
  // const [category, setCategory] = useState('')
  // const [tags, setTags] = useState('')
  const { tags, setTags, category, setCategory } = props;
  const [sort, setSort] = useState(false); //對應API 未設置排序預設為最新專欄(flase)
  const [search, setSearch] = useState('');
  const [firstTimeLoad, setFirstTimeLoad] = useState(1); //預設第一次載入(true)

  //componentDidMount
  useEffect(async () => {
    await props.getArticleListAsync(page, category, tags, sort, search);
    setFirstTimeLoad(1); //第一次掛載好後(true)
  }, []);

  //componentDidUpadate
  useEffect(() => {
    //給定所有useState造成update的參數
    props.getArticleListAsync(page, category, tags, sort, search);
  }, [page, category, tags, search, sort]);
  useEffect(() => {
    
    if (props.articleTotalRows.totalRows) {
      setFirstTimeLoad(0); //當資料完全載入後,就更改狀態(false)
    }
    if (!firstTimeLoad) { //當非首次載入(false)則每設定新條件時，自動將頁面滾至頁首(需先判斷是否為頁面剛載入狀況)
      window.scroll({ top: 700, left: 0, behavior: 'smooth' });
    }
  }, [page, category, tags, sort, firstTimeLoad]);
  return (
    <div className="article-body">
      {/* <ClickToTop /> */}
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
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link to={'/'} onClick={(event) => event.preventDefault()}>
                <FaPencilAlt className="mr-2" />
                專欄首頁
              </Link>
            </li>
          </ol>
        </nav>
        <div className="article-cate-row d-flex ">
          <Searchbar search={search} setSearch={setSearch} />
          <div>
            {/* category btn series */}
            <button
              className={
                category === '' ? 'article-cate-btn active' : 'article-cate-btn'
              }
              onClick={() => {
                setCategory('');
                setPage(1);
              }}
            >
              全部分類
            </button>
            <button
              className={
                category === '官方公告'
                  ? 'article-cate-btn active'
                  : 'article-cate-btn'
              }
              onClick={() => {
                setCategory('官方公告');
                setPage(1);
              }}
            >
              官方公告
            </button>
            <button
              className={
                category === '活動訊息'
                  ? 'article-cate-btn active'
                  : 'article-cate-btn'
              }
              onClick={() => {
                setCategory('活動訊息');
                setPage(1);
              }}
            >
              活動訊息
            </button>
            <button
              className={
                category === 'Podcast相關'
                  ? 'article-cate-btn active'
                  : 'article-cate-btn'
              }
              onClick={() => {
                setCategory('Podcast相關');
                setPage(1);
              }}
            >
              Podcast相關
            </button>
            <button
              className={
                category === '每週頻道推薦'
                  ? 'article-cate-btn active'
                  : 'article-cate-btn'
              }
              onClick={() => {
                setCategory('每週頻道推薦');
                setPage(1);
              }}
            >
              每週頻道推薦
            </button>
          </div>
        </div>
        <div className="article-tags-row d-flex justify-content-between">
          <div>
            {/* tags btn series */}
            <FaTags className="icon" />
            <button
              type="button"
              className={
                tags === '' ? 'article-tags-btn all' : 'article-tags-btn'
              }
              onClick={() => {
                {
                  setTags('');
                  setPage(1);
                }
              }}
            >
              全部
            </button>
            <button
              type="button"
              className={
                tags === '新聞' ? 'article-tags-btn news' : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #b9e3ff' }}
              onClick={() => {
                {
                  setTags('新聞');
                  setPage(1);
                }
              }}
            >
              新聞
            </button>
            <button
              type="button"
              className={
                tags === '商業'
                  ? 'article-tags-btn bussiness'
                  : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #fadb28' }}
              onClick={() => {
                {
                  setTags('商業');
                  setPage(1);
                }
              }}
            >
              商業
            </button>
            <button
              type="button"
              className={
                tags === '科技'
                  ? 'article-tags-btn technology'
                  : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #84e5bd' }}
              onClick={() => {
                {
                  setTags('科技');
                  setPage(1);
                }
              }}
            >
              科技
            </button>
            <button
              type="button"
              className={
                tags === '教育'
                  ? 'article-tags-btn education'
                  : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #f780ae' }}
              onClick={() => {
                {
                  setTags('教育');
                  setPage(1);
                }
              }}
            >
              教育
            </button>
            <button
              type="button"
              className={
                tags === '故事' ? 'article-tags-btn story' : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #846def' }}
              onClick={() => {
                {
                  setTags('故事');
                  setPage(1);
                }
              }}
            >
              故事
            </button>
            <button
              type="button"
              className={
                tags === '娛樂'
                  ? 'article-tags-btn entainment'
                  : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #f7aa99' }}
              onClick={() => {
                {
                  setTags('娛樂');
                  setPage(1);
                }
              }}
            >
              娛樂
            </button>
            <button
              type="button"
              className={
                tags === '運動' ? 'article-tags-btn sport' : 'article-tags-btn'
              }
              style={{ border: 'solid 1px #f8f8f8' }}
              onClick={() => {
                {
                  setTags('運動');
                  setPage(1);
                }
              }}
            >
              運動
            </button>
          </div>{' '}
          {/* sort btn series */}
          <div className="article-sort-btn">
            <span
              className={sort === false ? 'active' : ''}
              onClick={() => {
                {
                  setSort(false);
                  setPage(1);
                }
              }}
            >
              <MdAutorenew className="icon mr-1" />
              {''}最新專欄
            </span>
            <span
              className={sort === true ? 'active' : ''}
              onClick={() => {
                {
                  setSort(true);
                  setPage(1);
                }
              }}
            >
              <FaHotjar className="icon mr-1" />
              {''}熱門專欄
            </span>
          </div>
        </div>
        <div className="">
          {/* 將每個row使用map至各個card中 */}
          {props.articleTotalRows.totalRows !== 0 ? (
            props.articleRows.map((item) => {
              return (
                <div
                  key={item.sid}
                  className="article-card d-flex flex-row align-items-center"
                >
                  <div className="article-card-date text-center align-items-center">
                    <h4>
                      {/* 該時間為字串,非dateTime需先變成dateTime格式才使用getDate() */}
                      {new Date(item.article_created_at).getDate()}
                      <br />
                      {/* 先變換時間格式,再取得月份 */}
                      {new Date(item.article_created_at)
                        .toDateString()
                        .slice(4, 8)}
                    </h4>
                  </div>
                  <div className="article-card-img">
                    <Link to={'/articlePage/' + item.sid} setTags={setTags}>
                   
                      <img
                      // src="http://localhost:3000/img/article02.jpg"
                      src={item.article_img_url}
                      alt="..."
                    />
                    </Link>
                   
                  </div>
                  <div className="article-card-body card-body">
                    <h5 className="article-card-title">
                      <FaCaretRight className="icon" />
                      {item.article_title}
                    </h5>
                    <p className="article-card-content text-wrap">
                      {item.article_content}
                    </p>
                    <div className="d-flex">
                      <span
                        className="article-card-cates"
                        onClick={() => {
                          setCategory(`${item.article_category}`);
                        }}
                      ><a>
                        {item.article_category}</a>
                      </span>
                      {/* tags原為字串,需變成陣列才map至各個span中 */}
                      {item.article_tags.split(',').map((tag, index) => {
                        return (
                          <span key={index}>
                            <button
                              type="button"
                              className="article-tags-btn"
                              onClick={() => {
                                setTags(`${tag}`);
                              }}
                            >
                              {tag}
                            </button>
                          </span>
                        );
                      })}
                      <span className="article-card-cates text-right ml-auto">
                        <Link to={'/articlePage/' + item.sid} setTags={setTags}>
                          繼續閱讀
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="article-card d-flex flex-row align-items-center justify-content-center">
              <div className="article-card-none">
                <h5 className="pb-5">-查無相關專欄-</h5>
                <p>分類：{category ? category : '未設定'}</p>
                <p>標籤：{tags ? tags : '未設定'}</p>
                <p>關鍵字：{search ? search : '未設定'}</p>
              </div>
            </div>
          )}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          articlePages={props.articlePages}
          articleTotalRows={props.articleTotalRows}
        />
      </div>
    </div>
  );
}

//取得redux中store的值
const mapStateToProps = (store) => {
  return {
    articleRows: store.articleList,
    articlePages: store.articleListPages,
    articleTotalRows: store.articleListTotalRows,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getArticleList,
    getArticleListAsync,
  })(ArticleHome)
);
