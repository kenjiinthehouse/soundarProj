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
      img: '/img/IndexArticle205.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(35,45,47,0.5)',
    },
    {
      articleId: 208,
      title: 'Podcast新手入門：',
      subtitle: '為什麼要聽、用什麼聽，以及有哪些好節目',
      description:
        '  如果你不瞭解什麼是podcast，但是很想要瞭解最近在台灣網路世界很火紅的說故事方式的話，這篇文章會告訴你什麼是podcast，想要聽的話又該怎麼入門......',
<<<<<<< HEAD
      img: './k_img/IndexArticle208.jpg',
=======
      img: '/img/IndexArticle208.jpg',
>>>>>>> 67393c7... 搬運工/kenji
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(204,97,75,0.5)',
    },
    {
      articleId: 210,
      title: 'Podcast新手入門：',
      subtitle: '為什麼要聽、用什麼聽，以及有哪些好節目',
      description:
        '  如果你不瞭解什麼是podcast，但是很想要瞭解最近在台灣網路世界很火紅的說故事方式的話，這篇文章會告訴你什麼是podcast，想要聽的話又該怎麼入門......',
      img: '/img/IndexArticle210.jpg',
      click: '閱讀更多',
      backgroundColorStyle: 'rgba(204,75,183,0.5)',
    },
    {
      articleId: 215,
      title: 'Podcast新手入門：',
      subtitle: '為什麼要聽、用什麼聽，以及有哪些好節目',
      description:
        '  如果你不瞭解什麼是podcast，但是很想要瞭解最近在台灣網路世界很火紅的說故事方式的話，這篇文章會告訴你什麼是podcast，想要聽的話又該怎麼入門......',
      img: '/img/IndexArticle215.jpg',
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
