import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'

function Searchbar(props) {
  const [value, setValue] = useState('')

  return (
    <>
      <div className="d-flex">
        <div className="article-search-wrap ">
          <input
            className="article-search-input"
            type="search"
            placeholder="Search"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />
          {props.search ? (
            <TiDelete
              className="icon-cancel"
              onClick={() => {
                props.setSearch('')
                setValue('')
              }}
            />
          ) : (
            <button
                type="submit"
                className=" article-search-btn"
                onClick={(event) => { props.setSearch(value)
                 }}>
              搜尋
            </button>
          )}

          <FaSearch className="icon" />
        </div>
      </div>
    </>
  )
}

export default Searchbar
