import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import '../styles/Sidebar.scss';
import Memberedit from '../components/Memberedit';

// 訂單查詢 page2
import Order from './../../ruby/ruby_components/OrderPage';

// 優惠券 page6
import Coupon from './../../ruby/ruby_components/CouponPage';

//活動訂單
import ActivityOrder from '../../chieh/ch_pages/ActivityOrder';
//錄音室訂單
import StudioOrder from '../../chieh/ch_pages/StudioOrder';
//page7
import PodcasterDashboardHome from './../../jay/jay_pages/PodcasterDashboardHome';
//page8
import PodcasterAudioList from './../../jay/jay_pages/PodcasterAudioList.js';

function Membersidebar(props) {
  const [activenumber, setActivenumber] = useState(1);

  return (
    <>
      <div className="sa-Memberedit-wrap">
        <div className="container">
          <div className="row">
            <div className="sa-Memberedit-area d-flex">
              <div className="side-bar-container col-3 pr-4">
                <div className="side-bar-member-area">
                  <div className="side-bar-member-title">
                    <img
                      className="sa-member-icon"
                      src="sa_img/side_bar/member.svg"
                    />
                    會員中心
                  </div>
                  {activenumber == 1 ? (
                    <div className="side-bar-option-active">會員資料編輯</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(1);
                      }}
                    >
                      會員資料編輯
                    </div>
                  )}
                </div>

                <div className="side-bar-order-area">
                  <div className="side-bar-order-title">
                    <img
                      className="sa-order-icon"
                      src="sa_img/side_bar/order.svg"
                    />
                    查看訂單
                  </div>
                  {activenumber == 2 ? (
                    <div className="side-bar-option-active">訂單查詢</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(2);
                      }}
                    >
                      訂單查詢
                    </div>
                  )}
                  {activenumber == 3 ? (
                    <div className="side-bar-option-active">活動訂單查詢</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(3);
                      }}
                    >
                      活動訂單查詢
                    </div>
                  )}
                  {activenumber == 4 ? (
                    <div className="side-bar-option-active">
                      場地租借訂單查詢
                    </div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(4);
                      }}
                    >
                      場地租借訂單查詢
                    </div>
                  )}
                  {/* {activenumber == 5 ? (
                    <div className="side-bar-option-active">退款申請</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(5);
                      }}
                    >
                      退款申請
                    </div>
                  )} */}
                  {activenumber == 6 ? (
                    <div className="side-bar-option-active">優惠卷</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(6);
                      }}
                    >
                      優惠卷
                    </div>
                  )}
                </div>

                <div className="side-bar-podcaster-area">
                  <div className="side-bar-podcaster-title">
                    <img
                      className="sa-podcaster-icon"
                      src="sa_img/side_bar/podcaster.svg"
                    />
                    播客專區
                  </div>
                  {activenumber == 7 ? (
                    <div className="side-bar-option-active">頻道編輯</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(7);
                      }}
                    >
                      頻道編輯
                    </div>
                  )}
                  {activenumber == 8 ? (
                    <div className="side-bar-option-active">頻道管理</div>
                  ) : (
                    <div
                      className="side-bar-option"
                      onClick={() => {
                        setActivenumber(8);
                      }}
                    >
                      頻道管理
                    </div>
                  )}
                </div>

                <div className="side-bar-setting-area">
                  <div className="side-bar-setting-title">
                    <img
                      className="sa-setting-icon"
                      src="sa_img/side_bar/setting.svg"
                    />
                    設定
                  </div>
                </div>
              </div>

              <div className="sa-sidebar-mainarea col-9">
                {activenumber == 1 ? <Memberedit></Memberedit> : <></>}
                {activenumber == 2 ? (
                  <div>
                    <Order />
                  </div>
                ) : (
                  <></>
                )}
                {activenumber == 3 ? (
                  <div>
                    <ActivityOrder />
                  </div>
                ) : (
                  <></>
                )}
                {activenumber == 4 ? (
                  <div>
                    <div>
                      <StudioOrder />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* {activenumber == 5 ? <div>5</div> : <></>} */}
                {activenumber == 6 ? (
                  <div>
                    <Coupon />
                  </div>
                ) : (
                  <></>
                )}
                {activenumber == 7 ? (
                  <PodcasterDashboardHome {...props} />
                ) : (
                  <></>
                )}
                {activenumber == 8 ? <PodcasterAudioList {...props} /> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Membersidebar);
