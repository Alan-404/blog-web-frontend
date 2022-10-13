import React, {useEffect, useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { getBlogByIdAction } from '../../../store/entities/blog';
import {useDispatch, useSelector} from 'react-redux'
import { Container } from 'react-bootstrap';
import ShowComments from '../comment/ShowComments';
import AddComment from '../comment/AddComment';

const ShowBlog = () => {

    const dispatch = useDispatch()

    const [info, setInfo] = useState({
        comments: []
    })

    const [searchParams, _] = useSearchParams();
    const {user} = useSelector(state => state.user.getUserByToken)
    const {blog, author, comments, isLoadingGetBlogById} = useSelector(state => state.blog.getBlogById)
    const {allComments} = useSelector(state => state.comment.getAllComments)

    useEffect(() => {
        const id = searchParams.get("id")
        dispatch(getBlogByIdAction(id))
    }, [])

    useEffect(() => {
        setInfo({
            ...info,
            comments: comments
        })
    }, [comments])

    useEffect(() => {
        setInfo({
            ...info,
            comments: allComments
        })
    }, [allComments])

    

    return (
        <Container>
            {(blog && comments && author) && (
                <div>
                    <h1>{blog.title}</h1>
                    <p>{author.firstName + " " + author.lastName}</p>
                    <hr />
                    <p style={{fontStyle: 'italic'}}>{blog.intro}</p>
                    <div dangerouslySetInnerHTML={{__html: blog.content}} />
                    <hr />
                    <h3 className='mb-3'>Comments</h3>
                    {user && <AddComment user={user} blogId={blog.id} reply={"000000000"} />}
                    <ShowComments comments={info.comments} blogId={blog.id} level={true}/>
                </div>
            )}
        </Container>
    )
}

export default ShowBlog