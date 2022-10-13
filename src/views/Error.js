import React from 'react'
import Forbidden from '../components/error/Forbidden'

const Error = ({errorRoute}) => {
    let body = (
        <div>
            {errorRoute === "forbidden" && <Forbidden />}
        </div>
    )
    return (
        <div>
            {body}
        </div>
    )
}

export default Error