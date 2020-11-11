import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProductMainPage from './ProductMainPage';
import ProductItemPage from './ProductItemPage';

import ScrollToTop from '../components/ScrollToTop';
import '../styles/reckieCustom.scss';

function ProductApp() {
  

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
