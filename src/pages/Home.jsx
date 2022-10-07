import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Accordion, Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';

const Home = () => {
    
    const productsList = useSelector( state => state.products );
    const navigate = useNavigate();

    const [ categories, setCategories ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ searchValue, setSearchValue ] = useState("");

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then( res => setCategories( res.data.data.categories ) )
    }, [])
    
    useEffect(() => {
        setProductsFiltered( productsList );
      }, [productsList]);

    const filterCategory = categoryId => {
        const filteredCategory = productsList.filter( product => product.category.id === +categoryId );
        setProductsFiltered( filteredCategory );
    }

    const searchProducts = () => {
        const filteredSearch = productsList.filter( product => product.title.toLowerCase().includes( searchValue.toLowerCase() ) )
        setProductsFiltered( filteredSearch );
    }
    
    return (
        <div className='content-class'>
            <Row>
                <Col lg={ 3 }>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {
                                        categories.map( category => (
                                            <ListGroup.Item action key={ category.id } onClick={ () => filterCategory( category.id ) }>
                                                { category.name }
                                            </ListGroup.Item> 
                                        ) )
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search by product name"
                            onChange={ e => setSearchValue( e.target.value ) }
                            value={ searchValue }
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={ searchProducts } >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} xl={3} className="g-4">
                        {
                            productsFiltered.map( product => (
                                <Col key={ product.id }>
                                    <Card onClick={ () => navigate(`/products/${ product.id }`) } style={{ height: "100%" }} >
                                        <Card.Img className='card-imgs' variant="top" src={ product.productImgs[0] } height={ "300rem" } />
                                        <Card.Body>
                                            <Card.Title>{ product.title }</Card.Title>
                                            <Card.Text>
                                                Price: ${ product.price }
                                                <br />
                                                <Button>Go to product</Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;