import React from 'react'

import {useSelector} from 'react-redux'
import CommentBox from './CommentBox'

const ShowComments = ({comments, blogId, level}) => {

  const {user} = useSelector(state => state.user.getUserByToken)
  

  return (
    <div>
      {comments.map((item, index) => (
        <div className='mb-3' key={index}>
          <CommentBox user={user} comment={item} blogId={blogId} level={level}/>
        </div>
      ))}
    </div>
  )
}

export default ShowComments