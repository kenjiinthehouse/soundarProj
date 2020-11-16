import React, { useState, useEffect } from 'react';
import './../ruby_styles/CartPage.scss';
import { FaTimesCircle } from 'react-icons/fa';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import ProductAmountList from './../ruby_components/ProductAmountList';
import { Link } from 'react-router-dom';

function CartPage(props) {
  const [mycartDisplay, setMycartDisplay] = useState([]);
  const { navCartNum, setNavCartNum } = props;

  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('cart') || '[]';
    setMycartDisplay(JSON.parse(newCart));
  }

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  const emptyCart = (
    <>
      <div className="cart-page noselect">
        <div className="ru-cart-wrap mx-auto">
          <div className="ru-cart-title d-flex">
            <div className="ru-guide-block"></div>
            <div className="ru-cart-topic">
              <h4 className="ru-cart-main-font-color">我的購物車</h4>
            </div>
          </div>
          <main className="d-flex ru-cart-main w-100">
            <div className="empty-cart-display">
              <h4>您的購物車是空的！快去Shopping吧！</h4>
            </div>
          </main>
        </div>
      </div>
    </>
  );

  const display = (
    <>
      <div className="cart-page noselect mb-5">
        <div className="ru-cart-wrap mx-auto">
          <div className="ru-cart-title d-flex">
            <div className="ru-guide-block"></div>
            <div className="ru-cart-topic">
              <h4 className="ru-cart-main-font-color">我的購物車</h4>
            </div>
          </div>
          <main className="d-flex ru-cart-main">
            <section className="ru-cart-main-font-color ru-cart-section">
              <div className="ru-cart-list-intro d-flex w-100 justify-content-around">
                <div className="ru-cart-ml-12 ru-cart-intro-block">
                  商品名稱
                </div>
                <div className="ru-cart-intro-block">單價</div>
                <div className="ru-cart-intro-block">型號</div>
                <div className="ru-cart-intro-block">數量</div>
                <div className="ru-cart-intro-block">小計</div>
                <div className="ru-cart-intro-block">刪除</div>
              </div>
              {mycartDisplay.map((value) => {
                return (
                  <div
                    className="ru-cart-pd-card d-flex justify-content-around align-items-center"
                    key={value.sid}
                  >
                    <div
                      className="ru-cart-pd-img"
                      style={{ backgroundImage: `url(${value.pic_url})` }}
                    ></div>
                    <div className="ru-cart-intro-block">{value.name}</div>
                    <div className="ru-cart-intro-block">
                      {value.price
                        .toString()
                        .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}
                    </div>
                    <div className="ru-cart-intro-block">{value.spec}</div>
                    <div className="ru-cart-intro-block d-flex align-items-center justify-content-center">
                      <HiOutlineMinusCircle
                        size={32}
                        type="button"
                        style={value.count === 1 ? { color: '#B7B7B7' } : ''}
                        onClick={() => {
                          let newDisplay = mycartDisplay.map((item) => {
                            if (item.sid === value.sid) {
                              item.count > 1 ? item.count-- : (item.count = 1);
                              return item;
                            }
                            return item;
                          });
                          setMycartDisplay(newDisplay);
                          localStorage.setItem(
                            'cart',
                            JSON.stringify(newDisplay)
                          );
                        }}
                      />
                      <div className="ru-cart-pd-num">{value.count}</div>
                      <HiOutlinePlusCircle
                        size={32}
                        type="button"
                        onClick={() => {
                          let newDisplay = mycartDisplay.map((item) => {
                            if (item.sid === value.sid) {
                              item.count++;
                              return item;
                            }
                            return item;
                          });
                          setMycartDisplay(newDisplay);
                          localStorage.setItem(
                            'cart',
                            JSON.stringify(newDisplay)
                          );
                        }}
                      />
                    </div>
                    <div className="ru-cart-intro-block">
                      {(value.price * value.count)
                        .toString()
                        .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}
                    </div>
                    <div
                      className="ru-cart-intro-block ru-cart-del-btn"
                      onClick={() => {
                        let newDisplay = mycartDisplay.filter((item) => {
                          return item.sid !== value.sid;
                        });
                        setMycartDisplay(newDisplay);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify(newDisplay)
                        );
                        let newNavCartNum = navCartNum;
                        setNavCartNum(+newNavCartNum - 1);
                      }}
                    >
                      <FaTimesCircle size={24} />
                    </div>
                  </div>
                );
              })}
            </section>
            <div className="main-font-color d-flex flex-column align-items-end ru-cart-aside">
              <ProductAmountList
                {...props}
                mycartDisplay={mycartDisplay}
                setMycartDisplay={setMycartDisplay}
              />
              <Link to="/checkout" className="text-decoration-none">
                <div className="ru-cart-next-btn ml-auto d-flex align-items-center justify-content-center">
                  <div className="text-align-center ru-cart-next-btn-pay">
                    選擇付款方式
                  </div>
                  <MdNavigateNext
                    size={32}
                    style={{
                      color: '#2690DF',
                      backgroundColor: '#F8F8F8',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
  // 以資料載入的指示狀態來切換要出現的畫面
  //   return localStorage.getItem('cart') ? display : emptyCart
  if (
    !localStorage.getItem('cart') ||
    JSON.parse(localStorage.getItem('cart')).length === 0
  ) {
    return emptyCart;
  } else {
    return display;
  }
}

export default CartPage;
