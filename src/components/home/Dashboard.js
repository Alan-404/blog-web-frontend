import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogsAction } from '../../store/entities/blog'
import { numBlogsShow } from '../../common/consts'
import BlogBox from './blog/BlogBox'

const Dashboard = () => {
  const dispatch = useDispatch()
  const {blogs} = useSelector(state => state.blog.getBlogs)

  const [info, setInfo] = useState({
    pageShow: 1
  })

  useEffect(() => {
    dispatch(getBlogsAction({number: numBlogsShow, page: info.pageShow}))
  }, [])

  


  return (
    <div>
        {blogs && blogs.map((item, index) => (
          <div key={item.id}>
            <BlogBox blog={item}/>
          </div>
        ))}
    </div>
  )
}

export default Dashboard