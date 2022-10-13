import React, {useState} from 'react'

const Dark = () => {
    const [info, setInfo] = useState({
        click: false
    })

    const onClickHandle = () => {
        setInfo({
            ...info, 
            click: !info.click
        })
    }

    return (
        <div className='dark-overlay'></div>
    )
}

export default Dark