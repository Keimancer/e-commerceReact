import React, { useEffect } from 'react';
import { Button, Col, Container, ListGroup, ListGroupItem, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getCartThunk, purchaseCart } from '../store/slices/cart.slice';
import 'boxicons';

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector( state => state.cart );

    const deleteDispatch = ( id ) => {
        dispatch( deleteProduct( id ) );
    }

    useEffect(() => {
        dispatch( getCartThunk() )
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" backdrop="static">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {
                        cart.map( product => (
                            <Container key={ product.id }>
                                <Row>
                                    <Col>
                                        <ListGroup.Item className='mt-1 mb-1'>
                                            <Link to={ `/products/${ product.productsInCart.productId }` }><h3>{ product.title }</h3></Link>
                                            <h4>Quantity: { product.productsInCart.quantity }</h4>
                                            <h5>Total: ${ product.productsInCart.quantity * product.price }</h5>
                                        </ListGroup.Item>
                                    </Col>
                                    <Col className="d-flex align-items-center" sm={2}>
                                        <div style={{ cursor: "pointer" }}>
                                            <box-icon name='trash' onClick={ () => deleteDispatch( product.id ) } ></box-icon>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        ) )
                    }
                </ListGroup>
                <Button className='checkout-button' onClick={ () => dispatch( purchaseCart() ) } >Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebar;