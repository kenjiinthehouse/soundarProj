import { CompareArrowsOutlined, MailOutlineOutlined } from '@material-ui/icons';
import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import PdComment from './PdComment';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket } from "react-icons/md";
import {Form} from 'react-bootstrap'



function ItemTabBar(props){
  console.log('props',props)
  const{pdDetail,SubImg}=props
  const [products,setProducts]= useState([])


  //Sticky Tab Bar
  useEffect(()=>{
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
useEffect(()=>{},[pdDetail])

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
      <table class="table table-striped">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
      <h2 className="contentHeight3">評論</h2>

      <div className="d-flex justify-content-between">
            <div className="d-flex align-items-baseline commentStarPart justify-content-between">
                <p className="pdMainFieldStars caption">顧客好評</p>
                <div style={{color:'gold', fontSize:'1.375rem'}}>
                <MdStar/><MdStar/><MdStar/><MdStar/><MdStarHalf/>   
                </div>
                    <p className="pdMainFieldStars caption">{pdDetail?pdDetail.stars:''}</p>
                    <p className="pdMainFieldStars caption">(30)</p>
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
      <PdComment {...props}/>
      <PdComment {...props}/>
      <PdComment {...props}/>
</div>
    

    </>)

}
export default withRouter(ItemTabBar)