import React from 'react'

function CategoryBtn(props) {
    
    return (<>
        <button className="btn article-cate-btn text-info" onClick={props.clickMethod }>{props.category}</button>
    </>)
}

export default CategoryBtn