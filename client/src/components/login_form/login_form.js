import { useNavigate,Link } from 'react-router-dom';
import {Button,Container,Form } from "react-bootstrap";
import './login_form.css'



var email = ''
var password = ''

// validate user credentials
async function login_validation(email,password,handle_login){
    var credentials = {'emailid': String(email),'password':String(password)}
    const settings = {
      method: 'POST',
      headers: {Accept: 'application/json','Content-Type': 'application/json'},
      body:JSON.stringify(credentials)
  };
  console.log(email,password)
  const fetchResponse = await fetch('http://127.0.0.1:4000/login', settings);
  if(fetchResponse.status==400){
    document.getElementsByClassName('login-message')[0].style.display='block'
    console.log('invalid credentials')
  }
  else{
    document.getElementsByClassName('login-message')[0].style.display='none'
    const data = await fetchResponse.json()
    console.log(data)
    window.localStorage.setItem("user_id", data._id);
    window.localStorage.setItem("is_admin",data.is_admin);
    window.localStorage.setItem("emailid",data.emailid);
    console.log(window.localStorage.getItem('user_id'))
    console.log(window.localStorage.getItem('is_admin'))
    console.log(window.localStorage.getItem('emailid'))
    handle_login()
  }
}


function get_email(e){
    email = e.target.value
    console.log(email)
    document.getElementsByClassName('login-message')[0].style.display='none'
}
function get_password(e){
    password = e.target.value
}

function prevent_default(e){
    e.preventDefault()
}
function Login_form() {
    const navigate = useNavigate();
    const handle_login = () => navigate('/successful_login');
    return (
        <Container>
        <div className="d-flex justify-content-center bg-light login">
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
            <Form.Label className="login-message">
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

export default Login_form;




