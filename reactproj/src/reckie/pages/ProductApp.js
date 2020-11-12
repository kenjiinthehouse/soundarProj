import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProductMainPage from './ProductMainPage';
import ProductItemPage from './ProductItemPage';

import ScrollToTop from '../components/ScrollToTop';
import '../styles/reckieCustom.scss';

function ProductApp() {
  //product假資料
  const [pds, setPds] = useState([
    {
      id: 1,
      pd_title: '智慧型手機用耳塞式耳機',
      pd_price: 2000,
      pd_main_pic:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-01_dx7g-gl.png',
      cate_id: 1,
    },
    {
      id: 2,
      pd_title: '智慧型手機用耳罩式耳機',
      pd_price: 2000,
      pd_main_pic:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-01_dx7g-gl.png',
      pd_sub_imgs:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-02.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-03.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-04.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-05.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-06.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-07.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-08.jpg,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-09.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-10.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-11.png,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-12.jpg,https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-13.jpg',
      cate_id: 1,
      stars: 4.8,
    },
    {
      id: 91,
      pd_title: '立體聲耳機麥克風組',
      pd_main_pic:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AT2020USBi-01.png',
      pd_price: 3000,
      cate_id: 2,
    },
    {
      id: 299,
      pd_title: '百靈果期間限定潮流T',
      pd_price: 680,
      pd_main_pic:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-01_dx7g-gl.png',
      cate_id: 3,
    },
    {
      id: 312,
      pd_title: '季節系列馬克杯',
      pd_price: 400,
      pd_main_pic:
        'https://www.audio-technica.com.tw/images/thumbnails/500/500/detailed/8/AR3BT-01_dx7g-gl.png',
      cate_id: 4,
    },
  ]);

  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);

  //從後端抓商品資料
  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5566/products/get-api?page=${page}`,
          { method: 'GET' }
        );
        const data = await response.json();
        console.log('data', data.rows);
        const newPds = data.rows;

        setProducts([...products, ...newPds]);
        setProductList(data);
    
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
  }, [page]);

  
  // 查看後端抓回來的資料
  // useEffect(()=>{
  //   console.log('productList',productList)
  // }, [productList])

  return (
    <Router>
      <ScrollToTop>
        <div className="ProductAPP-reckie">
          <Switch>
            <Route exact path="/productlist/:page?">
              <ProductMainPage/>
            </Route>
            <Route path="/product/:pd_id?">
              <ProductItemPage />
            </Route>
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default ProductApp;
