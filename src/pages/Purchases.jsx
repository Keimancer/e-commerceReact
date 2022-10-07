import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { Accordion, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector( state => state.purchases );
    const navigate = useNavigate();

    useEffect(() => {
        dispatch( getPurchasesThunk() )
    }, [])

    const dateCreated = ( createdAt ) => {
        const showDate = new Date( createdAt );
        return showDate.toLocaleDateString();
    }

    return (
        <div className='content-class'>
            <h1>Purchases</h1>
            <Accordion defaultActiveKey="0">
                {
                    purchases.map( purchase => (
                        <Accordion.Item eventKey={ purchase.cartId } key={ purchase.cartId } >
                            <Accordion.Header>{ dateCreated( purchase.createdAt ) }</Accordion.Header>
                            {
                                purchase.cart?.products.map( product => (
                                    <Accordion.Body key={ product.id } onClick={ () => navigate(`/products/${ product.productsInCart.productId }`) } >
                                        <Container><Row><Col xs={10}>{ product.title }</Col><Col>{ product.productsInCart.quantity }</Col><Col>${ product.price }</Col></Row></Container>
                                    </Accordion.Body>
                                ) )
                            }
                        </Accordion.Item>
                    ) )    
                }
            </Accordion>
        </div>
    );
};

export default Purchases;