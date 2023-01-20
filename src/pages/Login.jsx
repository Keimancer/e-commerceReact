import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedState } from '../store/slices/isLoggedIn.slice';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector( state => state.isLoggedIn )
    const dispatchSetLoggedState = () => dispatch( setLoggedState( true ) );

    const submit = data => {
        axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
            .then( res => {
                localStorage.setItem( "token", res.data.data.token );
                dispatchSetLoggedState();
                navigate("/");
            } )
            .catch( error => {
                if(error.response.status === 404){
                    alert("Invalid credentials");
                }
            })
    };

    return (
        <div className='content-class' style={{ maxWidth: "500px", margin: "0 auto" }} >
           <Form onSubmit={ handleSubmit( submit ) } >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Test email: kei@gmail.com
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        Test password: kei1234
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;