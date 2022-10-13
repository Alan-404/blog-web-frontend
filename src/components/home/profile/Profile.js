import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserByTokenAction} from '../../../store/entities/user'
import Dark from '../../effect/Dark'
import { Image } from 'react-bootstrap'
import { generateAvatarUrl } from '../../../common/lib'

const Profile = ({handleProfile}) => {

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.user.getUserByToken)

    const closeForm = () => {
        handleProfile()
    }

    useEffect(() => {
        dispatch(getUserByTokenAction())
    }, [])



    return (
        <div>
            <div onClick={closeForm}>
                <Dark />
            </div>
            <div className='profile-page p-4 w-25'>
                {user && (
                    <div>
                        <div className='text-center'>
                            <Image style={{width: "50px", height: "50px", borderRadius: "50%"}} src={generateAvatarUrl(user.id)}/>
                        </div>
                        <hr />
                        <h2>{user.firstName + " " + user.lastName}</h2>
                        <h4>{user.email}</h4>
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default Profile