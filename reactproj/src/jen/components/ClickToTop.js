import './../styles/article.scss'
import React,{useState,useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { TiArrowSortedUp } from "react-icons/ti";

function ClickToTop(props) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, [])

  useEffect(() => {
    //當滾輪每滾動一次則更新一次offset值
    window.onscroll = () => {
      const clickToTopBtn = document.querySelector('.article-click-to-top')
      setOffset(window.pageYOffset)
      if (offset >= 500) {
        clickToTopBtn.style.display = 'block'
      } else {
        clickToTopBtn.style.display = 'none'
      }
    }
    // console.log('offsetUpadate',offset)
  }, [offset])


  return (
    // 回到頁首的按鈕
    <div className="article-click-to-top" onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }}>
          <TiArrowSortedUp className="icon"/>
      </div>
  )
}

export default withRouter(ClickToTop)