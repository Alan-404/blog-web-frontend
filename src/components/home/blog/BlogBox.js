import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { generateThumnailImage } from '../../../common/lib'

const BlogBox = ({blog}) => {
    const navigate = useNavigate()
    const showBlog = (id) => {
      navigate({
        pathname: '/blog',
        search: `id=${id}`
      })
    }
    return (
      <Container onClick={() => showBlog(blog.id)} className='p-3 blog-box d-flex mb-5'>
        <div>
          <Image style={{width: "150px", height: "150px"}} src={generateThumnailImage(blog.id)}/>
        </div>
        &#160;&#160;&#160;
        <div>
          <h3>{blog.title}</h3>
            <hr />
          <p>{blog.intro}</p>
        </div>
      </Container>
    )
}

export default BlogBox