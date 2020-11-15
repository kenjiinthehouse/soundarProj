import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

function PaginationRounded(props) {
const {products,productList,page,setPage}=props
useEffect(()=>{
  console.log('productList',productList)
},[productList])

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  outlinedPrimary:{
    backgroundColor: 'red'
  }
}));

const handleChange = (event, value) => {
  setPage(value);
};
const classes = useStyles();

  return (
    <div className="d-flex rePagination">
      <Pagination count={productList.totalPage?productList.totalPage:''} shape="rounded" page={page} color="primary" className="mt-2 mb-2 mx-auto"
        onChange={handleChange}
      />      
    </div>
  );
}
export default PaginationRounded
