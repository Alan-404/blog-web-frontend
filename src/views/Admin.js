import React, {useEffect} from 'react'
import Header from '../templates/Header'
import Dashboard from '../components/admin/Dashboard'
import { getUserByTokenAction } from '../store/entities/user'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Category from '../components/admin/Category'
import Post from '../components/admin/Post'

const Admin = ({adminRoute}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {role, successGetUserByToken} = useSelector(state => state.user.getUserByToken)

    useEffect(() => {
        dispatch(getUserByTokenAction())
    }, [dispatch])

    useEffect(() => {
        if (role === false){
            navigate({pathname: "/forbidden"})
        }
    }, [successGetUserByToken])



    let body = (
        <div>
            {adminRoute === "dashboard" && <Dashboard />}
            {adminRoute === "category" && <Category />}
            {adminRoute === "post" && <Post />}
        </div>
    )

    return (
        <div>
            <Header />
            <div className='mt-4'>
                {body}
            </div>
        </div>
    )
}

export default Admin