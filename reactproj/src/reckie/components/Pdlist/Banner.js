import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React,{useEffect} from 'react';
import 'rc-banner-anim/assets/index.css';
import {Button} from 'react-bootstrap'

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
function Banner() {
useEffect(()=>{

},[])
  return (
    // 可加 autoPlay
       <BannerAnim className="wrap" autoPlaySpeed = {3000}>
      <Element key="aaa"
        prefixCls="banner-user-elem"
        followParallax={{
          delay: 1000,
          data: [
            { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
            { id: 'title', value: -20, type: 'x' },
            { id: 'queue', value: 50, type: 'x' },
            { id: 'JText', value: -30, type: 'x' },
          ],
        }}
      >
        <BgElement id="bg" key="bg" className="bg">
          <video loop autoPlay muted>
            <source src="Videos/production1.mp4" type="video/mp4" />
          </video>
          {/* <img src="img/bag02.jpg"></img> */}
        </BgElement>
        <div className="container">
        <QueueAnim id="queue" name="QueueAnim">
          <h1 key="h1" id="title" className="banner-slogan-title">全新上架聽見新境界。</h1>
          
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} name="TweenOne" id="JText" className="banner-slogan-span">
        <div className="d-flex align-items-center">
        <div>
        <p key="p1">主動式降噪功能</p>
        <p key="p2">可選擇更合適尺寸與密合程度</p>
        </div>
        <Button className="px-4 ml-4 re-btn-color">逛新品</Button>
        </div>
        
        </TweenOne>  
        </div>
        
      </Element>
      <Element key="bbb"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(img/bag02.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
       
        <QueueAnim name="QueueAnim">
          <h1 key="h1">Ant Motion Demo</h1>
          <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 100 }} name="TweenOne1">
          Ant Motion Demo.Ant MotionDemo
        </TweenOne>
      </Element>
      <Element key="ccc"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(img/bag03.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim name="QueueAnim">
          <h1 key="h1">Ant Motion Demo</h1>
          <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
          Ant Motion Demo.Ant Motion Demo
        </TweenOne>
      </Element>
    </BannerAnim>
   
  );
}

export default Banner
// ReactDOM.render(<Demo />, document.getElementById('__react-content'));