import React, { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedState } from '../store/slices/isLoggedIn.slice';
import CartSidebar from './CartSidebar';

const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector( state => state.isLoggedIn );
    
    const dispatchSetLoggedState = () => dispatch( setLoggedState( false ) );

    const logout = () => {
        localStorage.clear();
        dispatchSetLoggedState();
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand to="/" as={ Link }>e-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            { 
                                isLoggedIn ? 
                                    <Nav.Link onClick={ logout }>Logout</Nav.Link> 
                                :
                                    <Nav.Link to="/login" as={ Link } >Login</Nav.Link>
                            }
                            <Nav.Link to="/purchases" as={ Link }>Purchases</Nav.Link>
                            <Nav.Link onClick={ handleShow }>My Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSidebar show={ show } handleClose={ handleClose } />
        </>    
    );
};

export default NavBar;