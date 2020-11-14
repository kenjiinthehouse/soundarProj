import '../styles/reckieCustom.scss';
import React, { useEffect, useState } from 'react';
import Banner from '../components/Pdlist/Banner';
import SearchInput from '../components/Pdlist/SearchInput';
import TabBar from '../components/Pdlist/TabBar';
import PaginationRounded from '../components/PaginationRounded';

import { Link, withRouter } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

function ProductMainPage(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  //分頁
  const [page, setPage] = useState(1);
  //大項分類
  const [mainCate,setMainCate]= useState(1);
  //細項分類
  const [detailCate,setDetailCate]= useState('');
  //搜尋
  const [search,setSearch] = useState('');
  //價格範圍
  const [frontPrice,setFrontPrice]= useState ('');
  const [backPrice,setBackPrice]= useState ('');
  //排序
  const [sort,setSort]= useState ('');
  const [queryReset,setQueryReset]=useState('');


  useEffect(() => {
    const getDataFromServer = async () => {
      try { 
        let query = ''
        if(page) query += `&page=${page}`
        if(mainCate) query += `&mainCate=${mainCate}`
        if(detailCate) query += `&detailCate=${detailCate}`
        if(search) query += `&search=${search}`
        if(sort) query += `&sort=${sort}`
        if(frontPrice || backPrice) query += `&frontPrice=${frontPrice}&backPrice=${backPrice}`
        if(queryReset){ query = ''};
        const url = `http://localhost:5566/products/get-api/?${query}`
        console.log("url",url)
        const response = await fetch(
          url,{ method: 'GET' }
        );
        const data = await response.json();
        console.log('data', data.rows);
        const newPds = data.rows;

        setProducts([...newPds]);
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
  }, [page,mainCate,detailCate,search,sort,frontPrice,backPrice,queryReset]);
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
    <div className="reBgWhite">
      <Banner />
      <div className="container pd-container">
        <SearchInput
          search={search}
          setSearch={setSearch}
        />
        <TabBar
          products={products}
          productList={productList}
          page={page}
          sort={sort}
          setPage={setPage}
          mainCate={mainCate}
          setMainCate={setMainCate}
          detailCate={detailCate}
          setDetailCate={setDetailCate}
          setSearch={setSearch}
          setSort={setSort}
          setBackPrice={setBackPrice}
          setFrontPrice={setFrontPrice}
          setQueryReset={setQueryReset}
        />
        <PaginationRounded
          products={products}
          productList={productList}
          page={page}
          setPage={setPage}
        />
      </div>
      
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
