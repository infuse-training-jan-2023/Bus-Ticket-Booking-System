import { useNavigate,Link } from 'react-router-dom';
import {Button,Container,Form } from "react-bootstrap";

var user = {'emailid':'','gender':'','password':'','confirm_password':'','is_admin':false}
  async function register_user(user,handle_register){

      const settings = {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(user)
    };
    if(user.password === '' || user.gender === '' || user.emailid === '') {
      document.getElementsByClassName('error-message')[0].style.display='block'
    }
    else if(user.password !== user.confirm_password){
      document.getElementsByClassName('passwords-message')[0].style.display='block'
    }
    else{
      const fetchResponse = await fetch('http://127.0.0.1:4000/register', settings);
      if(fetchResponse.status === 400){
        document.getElementsByClassName('passwords-message')[0].style.display='none'
        document.getElementsByClassName('registeration-message')[0].style.display='block'
      }
      else{
        const data = await fetchResponse.json()
        window.localStorage.setItem("user_id", data._id);
        window.localStorage.setItem("is_admin",data.is_admin);
        window.localStorage.setItem("emailid",data.emailid);
        handle_register()
      }
    }
  }



function get_email(e){
    user.emailid = e.target.value
    document.getElementsByClassName('registeration-message')[0].style.display='none'
}
function get_password(e){
    user.password = e.target.value

}
function get_confirm_password(e){
    user.confirm_password = e.target.value
}
function get_gender(e){
    user.gender = e.target.value
}

function RegistrationForm() {
    const navigate = useNavigate();
    const handle_register = () => navigate(-2);
    return (
        <Container>
        <div className="d-flex justify-content-center bg-light">

        <Form className="p-5">
        <h2 className="p-2 my-3">Register</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label >Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={get_email}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >
                    <p className='mb-0'>Gender</p>
                </Form.Label>
                <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            value="Male"
            label="Male"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
            onClick={get_gender}
          />
          <Form.Check
            inline
            value="Female"
            label="Female"
            name="group1"
            type={'radio'}
            id={`inline-radio-2`}
            onClick={get_gender}
          />
        </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={get_password}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={get_confirm_password}/>
            </Form.Group>
            <Form.Label className="registeration-message" style={{display: 'none'}}>
                User Already Exists
            </Form.Label>
            <Form.Label className="passwords-message" style={{display: 'none'}}>
                passwords do not match
            </Form.Label>
            <Form.Label className="error-message" style={{display: 'none'}}>
                Enter data in all fields
            </Form.Label>
            <Button variant="danger" type="submit" className="w-100" onClick={e=>{e.preventDefault();register_user(user,handle_register)}}>
                Register
            </Button>
            <Form.Label className='p-3'>
                <Link to='/login'>Already Have An Account?</Link>
            </Form.Label>
            </Form>
            </div>
            </Container>
     );
}

export default RegistrationForm;
