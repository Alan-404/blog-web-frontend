import React, { useState, useEffect } from 'react'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { loginAccountAction } from '../../store/entities/account'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {successLoginAccount} = useSelector(state => state.account.loginAccount)

  const [info, setInfo] = useState({
    submit: false
  })

  const [loginData, setData] = useState({
    email: "",
    password: ""
  })

  const getInfo = (event) => {
    setData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  } 

  const submit = () => {
    setInfo({
      ...info,
      submit: true
    })
    console.log(info.submit)
    dispatch(loginAccountAction(loginData))
  }


  useEffect(() => {
    if (successLoginAccount && info.submit == true){
      setInfo({
        ...info,
        submit: false
      })
      navigate("/home")
    }
  }, [successLoginAccount, info.submit])



  return (
    <div className='login-bg pt-5'>
        <h2 className='mb-3 text-center text-light'>YOLO AI</h2>
        <hr />
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control name="email" onChange={getInfo} type="email" placeholder="Enter email..." />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Password"
          className="mb-3"
        >
          <Form.Control name="password" onChange={getInfo} type="password" placeholder="Enter password..." />
        </FloatingLabel>
        <div className='d-flex flex-column'>
          <Link className='text-light mb-3' to="/register">Register here...</Link>
          <Button onClick={submit} variant="success">Login</Button>{' '}
        </div>
    </div>
  )
}

export default Login