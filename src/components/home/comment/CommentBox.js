import React, {useState} from 'react'
import { Image, Button } from 'react-bootstrap'
import { generateAvatarUrl } from '../../../common/lib'
import AddComment from './AddComment'
import ShowComments from './ShowComments'
import { getRepliesAction } from '../../../store/entities/comment'
import { useDispatch, useSelector } from 'react-redux'

const CommentBox = ({comment, user, blogId, level}) => {
    const dispatch = useDispatch()
    const {replies} = useSelector(state => state.comment.getReplies)
    const style = {width: "50px", height: '50px', borderRadius:"50%"}
    const [info, setInfo] = useState({
        showReply: false,
        showComments: false,
        show: `${comment.numReplies} comments`
    })
    
    const handleReplyForm = () => {
        setInfo({
          ...info,
          showReply: !info.showReply
        })
    }

    const handleAllReplies = () => {
        dispatch(getRepliesAction(comment.id))
        setInfo({
            ...info,
            showComments: !info.showComments
        })
    }



    return (
        <div>
            <div className='d-flex'>
                <Image style={style} src={generateAvatarUrl(comment.user.id)}/>
                &#160;&#160;&#160;&#160; 
                <div>
                <h4 style={{marginBottom: "3px"}}>{comment.user.firstName + " " + comment.user.lastName}</h4>
                <hr style={{margin: "0"}} className='w-100'/>
                <p style={{marginBottom: "0"}}>{comment.content}</p>
                </div>
            </div>
            <div className='mx-5 mt-1'>
                <div className='d-flex'>
                    {comment.numReplies !== 0 ? (
                    <p onClick={handleAllReplies} className='text-info' style={{cursor:'pointer'}}>{info.show}</p>
                ):(
                    <div></div>
                )}
                    {level == true && <p className='mb-3 mx-3 text-warning' style={{margin:"0"}} onClick={handleReplyForm}>Reply</p>}
                </div>
                {(info.showComments && replies) && <ShowComments comments={replies} blogId={blogId}/>}
                
                {info.showReply && <AddComment blogId={blogId} user={user} reply={comment.id}/>}
            </div>
        </div>
    )
}

export default CommentBox