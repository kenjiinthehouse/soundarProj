import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function ArticleCarousel(props) {
  return (
    <>
      <Carousel prevIcon={false} nextIcon={false}>
        <Carousel.Item interval={2000} fade="true" slide="true">
          <div className="carousel-img">
            <img
              className="d-block"
              src="http://localhost:3000/img/article02.jpg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption>
            <h1>Podcast新手入門：為什麼要聽、用什麼聽，以及有哪些好節目</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000} fade="true" slide="true">
          <div className="carousel-img">
            <img
              className="d-block"
              src="http://localhost:3000/img/article08.jpg"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <h1>為何唱片公司要投入 Podcast？Sony 的內容策略？</h1>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
           <div className="carousel-img">
          <img
            className="d-block w-100"
            src="http://localhost:3000/img/banner.jpg"
            alt="Third slide"
          /></div>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </>
  )
}

export default ArticleCarousel
