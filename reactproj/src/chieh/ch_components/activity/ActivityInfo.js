import React from 'react'
import { withRouter } from 'react-router-dom'
import { FaHotjar,FaMapMarkedAlt } from 'react-icons/fa'

function ActivityInfo(props) {
  return (
    <>
        <div className="activity-info">
            <h5 className="title"><FaHotjar style={{ color: '#fc774c'}}/> Podcast崛起、影片正夯 </h5>
            <p className="text-act">影音內容將為品牌帶來流量高峰，品牌如何做好影片、踏入Podcast？<br/>
                為品牌創造聲量、讓內容變現，跨足行銷新藍海！<br/>
                ➤ 從企劃到行銷，建立「影」、「音」內容的立體觀，設計互動橋段<br/>
                ➤ 定義影音架構與獨特風格，從內容吸住對的人，產生口碑擴散<br/>
                適合對象: 品牌經營者、數位行銷人、影音廣告者
            </p>
            <hr />
            <h5 className="title mt-5"><FaHotjar style={{ color: '#fc774c'}}/> 精彩課綱 </h5>
            <h6>Part 1. 10:00-12:00 #SoundOn</h6>
            <p className="text-act">引領台灣聲音風潮 ／顧立楷(SoundOn共同創辦人)<br/>
                Podcast聲音新商機 ｜品牌也可以是播客！搶下爆紅的聽覺新藍海<br/> 
                自媒體商業模式思維   <br/>                   
                品牌做好Podcast的成功要素：內容構想、節目形式、平台選擇<br/> 
                讓內容強勢上線：打開Podcast知名度的行銷方式、SEO優化等<br/>
                案例 ：#Podcast變現、#VBA地中海餐酒館、#國立故宮博物院
            </p>
            <h6>Part 2.  13:00-15:00 #台灣電通</h6>
            <p className="text-act">首席創意長／周麗君(台灣電通創意長 )<br/> 
                影音內容企劃 ｜說個好故事，心動了，世界就動了<br/> 
                訊息轉化成不落俗套的故事：品牌訊息、人性洞察 <br/> 
                勾引認同的真本事：拉出故事線、情感位移 <br/> 
                創意與影響力：對話共鳴、社群擴散<br/> 
                案例：《 施羅德投資 時間會看見 》、《 東和鋼鐵 人生地震 》
            </p>
            <h6>Part 3. 15:20-17:20 #牽猴子整合行銷</h6>
            <p className="text-act">電影行銷之王 ／王師(牽猴子整合行銷總監 )<br/> 
                影音話題行銷 ｜動態調整行銷策略，創造連續瘋傳熱潮<br/>  
                從0到1的整合行銷佈局：傳播規劃、行銷資源分配 <br/> 
                動態調整策略：結合數據分析找到突破點 <br/> 
                推動話題引起風潮：分眾溝通喚起共鳴  <br/> 
                行銷變現模式：聯合行銷、群眾募資、季節行銷、試映會 <br/> 
                案例：《初心》、《返校》、《行者》 最活耀品牌社群「全聯」、#NIKE不客氣了、#礁溪老爺《大人的任性》
            </p>
            <hr />
            <h5 className="title mt-5"><FaMapMarkedAlt style={{ color: '#fc774c'}}/> 交通資訊 </h5>
            <p className="text-act">活動地點：台北市大安區復興南路一段390號</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0049657993086!2d121.5412041507614!3d25.03390554437016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0xec12a62666a81e3d!2zMTA25Y-w5YyX5biC5aSn5a6J5Y2A5b6p6IiI5Y2X6Lev5LiA5q61Mzkw6Jmf!5e0!3m2!1szh-TW!2stw!4v1604138400418!5m2!1szh-TW!2stw" width="896" height="450" frameborder="0" style={{border:0}} allowFullscreen="false" aria-hidden="false" tabIndex="0"></iframe>
        </div>

    </>
  )
}

export default withRouter(ActivityInfo)
