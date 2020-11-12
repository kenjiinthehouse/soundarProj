import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Breadcrumb(props) {
  console.log(props)

  let path = ''
  const pathname = props.location.pathname
  switch (pathname) {
    case '/activityinfo':
      path = '活動內容'
      break

    case '/activityattention':
      path = '活動注意事項'
      break

    case '/activityoption':
      path = '活動方案票價'
      break

    default:
      path = ''
  }

  return (
    <>
    <div className="chieh-breadcrumb">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-white">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {path}
          </li>
        </ol>
      </nav>
    </div>
      
    </>
  )
}

export default withRouter(Breadcrumb)
