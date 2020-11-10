import React, { useState, useEffect } from 'react';
// 使用 ant-design布局及元件
import { Layout } from 'antd';
//react-bootstrap input
import { InputGroup, Button, FormControl } from 'react-bootstrap';
// icons
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
// ant-design Layout
const { Footer } = Layout;
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color: "#FFFFFF"
    },
  },
}));

function MyFooter(props) {
  const classes = useStyles();
  return (
    <Footer>
      <div className="subscribeArea">
        <div className="emailTitle d-flex row no-gutters justify-content-center">
          <div className="emailTitleText">訂閱 Soundar 電子報</div>
          <div className="emailSvg">
            <EmailIcon fontSize="large" />
          </div>
        </div>
        <div className="emailInput mx-auto">
          <InputGroup className="emailInputGroup">
            <FormControl placeholder="輸入email，即刻獲得最新播客內容" />
            <InputGroup.Append>
              <Button>訂閱</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
      <div className="container-fluid">
        <div className="footerBar row">
          <div className="soundarInfo col-3">
            <div className="footerLogo"></div>
            <ul className="footerUl">
              <li className={classes.root}>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <YouTubeIcon />
                </IconButton>
              </li>
              <li>台北市復興南路一段390號2樓</li>
              <li>2F,No390,Sec1,Fuxing S.Rd,Daan Dist,Taipei</li>
              <li>+(886)1234-5678</li>
            </ul>
          </div>
          <div className="footerExpo col">
            <ul>
              <li>探索</li>
              <li>頻道類別</li>
              <li>熱門排行</li>
              <li>專欄推薦</li>
              <li>最新活動</li>
            </ul>
          </div>
          <div className="footerSupPodcaster col">
            <ul>
              <li>支持播客</li>
              <li>播客周邊</li>
              <li>粉絲活動</li>
            </ul>
          </div>
          <div className="footerBePodcaster col">
            <ul>
              <li>當個播客</li>
              <li>如何開始</li>
              <li>播客 Q&A</li>
              <li>新手套組</li>
              <li>錄音設備</li>
              <li>場地租借</li>
            </ul>
          </div>
          <div className="footerPolicy col">
            <ul>
              <li>幫助與政策</li>
              <li>隱私權條款</li>
              <li>退換貨政策</li>
              <li>常見 Q&A</li>
              <li>訊息公告</li>
              <li>服務條款</li>
            </ul>
          </div>
          <div className="footerAbout col">
            <ul>
              <li>關於Soundar</li>
              <li>關於我們</li>
              <li>Soundar for Business</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footerBottom container-fluid">
        <div className="footererer row no-gutters">
          <div className="footerCopyright ml-auto mr-5">
            © 2020 Soundar. All Rights Reserved.
          </div>
          <div className="footerLanguage mr-3">
            <div className="footerLanguageSvg">
              <LanguageIcon fontSize="small" />
              繁體中文(台灣)
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default MyFooter;
