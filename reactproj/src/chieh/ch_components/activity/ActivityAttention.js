import React from 'react'
import { withRouter } from 'react-router-dom'
import { RiPushpinFill } from 'react-icons/ri'


function ActivityAttention(props) {
  return (
    <>
          <div className="activity-info">
            <h5 className="title"><RiPushpinFill style={{color: ' #fc774c'}}/> 為因應新型冠狀病毒，活動現場將全面升級防疫作業標準 </h5>
            <li className="mb-3">第一線工作人員將全面配戴口罩</li>
            <li className="mb-3">活動前主辦單位將確保會場桌面、麥克風、手把等均以酒精、清潔液消毒</li>
            <li className="mb-3">課程與會者請全程戴口罩，具有慢性病及呼吸道症狀之來賓，請務必配戴口罩參加</li>
            <li >報到前請配合量額溫、酒精消毒後方可入場 (若超過37.5度，將婉拒入場)</li>

            <h5 className="title mt-5"><RiPushpinFill style={{color: ' #fc774c'}} /> 常見問題 </h5>
            <h6>Q 課程進行方式是什麼？可以互動提問嗎？</h6>
            <p className="text-act">我們是一天的講座課程，主要會以老師講授方式進行，課堂中老師會以各類案例解析應對的方法。若您有相關內容想詢問，可以於課前報名表中提出，我們會一併提供給老師做為教材與案例參考。</p>
            <h6>Q 公司請款流程會超過三天，線上報名會逾期，該怎麼辦？</h6>
            <p className="text-act">請填寫「課程登記」表單，並於付款後填寫「匯款完成」表單，即算報名成功。</p>  
            <h6>Q 課程發票我什麼時候可以收到？</h6>
            <p className="text-act">您付款完成後的兩週內，我們會將發票寄出。</p>   
            <h6>Q 付款後若臨時有行程更動，可以退費嗎？</h6>
            <p className="text-act">若無法出席課程，請於課前來電或來信告知，可為您保留名額半年，半年內若對其他課程有興趣可轉移至該堂課，限轉移乙次；如需申請退款請於課程開始日前3個工作天告知，我們將收取課程的一成費用以及銀行轉帳之手續費，逾期恕不受理。</p>       
          </div>
    </>
  )
}

export default withRouter(ActivityAttention)
