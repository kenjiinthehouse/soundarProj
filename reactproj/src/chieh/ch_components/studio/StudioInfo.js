import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'


function StudioInfo(props) {

    return (
      <>      
        <Card className="">
          <Card.Img src="http://localhost:3000/ch_img/jumbotron04.jpg" alt="Card image" />
          <Card.ImgOverlay >
            <div className="container" >
              <Card.Title><h1 style={{color: '#f8f8f8'}}>LAZI Corner</h1></Card.Title>
              <Card.Text>
                <h5 className="mb-4 mt-5">全台北最懂 podcaster 的錄音室</h5>
                <h5>這裡讓你的唇舌可以盡情發揮，優異的設備、很 Lazy 的空間，</h5>
                <h5>此外更齊聚全台熱門 Podcast 節目主持人！</h5>
                <h5>想加入 Podcast 這個大家庭，那麼這裡會是你的首選。</h5>
              </Card.Text>
            </div>            
          </Card.ImgOverlay>
        </Card>

        <div className="container studio-info">
          <h3>我們的設備</h3>
          <h5 style={{color: '#44494A'}}>不用調校，不用架，你人來就好。</h5>
          <div className="d-flex justify-content-between">
            <div className="card info-card">
              <img src={"http://localhost:3000/ch_img/audient.jpg"} className="card-img-top" alt="" />
              <div className="card-body">
                <p className="card-text">Audient iD4 錄音介面</p>
                <p className="card-text">2輸入/2輸出USB錄音介面
                    Audient麥克風前級
                    JFET DI樂器輸入
                    零延遲監聽
                    相容Windows、MacOs和iOS</p>
              </div>              
            </div>
            <div className="card info-card">
              <img src={"http://localhost:3000/ch_img/microphone.jpg"} className="card-img-top" alt="" />
              <div className="card-body">
                <p className="card-text">MXL 990 電容麥克風</p>
                <p className="card-text">心型大震模電容麥克風
                  低噪聲FET前級放大器
                  甜美的高頻與緊實的中低頻
                  適合人聲與樂器收音</p>
              </div>              
            </div>
            <div className="card info-card">
              <img src={"http://localhost:3000/ch_img/headset.jpg"} className="card-img-top" alt="" />
              <div className="card-body">
                <p className="card-text">Superlux HD681 監聽耳機</p>
                <p className="card-text">半開放式監聽耳機
                  專業品質與高性價比
                  德國網購平台熱銷第一
                  真實原因還原
                  驚人的細節解析度</p>
              </div>              
            </div>
          </div>
          <div className="d-flex felmenon justify-content-center">
            <div ><img src={"http://localhost:3000/ch_img/felmenon.png"} alt="" /></div>
            <div className="d-flex align-items-center"><p>LAZI Corner 唯一採用 日本 Felmenon吸音板，<br/>
            解決回音，提升美感。有多種款式以及顏色。</p></div>
          </div>
        </div>

        <Card className="">
          <Card.Img src="http://localhost:3000/ch_img/jumbotron05.jpg" alt="Card image" />
          <Card.ImgOverlay>
          <div className="container">
            <Card.Text>
              <h5>裝潢很 Chill，環境很 Cozy，以後都要來這裡錄音了</h5>
              <h5>- 寂寞拖延 節目主持人 Allen</h5>
            </Card.Text>
            </div>
          </Card.ImgOverlay>
        </Card>

        <div className="container studio-attention">
          <h3>注意事項</h3>
          <li>本場地目前尚未提供Wi-Fi服務。</li>
          <li>場地有專人針對錄音設備解說。</li>
          <li>本場地僅有簡易隔音設備，實際測試不影響收音品質。</li>
          <li>儲存音檔SD卡/電腦/線材需自備(SD卡建議攜帶32G以上)。</li>
          <li>以下儲存音檔設備可擇一攜帶<br/>
          　1.有Type C插孔的電腦和錄製編輯軟體(場地提供Thunderbolt 3 (USB-C)連接線可傳輸音檔至電腦）<br/>
          　2.Micro SD卡(建議攜帶32G以上)</li>
          <h3 className="mt-5">取消政策</h3>
          <p>我們明白計劃趕不上變化，你在LAZI的預定若需要更改，在使用日的七天前取消可以退款，七天至前一個工作天則可以更改預定時段一次，為了彼此的方便，也要麻煩您盡可能提早告知！另外，當台北市政府宣布停止上課，我們將會同步停止錄音室的營運，並且我們會發信告知有預定的節目呦！</p>
          <h3 className="mt-5">我們的位置</h3>
          <p>地點：台北市大安區復興南路一段390號</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0049657993086!2d121.5412041507614!3d25.03390554437016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0xec12a62666a81e3d!2zMTA25Y-w5YyX5biC5aSn5a6J5Y2A5b6p6IiI5Y2X6Lev5LiA5q61Mzkw6Jmf!5e0!3m2!1szh-TW!2stw!4v1604138400418!5m2!1szh-TW!2stw" width="896" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        
        <Card className="">
          <Card.Img src="http://localhost:3000/ch_img/jumbotron06.jpg" alt="Card image" />
          <Card.ImgOverlay>
          <div className="container">
            <Card.Title><h1 style={{color: '#f8f8f8'}}>一起 LAZI ?</h1></Card.Title>
            <Card.Text className="mt-5">
            <h5>想要成為podcast? 有錄音的需求?</h5>
            <h5>一起成為錄音夥伴</h5>
            <h5>我們的收費標準是每小時500元，趕快訂位吧。</h5>
            </Card.Text>
            </div>
          </Card.ImgOverlay>
        </Card>
      </>
    )
  }
  
  export default withRouter(StudioInfo)
  