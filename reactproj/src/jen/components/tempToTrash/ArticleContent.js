import React from 'react'

import TagsBtn from './TagsBtn'

function ArticleContent(props) {
  return (
    <>
      {/* {props.articleDetailData.map((item, index) => {
      return (
         */}
     
      <div className="d-flex">
        <div className="article-page-date">
          1<br />
          March
        </div>
        <div className="article-content-wrap">
          <div className="article-title">
            Podcast新手入門：為什麼要聽、用什麼聽，以 及有哪些好節目
          </div>
          <div className="article-img">
            <img src="http://localhost:3000/img/article02.jpg" alt="..." />
          </div>
          <div className="article-font-change text-right">
            <span>字體大小：</span>
            <span>小</span>
            <span>中</span>
            <span>大</span>
          </div>
          <div className="article-content-area">
            什麼是podcast？
            Podcast的名稱源於iPod＋Broadcast的組合，但這樣講對於不知道這是什麼玩意的人來說應該還是很難理解。很久以前podcast剛出來的時候，我看到有人用「聲音版的Tivo」來介紹，不過Tivo這玩意當時（大約2005年）在美國火熱得要命，在台灣知道的人卻非常少，所以用「聲音版的Tivo」來介紹podcast給台灣讀者大概也是緣木求魚。
            簡單來說，podcast就是聲音的節目，也可以稱為網路廣播。不過podcast跟廣播有幾點不一樣：
            ●檔案存放在網路上，所以是一個隨選（on
            demand）的使用情境，你可以想聽就聽，想停就停，或許你可以想成是聲音版的YouTube。
            ●結合RSS
            feed訂閱功能，所以當有新節目出現的時候會自動出現在你的訂閱清單裡面，恩......好吧，的確像是聲音版的YouTube。
            為什麼要聽podcast？
            大家可能會認為現在網路上內容這麼多，文章、圖片、影音等等，多有趣啊，加上我自己又那麼愛看書，有時間為什麼不用「看」的就好？
            但其實有很多情境我們是無法一直看著手機（或平版或Kindle或書），比如說走路、跑步、運動、開車或騎車等等，但這個時候我們的耳朵反而是閒的，如果能找到有趣的聲音節目，就可以充分利用或消磨這些時間，充實自己的生活，也不會因為常常低頭滑手機造成後遺症或發生危險。而且聲音和影像（視覺）是很不一樣的媒介。我們可以從聲音上面，獲得很多不一樣的體驗。比如說一般被認為是帶動美國這一波podcast復興的重要節目《Serial》，它是一個回溯1999年發生的命案的調查報導故事，透過製作人和記者去做大量的訪談、分析和回顧資料，花了12集的時間說這個故事，引發了聽眾大量的「追劇」，成為美國第一個總下載破億次的節目。裡面有各種訪談錄音、也有現場的錄音，邊聽會給人一種身歷其境的感覺。
            台灣中文podcast的復興
            大約在2016年，當我開始比較認真聽podcast的時候，台灣中文的podcast節目真的少得可憐，你打開Apple
            Podcast
            app，上面的推薦可能兩三月才會更新一次，排行榜也是沒多少變化，可以想見整個市場非常冷清。
          </div>
          <div className="article-page-category">
            <span className="span-font">專欄分類：</span>
            <span className="span-font"></span>
            <span className="span-font">標籤分類：</span>
            <span>
              <TagsBtn btnText="商業" />
            </span>
            </div>
             {/* )
    })} */}
          <div className="article-page-others d-flex justify-content-between">
            <div className="article-page-previous">
              <span>上一篇：</span>
              <span></span>
            </div>
            <div className="article-page-next">
              <span>下一篇：</span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleContent
