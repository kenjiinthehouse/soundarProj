import { BluetoothSearching } from '@material-ui/icons';
import React,{useState,useEffect} from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

function SearchInput(props){
    const {search,setSearch} = props
    const [isLoading, setIsLoading] = useState(false);
    
    const searchSubmit = (e)=>{
        setIsLoading(true);
        let searchText = e.target.closest('.searchContainer').querySelector('.reSearch')
        setSearch(searchText.value);
        setTimeout(() => {
            setIsLoading(false);
          }, 700);
    }
    

    // useEffect(() => {
       
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 800);
    //   }, [search]);

      const loader_css = css`
      display: inline-block;
      position: absolute;
      right: 11rem;
      top: 50%;
      transform: translateY(-50%);
    `;
    const displaySpinner = (
      <div>
        <ScaleLoader
          css={loader_css}
          color={'#4A90E2'}
          height={32}
          width={4}
          margin={4}
          radius={20}
        />
      </div>
    );

    return(<>
    <div className="row justify-content-center searchInput">
    <div className="searchContainer d-flex">
    <input type="text" placeholder="搜尋商品" className="reSearch" autoComplete="off" />
    {isLoading ? displaySpinner : ''} 
    <button 
    type="button" 
    className="btn re-btn-color searchBtn"
    onClick={(e)=>searchSubmit(e)}
     >搜尋</button>
    </div>
    
    </div>
    </>)

}
export default SearchInput