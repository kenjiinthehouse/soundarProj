import React from 'react';
import '../styles/IndexInfo.scss';


function IndexInfo(props) {
  return (
    <>
      <div className="indexInfoPage">
        <div className="infoPagePic1">
          <img src="/k_img/InfoPic1.jpg" />
        </div>
        <div className="infoPagePic2">
          <img src="/k_img/InfoPic2.jpg" />
        </div>
        <div className="infoPageText1">
          <div className="infoPageTextBox">
            <p className="infoSubTitle">
              讓廣播<strong className="infoTitle">客製化</strong>、不間斷
            </p>
            <p className="infoParagraph">
              本Podcast平台是由一群熱血青年們所創辦，他們就像一班上族一樣熱愛於通勤時間收聽廣播，但為了解決節目時間的排定，本平台就此誕生，讓喜愛廣播的聽眾們，不再需要為時間擔心，可隨時收聽！
            </p>
          </div>
        </div>
        <div className="infoPageText2">
          <div className="infoPageTextBox">
            <p className="infoSubTitle">
              <strong className="infoTitle">聆聽</strong>他人與發現自己
            </p>
            <p className="infoParagraph">
              本平台將台灣與海外的Podcast頻道進行分類，目前擁有七大類別，與超過上百個頻道，讓您自行進行探索。各個頻道也都有屬於自己單集的討論版，還不趕緊加入參與討論！
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexInfo;
