import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ArticleCarousel(props) {
  return (
    <>
      <Carousel prevIcon={false} nextIcon={false}>
        <Carousel.Item interval={2000} fade="true" slide="true">
          <div className="carousel-img">
            <img
              className="d-block"
              src="http://localhost:3000/img/article13.jpg"
              alt="Third slide"
            />
            <div className="carousel-hearder-bg"></div>
          </div>
          <Carousel.Caption>
            <h1>Podcast 產業的成長期 — 平台與創作者策略</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000} fade="true" slide="true">
          <div className="carousel-img">
            <img
              className="d-block"
              src="http://localhost:3000/img/article15.jpg"
              alt="Third slide"
            />
            <div className="carousel-hearder-bg"></div>
          </div>
          <Carousel.Caption>
            <h1>簡單無痛4步驟，立即開始自己的Podcast頻道！</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000} fade="true" slide="true">
          <div className="carousel-img">
            <img
              className="d-block"
              src="http://localhost:3000/img/article08.jpg"
              alt="First slide"
            />
            <div className="carousel-hearder-bg"></div>
          </div>
          <Carousel.Caption>
            <h1>為何唱片公司要投入 Podcast？Sony 的內容策略⁣</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default ArticleCarousel;
