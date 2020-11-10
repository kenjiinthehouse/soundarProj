import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function PaginationRounded() {


  return (
    <div className="d-flex">
      <Pagination count={10} shape="rounded" color="primary" className="mt-2 mb-2 mx-auto"
        onChange={()=>{}}
      />      
    </div>
  );
}
