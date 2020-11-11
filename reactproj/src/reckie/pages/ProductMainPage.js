import React, { useEffect, useState } from 'react';
import Banner from '../components/Pdlist/Banner';
import SearchInput from '../components/Pdlist/SearchInput';
import TabBar from '../components/Pdlist/TabBar';
import PaginationRounded from '../components/PaginationRounded';

import { Link, withRouter } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

function ProductMainPage(props) {
  console.log('props', props);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);

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
  //查看後端抓回來的資料
// useEffect(()=>{
//   // console.log('productList',productList)
// }, [productList])

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const MainPage = (
    <>
      <Banner />
      <div className="container pd-container">
        <SearchInput />
        <TabBar
          {...props}
          products={products}
          productList={productList}
          page={page}
          setPage={setPage}
        />
        <PaginationRounded
          {...props}
          products={products}
          productList={productList}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
  const loader_css = css`
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `;
  const displaySpinner = (
    <div className="re-spinnerArea">
      <ScaleLoader
        css={loader_css}
        color={'#4A90E2'}
        height={80}
        width={10}
        margin={6}
        radius={20}
      />
    </div>
  );
  return isLoading ? displaySpinner : MainPage;
}

export default withRouter(ProductMainPage);
