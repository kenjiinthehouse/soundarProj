import React,{useState,useEffect} from 'react'
//icons
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

function Pagination(props) {
  // const [activeOrNot, setActiveOrNot] = useState(false)

  // useEffect(() => {
  // }, [])
  // useEffect(() => {}, [activeOrNot])
  return (
    <>
      <nav aria-label="article-pagination example">
        <ul className="article-pagination d-flex justify-content-center">
          <li
            className=""
            onClick={(event) => {
              event.preventDefault()
              props.setPage(1)
            }}
          >
            <a className="" href="#" aria-label="Previous">
              <RiArrowLeftSFill />
            </a>
          </li>
          {props.articlePages.map((item, index) => {
            if (item >= 1)
              return (
                <li
                  key={index}
                  className=""
                  onClick={(event) => {
                    event.preventDefault()
                    props.setPage(`${item}`)
                  }}
                >
                  <a className="" href="#">
                    {item}
                  </a>
                </li>
              )
          })}
          <li
            className=""
            onClick={(event) => {
              event.preventDefault()
              props.setPage(props.articleTotalRows.totalPages)
            }}
          >
            <a className="" href="#" aria-label="Next">
              <RiArrowRightSFill />
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
