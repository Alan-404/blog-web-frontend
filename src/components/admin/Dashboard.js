import React from 'react'
import {Image, Container} from 'react-bootstrap'
import userBox from '../../assets/user-box.png'
import categoryBox from "../../assets/category-box.png"
import { useNavigate } from 'react-router-dom'
import blogBox from '../../assets/blog-box.png'

const Dashboard = () => {
  const navigate = useNavigate()
  const goCategoryPage = () => {
    navigate("category")
  }


  const goPostPage = () => {
    navigate("post")
  }

  return (
    <Container className='d-flex flex-wrap'>
      <div className='box-user d-flex w-25 mx-2 my-3'>
        <Image style={{width: "150px", height: "150px"}} src={userBox}/>
        <h1>User</h1>
      </div>
      <div onClick={goCategoryPage} className='box-user d-flex w-50 my-3'>
        <Image style={{width: "150px", height: "150px"}} src={categoryBox}/>
        <h1>Category</h1>
      </div>
      <div onClick={goPostPage} className='box-user d-flex w-50 my-3'>
        <Image style={{width: "250px", height: "150px"}} src={blogBox}/>
        <h1>Blog</h1>
      </div>
    </Container>
  )
}

export default Dashboard