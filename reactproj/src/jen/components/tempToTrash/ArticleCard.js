import React from 'react'

import TagsBtn from './TagsBtn'

function ArticleCard(props) {
  return (
    <>
      <div className="card d-flex flex-row align-items-center">
        <div className="card-date text-center align-items-center">
          <h4>
            1<br />
            March
          </h4>
        </div>
        <div className="card-img">
          <img src="http://localhost:3000/img/article02.jpg" alt="..." />
        </div>
        <div className="card-body">
          <h5 className="card-title">暫定標題</h5>
          <p className="card-content  text-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            doloremque est non voluptatum illum! Rerum dolores odio, quaerat
            doloremque est autem, voluptatem, numquam sequi rem dolore culpa
            omnis tempore? Optio.
          </p>
          <div className="d-flex">
            <span className="card-cates">專欄分類</span>
            <span>
              <TagsBtn btnText="標籤" />
            </span>
            <span className="card-cates text-right ml-auto">繼續閱讀</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleCard
