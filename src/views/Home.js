import React from 'react'
import Header from '../templates/Header'
import Dashboard from '../components/home/Dashboard'
import ShowBlog from '../components/home/blog/ShowBlog'

const Home = ({homeRoute}) => {
  let body = (
    <div>
      {homeRoute === "dashboard" && <Dashboard />}
      {homeRoute === "blog" && <ShowBlog />}
    </div>
  )
  return (
    <div>
      <Header />
      <div className='mt-3'>
        {body}
      </div>
    </div>
  )
}

export default Home