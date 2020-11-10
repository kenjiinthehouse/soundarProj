import React, { useEffect, useState } from 'react'
import { Link, Switch, withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../styles/Podlogin.scss'
import { initMember, initMemberAsync } from '../../actions/index'

// import googleicon from '../img/google-icon.png'

function Podlogin(props) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  const [eyes, setEyes] = useState(1)
  const [passwordstate, setPasswordstate] = useState('password')

  useEffect(() => {
    // console.log(uu.get('jwt'))
    if (!localStorage.getItem('jwt')) {
      const uu = new URLSearchParams(window.location.search)
      if (uu.get('jwt')) {
        localStorage.setItem('jwt', JSON.stringify(uu.get('jwt')))
        props.initMemberAsync()
      }
    }
    // setAccount(props.member.account)
    // setNickname(props.member.nickname)
    // props.member.nickname
  }, [])
  useEffect(() => {
    // console.log(uu.get('jwt'))
    const uu = new URLSearchParams(window.location.search)
    if (uu.get('hash')) {
      handleShow2()
    }
  }, [])

  useEffect(() => {
    if (eyes == 1) {
      setPasswordstate('password')
    } else {
      setPasswordstate('text')
    }
  }, [eyes])

  const login = async function (account, password) {
    const url = 'http://localhost:5566/member/login'
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        account: account,
        password: password,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    try {
      const response = await fetch(request)
      const data = await response.json()
      // data會是一個物件值
      // console.log(data)

      if (data.success) {
        localStorage.setItem('jwt', JSON.stringify(data.token))
        const url2 = 'http://localhost:5566/member/jwt'
        const request2 = new Request(url2, {
          method: 'POST',
          body: JSON.stringify({
            token: data.token,
          }),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        try {
          const response2 = await fetch(request2)
          const data2 = await response2.json()

          // console.log('data2', data2)

          props.initMember(data2)
        } catch (error) {}

        // props.initMember(data.token)
      } else {
        handleShow()
      }
    } catch (error) {
      //setError(error)
    }
  }

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>提醒</Modal.Title>
      </Modal.Header>
      <Modal.Body>帳號或密碼錯誤，請重新輸入</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          確定
        </Button>
        {/* <Button
          variant="primary"
          onClick={() => {
            props.history.push('/cart')
          }}
        >
          前往購物車結帳
        </Button> */}
      </Modal.Footer>
    </Modal>
  )

  const messageModal2 = (
    <Modal
      show={show2}
      onHide={handleClose2}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>驗證成功</Modal.Title>
      </Modal.Header>
      <Modal.Body>點選前往，回到首頁</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.history.push('/')
          }}
        >
          前往
        </Button>
        {/* <Button
          variant="primary"
          onClick={() => {
            props.history.push('/cart')
          }}
        >
          前往購物車結帳
        </Button> */}
      </Modal.Footer>
    </Modal>
  )

  return (
    <>
      {messageModal}
      {messageModal2}
      <div className="sa-Podlogin-wrap">
        <div className="sa-Podlogin-box-container">
          <div className="sa-Podlogin-box">
            <div className="sa-Podlogin-title">
              <p>會員登入 </p>
            </div>

            {/* <div className="sa-Podlogin-title">
              <p>{props.member.account}</p>
            </div> */}

            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">帳號(email)</label>
                <input
                  type="email"
                  className="form-control sa-Podlogin-account"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value)
                  }}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
              </div>

              <div className="form-group">
                <div className="sa-Podlogin-password-area">
                  <label htmlFor="exampleInputPassword1">密碼</label>
                  <input
                    type={passwordstate}
                    className="form-control sa-Podlogin-password"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />

                  {eyes == 1 ? (
                    <div
                      className="sa-Podlogin-eyes"
                      onClick={() => {
                        setEyes(2)
                      }}
                    >
                      <img
                        className="sa-Podlogin-eyes-img"
                        src="sa_img/password/eye.svg"
                        alt=""
                      ></img>
                    </div>
                  ) : (
                    <div
                      className="sa-Podlogin-eyes"
                      onClick={() => {
                        setEyes(1)
                      }}
                    >
                      <img
                        className="sa-Podlogin-eyes-img"
                        src="sa_img/password/invisible.svg"
                        alt=""
                      ></img>
                    </div>
                  )}
                </div>
                <div className="sa-Podlogin-forget-password">
                  <Link to="/verify" className="sa-Podlogin-registered-word">
                    忘記密碼
                  </Link>
                </div>
              </div>

              <div
                className="sa-Podlogin-login-area"
                onClick={() => {
                  login(account, password)
                }}
              >
                登入
              </div>
              <a
                href="http://localhost:5566/google/auth/google"
                className="sa-Podlogin-google-login-area-a"
              >
                <div className="sa-Podlogin-google-login-area">
                  <img
                    className="sa-Podlogin-google-icon"
                    src={'/sa_img/google-icon.png'}
                    alt=""
                  />
                  google登入
                  {/* <div className="google-icon"> </div>
                
                 */}
                </div>
              </a>

              <div className="sa-Podlogin-registered-area">
                <span>若您目前不是會員:</span>
                <span>
                  <Link
                    to="/applymember"
                    className="sa-Podlogin-registered-word"
                  >
                    註冊
                  </Link>
                </span>
              </div>

              {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (store) => {
  return { member: store.member }
}
export default withRouter(
  connect(mapStateToProps, { initMember, initMemberAsync })(Podlogin)
)
