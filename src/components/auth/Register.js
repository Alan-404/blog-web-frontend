import React, { useState } from 'react'
import {FloatingLabel, Form, Button, Image} from 'react-bootstrap'
import { registerUserAction } from '../../store/entities/user'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Register = () => {

  const dispatch = useDispatch()

  const [registerData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: false,
    avatar: ""
  })

  const [info, setInfo] = useState({
    imageShow: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_account_circle_48px-512.png'
  })

  const getInfor = (event) => {
    setData({
      ...registerData,
      [event.target.name]: event.target.value
    })
  }

  const uploadImage = (event) => {
    setData({
      ...registerData, 
      avatar: event.target.files[0]
    })

    var reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])

    reader.onload = (_event) => {
      setInfo({
        ...info,
        imageShow: reader.result
      })
    }
  }

  const submitRegister = () => {
    dispatch(registerUserAction(registerData))
  }

  return (
    <div className='pt-3 mx-3'>
      <div className='register-form p-2 '>
        <h3 className='mb-3 text-center text-light'>Hello to YOLO AI!</h3>
        <hr />
        <div className='d-flex'>
          <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3 w-50"
            >
            <Form.Control onChange={getInfor} name="firstName" type="text" placeholder="Enter first name..." />
          </FloatingLabel>
          <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3 w-50"
            >
            <Form.Control onChange={getInfor} name="lastName" type="text" placeholder="Enter last name..." />
          </FloatingLabel>
        </div>
        <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
          <Form.Control onChange={getInfor} name="email" type="email" placeholder="Enter email..." />
        </FloatingLabel>
        <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
          <Form.Control onChange={getInfor} name="password" type="password" placeholder="Enter password..." />
        </FloatingLabel>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control onChange={uploadImage} type="file"  />
        </Form.Group>
        <Image className='mb-3' style={{width: "150px", height: "150px"}} src={info.imageShow}/>
        <div className='d-flex flex-column'>
          <Link className='text-light mb-3' to="/login">login here...</Link>
          <Button onClick={submitRegister} variant="success">Register</Button>{' '}
        </div>
      </div>
    </div>
  )
}

export default Register