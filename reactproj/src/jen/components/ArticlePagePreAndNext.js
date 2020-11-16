import './../styles/article.scss';
import React from 'react';
import { Link } from 'react-router-dom';
//icons
import { FaCaretRight } from 'react-icons/fa';

function ArticlePagePreAndNext(props) {
  const preSid = +props.sid - 1;
  const nextSid = +props.sid + 1;

  //clicks POST
  const updateTotalToServer = async function (sid) {
    const url = `http://localhost:5566/article/edit/${sid}`;
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        article_clicks: +props.articleDetailData.article_clicks + 1,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
  };
  return (
    <>
      {' '}
      <div className="article-page-others d-flex justify-content-between align-items-center">
        <div className="article-page-previous">
          <span className="pr-2">
            <FaCaretRight />
            上一篇：
          </span>
          {preSid ? (
            <span>
              <Link
                to={'/articlePage/' + preSid}
                onClick={() => {
                  props.setSid(preSid);
                  updateTotalToServer(props.sid)
                }}
              >
                {props.articleDetailData.pre_title}
              </Link>
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div className="article-page-next">
          <span className="pr-2">
            <FaCaretRight />
            下一篇：
          </span>
          {+props.sid + 1 ? (
            <span>
              <Link
                to={'/articlePage/' + nextSid}
                onClick={() => {
                  props.setSid(nextSid);
                  updateTotalToServer(props.sid);
                }}
              >
                {props.articleDetailData.next_title}
              </Link>
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticlePagePreAndNext;
