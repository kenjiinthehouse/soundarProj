import React from 'react';
import '../styles/IndexArticle.scss';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import QueueAnim from 'rc-queue-anim';
import { Divider } from 'antd';
import { BiFastForward } from 'react-icons/bi';

function ArticleCarousel(props) {
  let items = [
    {
      articleId: 205,
      title: '台灣Podcast新藍海：',
      subtitle: '這波耳機裡的新浪潮，大家都在聽什麼？',
      description:
        '\t台灣podcast市場崛起中從Google Trend上可以觀察到「podcast」一字從2020年2月之後，在台灣的搜尋熱度暴增。其他「podcast製作」、「podcast推薦」等搜尋率也不斷竄升。\n\t而台灣目前除了各種podcast頻道逐漸投入市場之外，也有了台灣本土網路聲音節目（podcast）製作公司──鬼島之音（Ghost Island Media），旗下目前有「Waste Not Why Not」、「大麻煩不煩」、「Metalhead Politics（政治重金屬）」等節目，討論各種議題。',
      img: './k_img/IndexArticle205.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(35,45,47,0.5)',
    },
    {
      articleId: 208,
      title: '為何唱片公司要投入 Podcast？⁣',
      subtitle: '看看 Sony 的內容策略',
      description:
        '\t本週我們和 Inside 合作的專欄，從唱片公司製作 Podcast 的歷程談起，分析 Sony 之所以砸下重金投入 Podcast 的原因，摘要結論：「唱片公司還有大把機會在內容上攻城掠地，強化日後和平台的 議價能力，當 Podcast 版權再次被唱片公司掌握，他們又會在平台戰爭笑到最後。」',
      img: './k_img/IndexArticle208.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(204,97,75,0.5)',
    },
    {
      articleId: 210,
      title: '製作Podcast的第一步：',
      subtitle: '節目企劃的5個核心要素',
      description:
        '\t節目企劃能夠幫助你準確完成節目而不偏離主軸，是製作節目不可或缺的環節之一。那麼如何撰寫一份完美的企劃呢？只要掌握住 5 個核心要素：「主題」、「型式」、「時間長度」、「頻率」、「命名」，任何人都能輕鬆上手！接下來就要來幫助你思考這 5 個要點，讓你快速成為企劃好手！',
      img: './k_img/IndexArticle210.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(204,75,183,0.5)',
    },
    {
      articleId: 215,
      title: '簡單無痛4步驟，',
      subtitle: '立即開始自己的Podcast頻道！',
      description:
        '\t台灣在2019年下半，掀起了一陣Podcast風潮，許多新創公司、創作者、KOL都嗅到新市場，紛紛將觸角伸到Podcast！那麼究竟要如何才能成立自己的Podcast頻道？',
      img: './k_img/IndexArticle215.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(75,183,204,0.5)',
    },
  ];

  return (
    <>
      <div className="IndexArticlePage">
        <div className="IndexArticleTitleBox d-flex">
          <h3 className="IndexArticleTitle mx-auto my-auto">Podcast 專欄</h3>
        </div>
        <Carousel
          className="ArticleCarousel mx-auto"
          autoPlay={false}
          indicators={true}
          animation={'slide'}
          navButtonsAlwaysVisible={true}
          next={() => {
            console.log('next');
          }}
          prev={() => {
            console.log('prev');
          }}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>

        <div className="ArticleCarouselColorCard"></div>
      </div>
    </>
  );
}

function Item(props) {
  return (
    <Paper>
      <QueueAnim delay={800} type={['top', 'bottom']} className="queue-simple">
        <div className="articleInfoBox d-flex flex-column" key="2">
          <h4 className="articleTitle ml-3">{props.item.title}</h4>
          <h5 className="articleSubtitle ml-3">{props.item.subtitle}</h5>
          <Divider className="articleDiver" />
          <p className="align-self-center">{props.item.description}</p>
          <Button className=" d-flex mt-2 mx-auto">
            {props.item.click}
            <BiFastForward />
          </Button>
        </div>
      </QueueAnim>
      <QueueAnim delay={500} type={['left', 'right']} className="queue-simple">
        <div className="ArticlePaperColorCard" key="1">
          <svg
            className="slide__overlay"
            data-id="0"
            viewBox="0 0 720 405"
            preserveAspectRatio="xMaxYMax slice"
            fill={props.item.backgroundColorStyle}
          >
            <path
              className="slide__overlay-path"
              d="M0,0 200,0 400,405 0,405"
            />
          </svg>
        </div>
      </QueueAnim>

      <img src={props.item.img} />

      {/* <Button className="CheckButton">
        <label className="clickLabel">{props.item.click}</label>
        {props.item.name}
      </Button> */}
    </Paper>
  );
}
export default ArticleCarousel;
