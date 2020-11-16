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
            <source src="reckie_Videos/production1.mp4" type="video/mp4" />
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
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(reckie_img/bag02.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container">
      <QueueAnim id="queue" name="QueueAnim">
          <h1 key="h1" id="title" className="banner-slogan2 banner-slogan-title2">慶祝收聽人數破百萬！！</h1>
          
        </QueueAnim>
        
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} name="TweenOne" id="JText" className="banner-slogan-span2">
        <div className="d-flex align-items-center">
        <div>
        <p key="p1">限量紀念文青帆布包</p>
        <p key="p2">1000個</p>
        </div>
        <Button className="px-4 ml-4 re-btn-color">去逛逛</Button>
        </div>
        
        </TweenOne>  
       
        </div>
       
      </Element>
      <Element key="ccc"
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
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(reckie_img/bag03.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container">
         <QueueAnim id="queue" name="QueueAnim">
          <h1 key="h1" id="title" className="banner-slogan-title">達成五千訂閱紀念包！</h1>
          
        </QueueAnim>
        
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} name="TweenOne" id="JText" className="banner-slogan-span">
        <div className="d-flex align-items-center">
        <div>
        <p key="p1">熱賣中</p>
        <p key="p2">商品數量有限，賣完不再補貨！</p>
        </div>
        <Button className="px-4 ml-4 re-btn-color">逛新品</Button>
        </div>
        
        </TweenOne>  
       
        </div>
      
      </Element>
    </BannerAnim>
   
  );
}

export default Banner
// ReactDOM.render(<Demo />, document.getElementById('__react-content'));