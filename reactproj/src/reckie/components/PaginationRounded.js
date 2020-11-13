import React,{useState,useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';

function PaginationRounded(props) {
const {products,productList,page,setPage}=props
useEffect(()=>{
  console.log('productList',productList)
},[productList])


const handleChange = (event, value) => {
  setPage(value);
};
// let query = ''
// if (page) query += `&page=${page}`

  return (
    <div className="d-flex rePagination">
      <Pagination count={productList.totalPage?productList.totalPage:''} shape="rounded" page={page} color="primary" className="mt-2 mb-2 mx-auto"
        onChange={handleChange}
      />      
    </div>
  );
}
export default PaginationRounded
