import React, { useEffect, useState } from 'react'
import { Link, Router, Switch, withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import {
  initMemberAsync,
  logOut,
  initMember,
  Member_nick_photo,
} from '../../actions/index'
import { connect } from 'react-redux'
import '../styles/Memberedit.scss'

function Memberedit(props) {
  const getMember = async function (sid) {
    const url = 'http://localhost:5566/member/getmember'
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        sid: sid,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('data333', data)
    const rs = data.rs
    setAccount(rs.account)
    setNickname(rs.nickname)
    setPayingmember(rs.payingmember)
    setPodcaster(rs.podcaster)

    if (rs.profile_picture) {
      if (rs.profile_picture.includes('http')) {
        let src = rs.profile_picture
        setPicture(src)
      } else {
        // let local = 'http://localhost:3000/ppicture/'
        let local = 'ppicture/'
        let src = local + rs.profile_picture
        setPicture(src)
        // console.log('data444', src)
      }
    }
    if (rs.name) {
      setRealname(rs.name)
    }
    if (rs.phone) {
      setPhonenumber(rs.phone)
    }
    if (rs.birthday) {
      setBirthday(rs.birthday)
    }
    if (rs.address) {
      setAddress(rs.address)
    }

    if (rs.gender) {
      setGender(rs.gender)
    }

    if (rs.gender == 0) {
      setGendervalue('女生')
    }
    if (rs.gender == 1) {
      setGendervalue('男生')
    }




  }

  // name nickname gender birthday phone address podcaster payingmember sid
  const updatemember = async function (payingmember, podcaster) {
    const url = 'http://localhost:5566/member/updatemember'
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        name: realname,
        nickname: nickname,
        gender: gender,
        birthday: birthday,
        phone: phonenumber,
        address: address,
        podcaster: podcaster,
        payingmember: payingmember,
        sid: props.member.sid,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    props.Member_nick_photo(props.member.sid)
    // console.log('data2', data)
    // getMember()
    getMember(props.member.sid)
  }

  const [title, settitle] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [picture, setPicture] = useState('')
  const [account, setAccount] = useState('')
  const [nickname, setNickname] = useState('')
  const [realname, setRealname] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [gendervalue, setGendervalue] = useState('尚未填寫')
  const [payingmember, setPayingmember] = useState('')
  const [podcaster, setPodcaster] = useState('')
  const [temp, setTemp] = useState('')
  const [temp2, setTemp2] = useState('')
  const [nicknametoggle, setNicknametoggle] = useState(false)
  const [realnametoggle, setRealnametoggle] = useState(false)
  const [phonenumbertoggle, setPhonenumbertoggle] = useState(false)
  const [birthdaytoggle, setBirthdaytoggle] = useState(false)
  const [addresstoggle, setAddresstoggle] = useState(false)
  const [gendertoggle, setGendertoggle] = useState(false)
  const [init, setInit] = useState(false)

  const [filename, setFilename] = useState('')
  const [filesrc, setFilesrc] = useState('')

  useEffect(() => {
    // console.log('getMember')
    getMember(props.member.sid)
  }, [props.member])

  // useEffect(() => {
  //   console.log('picture', picture)
  // }, [picture])

  // const setjwt = async function () {
  //   console.log('sid', props.member.sid)
  //   const url = 'http://localhost:5566/member/picture-jwt'
  //   const request = new Request(url, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       sid: props.member.sid,
  //     }),
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()
  //   localStorage.setItem('jwt', JSON.stringify(data.token))
  //   // console.log('jwt', JSON.stringify(data.token))
  // }

  const handleSubmit = async (e) => {
    // console.log('file', file)
    // e.preventDefault();
    //     let file = e.target.files[0];
    e.preventDefault()
    const formdata = new FormData(e.target)

    formdata.append('sid', props.member.sid)
    const url = 'http://localhost:5566/member/picture-upload'
    // fetch(url, {
    //     method: 'POST',
    //     body: formdata,
    //     // headers: {
    //     //     "Content-Type": "multipart/form-data"
    //     // }
    // }).then(response => return response.json();)
    //   .catch(error => console.log(error));

    const request = new Request(url, {
      method: 'POST',
      body: formdata,
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('data:', data)
    handleClose()
    // localStorage.removeItem('jwt')

    // setjwt()
    // props.initMemberAsync()
    props.Member_nick_photo(props.member.sid)
    getMember(props.member.sid)
    // setInit(!init)
    // window.location.reload()
    // props.initMemberAsync()
  }

  // const changeNickname = function () {
  //   localStorage.removeItem('jwt')

  //   setjwt()
  //   props.initMemberAsync()

  //   getMember(props.member.sid)

  //   // window.location.reload()
  // }

  useEffect(() => {
    props.initMemberAsync()
    getMember(props.member.sid)
  }, [init])
  const FileInput = React.useRef(null)

  const handleClick = (event) => {
    FileInput.current.click()
  }

  const handleChangeFile = (event) => {
    // console.log('i am not here')
    if (event.target.files[0]) {
      // console.log('i am here')
      let reader = new FileReader()

      let file = event.target.files[0]

      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFilesrc(reader.result)
        // console.log('i am here', reader.result)
      }
      // console.log('src', reader.result)
    }
  }
  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>上傳頭貼</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '20rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label htmlFor="exampleFormControlFile1">Example file input</label> */}
            <input
              name="avatar"
              type="file"
              className="form-control-file"
              style={{ display: 'none' }}
              onChange={(event) => {
                if (event.target.files[0].name) {
                  setFilename(event.target.files[0].name)
                  handleChangeFile(event)
                }
              }}
              ref={FileInput}
              //   id="exampleFormControlFile1"
              //   value={file}
              //   onChange={(e) => {
              //     setFile(e.target.files[0])
              //   }}
            />

            <div
              className="sa-member-picture-select-button"
              onClick={handleClick}
            >
              選擇圖檔
            </div>
            {!filename ? (
              <></>
            ) : (
              <>
                <div className="sa-Memberedit-picture">
                  <img
                    className="sa-Memberedit-picture-img"
                    // src={require({ filesrc })}
                    src={filesrc}
                    alt=""
                  ></img>
                </div>

                <div>圖片檔名為:{filename}</div>
                <button
                  className="sa-upload-button"
                  type="submit"
                  // onClick={() => {
                  //   handleClose()
                  //   getMember(props.member.sid)
                  // }}
                >
                  上傳
                </button>
              </>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose()
            setFilename('')
          }}
        >
          取消
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
          確定
        </Button> */}
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
      {/* 會員中心-會員資料 member
      查看訂單-訂單查閱 活動訂單查詢 場地租借訂單查詢 退款申請 優惠卷 order
      播客專區-編輯播客後台 podcaster
      設定 set
      #909393
   */}
      {messageModal}

      <div className="sa-Memberedit-picture-area">
        {!picture ? (
          <div className="sa-Memberedit-picture">
            <img
              className="sa-Memberedit-picture-img"
              src={'sa_img/side_bar/profile_picture.png'}
              alt=""
            ></img>
          </div>
        ) : (
          <div className="sa-Memberedit-picture">
            <img
              className="sa-Memberedit-picture-img"
              src={picture}
              alt=""
            ></img>
          </div>
        )}
        <div
          className="sa-Memberedit-picture-button"
          onClick={() => {
            handleShow()
          }}
        >
          更改頭貼
        </div>
      </div>
      <div className="sa-Memberedit-edit-area">
        <div className="sa-Memberedit-edit-account-area">
          <div className="sa-Memberedit-edit-account-title">帳號(email)</div>
          <div className="sa-Memberedit-option">{props.member.account}</div>
          {/* <td className="sa-Memberedit-bottom">
                      編輯
                    </td> */}
        </div>
        <hr className="sa-Memberedit-hr" />

        <div className="sa-Memberedit-edit-password-area">
          <div className="sa-Memberedit-edit-password-title">密碼</div>
          <div className="sa-Memberedit-option">*******</div>
          <div
            className="sa-Memberedit-bottom"
            onClick={() => {
              props.history.push('/passwordreset')
            }}
          >
            編輯
          </div>
        </div>
        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-nickname-area">
          <div className="sa-Memberedit-edit-nickname-title">暱稱</div>
          {!nicknametoggle ? (
            <>
              <div className="sa-Memberedit-option">{nickname}</div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(nickname)
                  setNicknametoggle(!nicknametoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <input
                  type="text"
                  className="form-control sa-Podlogin-account"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value)
                  }}
                />
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setNickname(temp)
                  setNicknametoggle(!nicknametoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setNicknametoggle(!nicknametoggle)
                  // changeNickname()
                  // window.location.reload()
                }}
              >
                送出
              </div>
            </>
          )}
        </div>
        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-realname-area">
          <div className="sa-Memberedit-edit-realname-title">真實姓名</div>
          {!realnametoggle ? (
            <>
              <div className="sa-Memberedit-option">
                {realname.length === 0 ? '尚未填寫' : realname}
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(realname)
                  setRealnametoggle(!realnametoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <input
                  type="text"
                  className="form-control sa-Podlogin-account"
                  value={realname}
                  onChange={(e) => {
                    setRealname(e.target.value)
                  }}
                />
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setRealname(temp)
                  setRealnametoggle(!realnametoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setRealnametoggle(!realnametoggle)
                }}
              >
                送出
              </div>
            </>
          )}
        </div>
        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-phonenumber-area">
          <div className="sa-Memberedit-edit-phonenumber-title">行動電話</div>
          {!phonenumbertoggle ? (
            <>
              <div className="sa-Memberedit-option">
                {phonenumber.length === 0 ? '尚未填寫' : phonenumber}
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(phonenumber)
                  setPhonenumbertoggle(!phonenumbertoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <input
                  type="number"
                  className="form-control sa-Podlogin-account"
                  value={phonenumber}
                  onChange={(e) => {
                    setPhonenumber(e.target.value)
                  }}
                />
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setPhonenumber(temp)
                  setPhonenumbertoggle(!phonenumbertoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setPhonenumbertoggle(!phonenumbertoggle)
                }}
              >
                送出
              </div>
            </>
          )}
        </div>
        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-birthday-area">
          <div className="sa-Memberedit-edit-birthday-title">生日</div>
          {!birthdaytoggle ? (
            <>
              <div className="sa-Memberedit-option">
                {birthday.length === 0 ? '尚未填寫' : birthday}
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(birthday)
                  setBirthdaytoggle(!birthdaytoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <input
                  type="date"
                  className="form-control sa-Podlogin-account"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value)
                  }}
                />
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setBirthday(temp)
                  setBirthdaytoggle(!birthdaytoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setBirthdaytoggle(!birthdaytoggle)
                }}
              >
                送出
              </div>
            </>
          )}
        </div>
        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-addrress-area">
          <div className="sa-Memberedit-edit-addrress-title">地址</div>
          {!addresstoggle ? (
            <>
              <div className="sa-Memberedit-option">
                {address.length === 0 ? '尚未填寫' : address}
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(address)
                  setAddresstoggle(!addresstoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <input
                  type="text"
                  className="form-control sa-Podlogin-account"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setAddress(temp)
                  setAddresstoggle(!addresstoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setAddresstoggle(!addresstoggle)
                }}
              >
                送出
              </div>
            </>
          )}
        </div>
        <hr className="sa-Memberedit-hr" />

        <div className="sa-Memberedit-edit-gender-area">
          <div className="sa-Memberedit-edit-gender-title">性別</div>
          {!gendertoggle ? (
            <>
              <div className="sa-Memberedit-option">
                {gender.length === 0 ? '尚未填寫' : gendervalue}
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setTemp(gender)
                  setTemp2(gendervalue)
                  setGendertoggle(!gendertoggle)
                }}
              >
                編輯
              </div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">
                <label className="gender-radio">
                  <input
                    type="radio"
                    value="1"
                    checked={gender === 1}
                    onChange={() => {
                      setGender(1)
                      setGendervalue('男生')
                    }}
                  />
                  男生
                </label>
                <label className="gender-radio">
                  <input
                    type="radio"
                    value="0"
                    checked={gender === 0}
                    onChange={() => {
                      setGender(0)
                      setGendervalue('女生')
                    }}
                  />
                  女生
                </label>
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  setGender(temp)
                  setGendervalue(temp2)
                  setGendertoggle(!gendertoggle)
                }}
              >
                取消
              </div>
              <div
                className="sa-Memberedit-bottom"
                onClick={() => {
                  updatemember(payingmember,podcaster)
                  setGendertoggle(!gendertoggle)
                }}
              >
                送出
              </div>
            </>
          )}
        </div>

        <hr className="sa-Memberedit-hr" />
        <div className="sa-Memberedit-edit-payingmember-area">
          <div className="sa-Memberedit-edit-payingmember-title">付費會員</div>
          {payingmember === 1 ? (
            <div className="sa-Memberedit-option">已訂閱</div>
          ) : (
            <>
              <div className="sa-Memberedit-option">一般會員</div>
              <div
                className="sa-Memberedit-bottom sa-subscription "
                onClick={() => {
                  // setPayingmember('1')
                  updatemember(1, podcaster)
                  // updatemember()
                  // setPayingmember('1')
                  // getMember()
                  // window.location.reload()
                }}
              >
                前往訂閱
              </div>
            </>
          )}

          {/* <div className="sa-Memberedit-option">一般會員</div>
                    <div className="sa-Memberedit-bottom sa-subscription ">前往訂閱</div> */}
        </div>
        <div className="sa-Memberedit-edit-podcaster-area">
          <div className="sa-Memberedit-edit-podcaster-title">podcaster</div>

          {podcaster === 1 ? (
            <>
              <div className="sa-Memberedit-option">已開通</div>
            </>
          ) : (
            <>
              <div className="sa-Memberedit-option">未開通</div>
              <div
                className="sa-Memberedit-bottom sa-open"
                onClick={() => {
                  // setPodcaster('1')
                  updatemember(payingmember, 1)
                  // updatemember()
                  // setPodcaster('1')
                  // getMember()
                  // window.location.reload()
                }}
              >
                前往開通
              </div>
            </>
          )}
          {/* <div className="sa-Memberedit-option">未開通</div>
                    <div className="sa-Memberedit-bottom sa-open">前往開通</div> */}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return { member: store.member }
}
export default withRouter(
  connect(mapStateToProps, {
    initMemberAsync,
    logOut,
    initMember,
    Member_nick_photo,
  })(Memberedit)
)
