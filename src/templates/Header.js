import React, {useState, useEffect} from 'react'
import {Container, Nav, NavDropdown, Navbar, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { generateAvatarUrl } from '../common/lib'
import { getUserByTokenAction } from '../store/entities/user'
import Profile from '../components/home/profile/Profile'
import { Link } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()

    const {user, role} = useSelector((state) => state.user.getUserByToken)

    const [info, setInfo] = useState({
        showProfilePage: false
    })


    const handleProfile = () => {
        setInfo({
            ...info,
            showProfilePage: !info.showProfilePage
        })
    }


    useEffect(() => {
        dispatch(getUserByTokenAction())
    }, [dispatch])

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>YOLO AI</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            {(role === true) && <Nav.Link href="/admin">Admin</Nav.Link>}
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link to="/login">Logout</Link>
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    {user && (
                        <div onClick={handleProfile} style={{cursor:'pointer'}} className='d-flex'>
                            <Image className='header-avatar' src={generateAvatarUrl(user.id)}/>
                        </div>
                    )}
                </Container>
            </Navbar>
            {info.showProfilePage && <Profile handleProfile={handleProfile} />}
        </div>
    )
}

export default Header