import './../styles/article.scss';
import React from 'react';
import { Link } from 'react-router-dom';
//icons
import { FaCaretRight } from 'react-icons/fa';

function ArticlePagePreAndNext(props) {
  const preSid = +props.sid - 1;
  const nextSid = +props.sid + 1;
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
                onClick={() => props.setSid(preSid)}
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
                onClick={() => props.setSid(nextSid)}
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
