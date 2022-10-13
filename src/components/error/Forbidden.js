import React from 'react'
import "./error.css"
const Forbidden = () => {

    return (
        <div className='body-forbidden'>
            <div className="wrapper">
                <div className="box">
                <h1 className='h1-tag'>403</h1>
                <p className='p-tag'>Sorry, it's not allowed to go beyond this point!</p>
                <p className='p-tag'><a href="/home">Please, go back this way.</a></p>
                </div>
            </div>
        </div>
    )
}

export default Forbidden