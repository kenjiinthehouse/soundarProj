import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import '../jay_styles/Sidebar.scss';
import Sidebaroption from './Sidebaroption';

function SidebarMember(props) {
  return (
    // optionLink:路由的路徑
    // optionName=欄位的名稱
    // optionActive=是否在那一頁　是：true 否：false
    <>
      <div className="side-bar-container">
        <div className="side-bar-member-area">
          <div className="side-bar-member-title">
            <img
              className="sa-member-icon"
              src={require('../jay_imgs_svgs/sidebarimg/member.svg')}
            />
            會員中心
          </div>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'會員資料編輯'}
            optionActive={true}
          ></Sidebaroption>
        </div>

        <div className="side-bar-order-area">
          <div className="side-bar-order-title">
            <img
              className="sa-order-icon"
              src={require('../jay_imgs_svgs/sidebarimg/order.svg')}
            />
            查看訂單
          </div>
          <div className="side-bar-option">
            <Link to="/login" className="side-bar-option-link">
              訂單查閱
            </Link>
          </div>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'活動訂單查詢'}
            optionActive={false}
          ></Sidebaroption>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'場地租借訂單查詢'}
            optionActive={false}
          ></Sidebaroption>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'退款申請'}
            optionActive={false}
          ></Sidebaroption>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'優惠卷'}
            optionActive={false}
          ></Sidebaroption>
        </div>

        <div className="side-bar-podcaster-area">
          <div className="side-bar-podcaster-title">
            <img
              className="sa-podcaster-icon"
              src={require('../jay_imgs_svgs/sidebarimg/podcaster.svg')}
            />
            播客專區
          </div>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'頻道編輯'}
            optionActive={false}
          ></Sidebaroption>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'頻道管理'}
            optionActive={false}
          ></Sidebaroption>
          <Sidebaroption
            optionLink={'/login'}
            optionName={'數據分析'}
            optionActive={false}
          ></Sidebaroption>
        </div>

        <div className="side-bar-setting-area">
          <div className="side-bar-setting-title">
            <img
              className="sa-setting-icon"
              src={require('../jay_imgs_svgs/sidebarimg/setting.svg')}
            />
            設定
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(SidebarMember);
