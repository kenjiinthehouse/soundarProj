import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProductMainPage from './ProductMainPage';
import ProductItemPage from './ProductItemPage';

import ScrollToTop from '../components/ScrollToTop';
import '../styles/reckieCustom.scss';

function ProductApp() {

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
