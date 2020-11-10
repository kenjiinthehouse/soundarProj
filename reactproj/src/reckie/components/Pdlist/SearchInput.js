import React from 'react';

function SearchInput(){

    return(<>
    <div className="row justify-content-center searchInput">
    <div className="position-relative">
    <input type="search" placeholder="    搜尋商品" className="inputField" />
    <button type="button" className="btn btn-primary searchBtn">搜尋</button>
    </div>
    
    </div>
    </>)

}
export default SearchInput