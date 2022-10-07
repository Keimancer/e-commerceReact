import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProductThunk } from '../store/slices/cart.slice';

const Products = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector( state => state.products );

    const [ quantity, setQuantity ] = useState(0);

    const productDetail = productsList.find( product => product.id === +id );
    const relatedProducts = productsList.filter( product => product.category.id === productDetail.category.id )
    
    useEffect(() => {
        setQuantity(0);
    }, [ id ])

    const addToCart = () => {
        const cartProduct = {
            id: id,
            quantity: quantity,    
        };
        dispatch(addProductThunk( cartProduct ));
    }

    return (
        <Row className='content-class'>
            <Col>
                <h1 className='titles'>{ productDetail?.title }</h1>
                <Carousel variant='dark'>
                    <Carousel.Item>
                        <img
                        className="d-block carousel-imgs mx-auto"
                        src={ productDetail?.productImgs[0] }
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className='container'>
                        <img
                        className="d-block carousel-imgs mx-auto"
                        src={ productDetail?.productImgs[1] }
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className='container'>
                        <img
                        className="d-block carousel-imgs mx-auto"
                        src={ productDetail?.productImgs[2] }
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <Container className="d-flex justify-content-center align-items-center mt-5">
                    <Button className="me-4" onClick={ quantity > 0 ? (() => setQuantity( quantity-1 )) : undefined } >-</Button>
                    { quantity }
                    <Button className="ms-4" onClick={ () => setQuantity( quantity+1 ) } >+</Button>
                </Container>
                <Container className="d-flex justify-content-center">
                    <Button className="me-2 ms-2 mt-2 mb-5 d-flex justify-content-center" onClick={ addToCart } >Add to Cart</Button>
                </Container>
                <hr />
                <p>{ productDetail?.description }</p>
            </Col>
            <Col lg={ 3 }>
                <h4>Discover similar items</h4>
                {
                    relatedProducts.map( product => (
                        <Card style={{ width: '18rem' }} key={ product.id }>
                            <Card.Img className='card-imgs' variant="top" src={ product.productImgs[0] } style={{ height: "15rem" }} />
                            <Card.Body>
                                <Card.Title>{ product.title }</Card.Title>
                                <Card.Text>${ product.price }</Card.Text>
                                <Button variant="primary" to={ `/products/${ product.id }`} as={ Link } >Go to product</Button>
                            </Card.Body>
                        </Card>
                    ) )
                }
            </Col>
        </Row>
    );
};

export default Products;