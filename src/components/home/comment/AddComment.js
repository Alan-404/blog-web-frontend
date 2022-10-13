import React, {useEffect, useState} from 'react'
import { generateAvatarUrl } from '../../../common/lib'
import {useDispatch, useSelector} from 'react-redux'
import { addCommentAction, getAllCommentsAction } from '../../../store/entities/comment'
import { Image, Button } from 'react-bootstrap'
import swal from 'sweetalert'

const AddComment = ({blogId, user, reply, handle}) => {

    const dispatch = useDispatch()
    const style = {width: "50px", height: '50px', borderRadius:"50%"}

    const {successAddComment} = useSelector(state => state.comment.addComment)

    const [info, setInfo] = useState({
        addComment: false,
        disabledButton: true
    })

    const [commentData, setData] = useState({
        content: "",
        reply: reply,
        blogId: blogId
    }) 

    const inputComment = (bool) => {
        setInfo({
            ...info,
            addComment: bool
        })
    }

    const handleButtonSubmit = (bool) => {
        setInfo({
            ...info,
            disabledButton: bool
        })
    }

    const getInfo = (event) => {
        const value = event.target.value.trim()
        setData({
            ...commentData,
            content: value
        })
        handleButtonSubmit(!(value !== ""))
    }

    const submitAddComment = () => {
        console.log(commentData)
        dispatch(addCommentAction(commentData))
        dispatch(getAllCommentsAction(blogId))
    }


    return (
        <div className='mb-5 d-flex'>
            {user && <Image style={style} src={generateAvatarUrl(user.id)}/>}
            &#160;&#160;&#160;&#160; 
            <div className='w-100'>
            <input placeholder='Enter Comment in here...' onChange={getInfo} onFocus={() => inputComment(true)} className='input-comment' />
            {info.addComment && (
                <div className='d-flex flex-row-reverse mt-2'>
                    <Button onClick={submitAddComment} className='btn-success' disabled={info.disabledButton}>Submit</Button>
                    <Button onClick={() => inputComment(false)} className='mx-3 btn-warning'>Cancel</Button>
                </div>
            )}
            </div>
        </div>
    )
}

export default AddComment