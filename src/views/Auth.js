import React from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'


const Auth = ({authRoute}) => {

    let body = (
        <div>
            {authRoute === "login" && <Login />}
            {authRoute === "register" && <Register />}
        </div>
    )

    return (
        <div className='auth-bg'>
            {body}
        </div>
    )
}

export default Auth