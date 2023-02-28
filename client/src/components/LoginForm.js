import { useNavigate,Link, } from 'react-router-dom';
import {Button,Container,Form } from "react-bootstrap";
import { loginUser } from '../API/UserAPI';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

var email = ''
var password = ''

// validate user credentials
async function login_validation(email,password,handle_login){
    const fetchResponse = await loginUser(email,password)
    if(fetchResponse.status === 401){
        document.getElementsByClassName('login-message')[0].style.display='block'
    }
    else{
        document.getElementsByClassName('login-message')[0].style.display='none'
        const data = await fetchResponse.json()
        window.localStorage.setItem("user_id", data._id);
        window.localStorage.setItem("is_admin",data.is_admin);
        window.localStorage.setItem("emailid",data.emailid);
        handle_login()
    }
}

function get_email(e){
    email = e.target.value
    document.getElementsByClassName('login-message')[0].style.display='none'
}

function get_password(e){
    password = e.target.value
}

function LoginForm() {
    const navigate = useNavigate();
    
    const handle_login = () => navigate(-1);
    return (
        <Container>
        <div className="d-flex justify-content-center bg-light login" style={{fontSize:'1.2rem'}}>
        <Form className="p-5">
        <h2 className="p-2 my-3">Sign In</h2>
            <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label >Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={get_email}/>
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={get_password}/>
            </Form.Group>
            <Form.Label className="login-message" style={{display:'none'}}>
                Invalid Credentials
            </Form.Label>
            <Button variant="danger" type="submit" className="w-100" onClick={(e)=>{e.preventDefault();login_validation(email,password,handle_login)}}>
                Login
            </Button>
            <Form.Label className='p-3'>
                <Link to='/register'>Create a new Account?</Link>
            </Form.Label>
            </Form>
            </div>
            </Container>
     );
}

export default LoginForm;



