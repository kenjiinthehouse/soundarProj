import React from 'react'

function TagsBtn(props) {
    
    return (<>
        <button type="button" className="btn article-tags-btn text-info" onClick={() => { props.dispatch({}) }}>{props.tag}</button>
    </>)
}

export default TagsBtn