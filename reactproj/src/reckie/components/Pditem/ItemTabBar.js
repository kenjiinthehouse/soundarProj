import { CompareArrowsOutlined, MailOutlineOutlined } from '@material-ui/icons';
import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import PdComment from './PdComment';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket } from "react-icons/md";
import {Form} from 'react-bootstrap'
import Rater from 'react-rater'



function ItemTabBar(props){
  const{pdDetail,SubImg}=props
  const [pdComment,setPdComment]= useState([
    {
    average: 5,
    comment_num: 4,
    comment: [
    {
    user_name: "manager",
    avatar_url: "97da1b0c-9552-4d10-95cb-a640cf8fb400.jpg",
    date: "2020-11-01T12:50:28.000Z",
    content: "舒適度跟音質超好， 消噪耳罩耳機這款真的非常值得入手。",
    pic_url: null
    },
    {
    user_name: "michael",
    avatar_url: "deb48946-148f-475a-a772-cc6123f3a831.jpg",
    date: "2020-10-14T12:50:42.000Z",
    content: "音質比我想像中好很多，外觀也很潮很好看！推薦！",
    pic_url: null
    },
    {
    user_name: "michael",
    avatar_url: "deb48946-148f-475a-a772-cc6123f3a831.jpg",
    date: "2020-11-01T13:42:59.000Z",
    content: "買來送給男朋友，他非常喜歡！價錢合理音質又棒！大推！",
    pic_url: "pd1.jpg,pd1-2.jpg"
    },
    {
    user_name: "demo1",
    avatar_url: "4d718e7f-a64d-4165-9986-e37f9bc29185.jpg",
    date: "2020-11-01T13:48:51.000Z",
    content: "雖然很漂亮，但覺得對音質的期望太大，覺得價錢沒有符合期待",
    pic_url: "pd001.jpg,pd001-2.jpg"
    }
    ]
    }
    ])
   

  
  useEffect(()=>{
    //Sticky Tab Bar
    // document.addEventListener('DOMContentLoaded', function() {
      window.addEventListener('scroll',fixedTest);
      const fakePoint = document.querySelector('.fake-point') 
      const ItemTabBar = document.querySelector('.ItemTabBar')  
     
      function fixedTest(){
          // console.log('w',window.pageYOffset)
          // console.log('y', fakePoint.offsetTop)
          // console.log('fakePoint',fakePoint)
       let y = fakePoint.offsetTop;

          if(document.body.scrollTop >= y-64|| window.pageYOffset >= y-64){
            ItemTabBar.classList.add('tabFixed')
          }else{
            ItemTabBar.classList.remove('tabFixed')
          }   
        };

    // });

    

  },[])
   

  //Function- Tabs切換
    function handleActive(e){
        if(e.target.closest('.ItemTabBar').querySelector('.tabsAct')){
          e.target.closest('.ItemTabBar').querySelector('.tabsAct').classList.remove('tabsAct')
        }
      e.target.classList.add('tabsAct')
    }

  //Function- Tabs切換時Scroll頁面  
    function scrollToTab1(){
      const fakePoint = document.querySelector('.fake-point')
      let y = fakePoint.offsetTop
                window.scrollTo({ 
                    top: y-64, 
                    behavior: "smooth" 
                });
              }
    
    function scrollToTab2(){
      const fakePoint = document.querySelector('.fake-point')
      let y = fakePoint.offsetTop
      const contentHeight1 = document.querySelector('.contentHeight1')
      const contentHeight2 = document.querySelector('.contentHeight2')

      let contentHeight1Y = contentHeight1.offsetTop
      let contentHeight2Y = contentHeight2.offsetTop
                window.scrollTo({ 
                    top: (y+(contentHeight2Y-contentHeight1Y)-64), 
                    behavior: "smooth" 
                });
              }
    function scrollToTab3(){
      const fakePoint = document.querySelector('.fake-point')
      let y = fakePoint.offsetTop
      const contentHeight1 = document.querySelector('.contentHeight1')
      const contentHeight3 = document.querySelector('.contentHeight3')
          
      let contentHeight3Y = contentHeight3.offsetTop
      let contentHeight1Y = contentHeight1.offsetTop
              window.scrollTo({ 
              top: (y+(contentHeight3Y-contentHeight1Y)-64), 
                  behavior: "smooth" 
              });
      }

    

    //規格
      let newFeaturesArr=[]
      for(let i = 0; i< (pdDetail?JSON.parse(pdDetail.pd_features_label).length:0); i++){
        newFeaturesArr.push (pdDetail?JSON.parse(pdDetail.pd_features_label)[i]:[])
      }
      let newFeaturesValueArr=[]
      for(let i = 0; i< (pdDetail?JSON.parse(pdDetail.pd_features_value).length:0); i++){
        newFeaturesValueArr.push (pdDetail?JSON.parse(pdDetail.pd_features_value)[i]:[])
      }

    function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + '......' : str;
      }
   
    return(<>
    <div className="fake-point"></div>
    <div className="ItemTabBar d-flex justify-content-center align-items-center ">
    <div className="re-tabs tabsAct" onClick={(e)=>{handleActive(e);scrollToTab1()}}>概觀</div>
    <div className="separator"></div>
    <div className="re-tabs" onClick={(e)=>{handleActive(e);scrollToTab2();}}>規格</div>
    <div className="separator"></div>
    <div className="re-tabs" onClick={(e)=>{handleActive(e);scrollToTab3();}}>評論</div>
    </div>

    <div className="pdIntroPart" >
      <div className="container">
      <div className="contentHeight1" >
      <h2 className="light">產品介紹</h2>
      </div>
      <div className="d-flex pdIntroImgField">
        {SubImg.map((item,index)=>{
        if(index >1)return<></>
        return <img src={item.indexOf('http')=== -1 ? `/reckie_img/${item}`:item}  key={index} className="contentPics col"/>
      })}
      </div>
      <p className="light pdIntroTextSpace">{pdDetail?pdDetail.pd_info:''}</p>
      </div>
    </div>
    <div className="container">
      <h2 className="contentHeight2">規格</h2>
    <div className="d-flex">
      <table className="table table-striped" style={{textAlign:'right',width:"50%"}}>
        <tbody>
          {newFeaturesArr.map((item,index)=>{
            if(index < 9 ){
             return <tr ><th scope="row" >{truncate(item,30)}</th></tr>}
             })   
            }
        </tbody>
      </table>
      <table className="table table-striped">
        <tbody>
          {newFeaturesValueArr.map((item,index)=>{
            if (index < 9 ){
              return <tr><td>
              {truncate(item,30)}
              </td></tr>}
            }
             )}
        </tbody>
      </table>
      <div style={{width:'1rem'}}></div>
      <table className="table table-striped" style={{textAlign:'right',width:"50%"}}>
        <tbody>
          {newFeaturesArr.map((item,index)=>{
            if(index >= 9 && index < 18 ){
             return <tr><th scope="row" >{truncate(item,30)}</th></tr>}
             })   
            }
        </tbody>
      </table>

      <table className="table table-striped">
        <tbody>
          {newFeaturesValueArr.map((item,index)=>{
            if (index >= 9 && index < 18 ){
              return <tr><td nowrap="nowrap">{truncate(item,30)}</td></tr>}
            }
             )}
        </tbody>
      </table>

      
    </div>
   

      <h2 className="contentHeight3">評論</h2>

      <div className="d-flex justify-content-between">
            <div className="d-flex align-items-baseline commentStarPart justify-content-between">
                <p className="pdMainFieldStars caption">顧客好評</p>
                <Rater total={5} rating={pdDetail?pdDetail.stars:''} interactive={false} /> 
                    <p className="pdMainFieldStars caption">{pdDetail?pdDetail.stars:''}</p>
                    {/* <p className="pdMainFieldStars caption">({pdComment[0].comment_num})</p> */}
            </div>    
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control as="select" custom>
                    <option>評價由高到低</option>
                    <option>評價由低到高</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
        <div className="separateLine"></div>
        {pdComment[0].comment.map((item,index)=>{
          return <PdComment key={index} {...props} pdComment={item}/>
        })}
      
</div>
    

    </>)

}
export default withRouter(ItemTabBar)