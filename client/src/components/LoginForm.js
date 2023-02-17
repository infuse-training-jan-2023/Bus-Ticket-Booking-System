import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

var email = "";
var password = "";

// validate user credentials
async function LoginValidation(email, password, handle_login) {
  var credentials = { emailid: String(email), password: String(password) };
  const settings = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  };
  const fetchResponse = await fetch("http://127.0.0.1:4000/login", settings);
  if (fetchResponse.status == 401) {
    document.getElementsByClassName("login-message")[0].style.display = "block";
    console.log("invalid credentials");
  } else {
    document.getElementsByClassName("login-message")[0].style.display = "none";
    const data = await fetchResponse.json();
    window.localStorage.setItem("user_id", data._id);
    window.localStorage.setItem("is_admin", data.is_admin);
    window.localStorage.setItem("emailid", data.emailid);
    handle_login();
  }
}

function GetEmail(e) {
  email = e.target.value;
  document.getElementsByClassName("login-message")[0].style.display = "none";
}
function GetPassword(e) {
  password = e.target.value;
}

function PreventDefault(e) {
  e.preventDefault();
}
function LoginForm() {
  const navigate = useNavigate();
  const HandleLogin = () => navigate(-1);
  return (
    <Container>
      <div className="d-flex justify-content-center bg-light login">
        <Form className="p-5">
          <h2 className="p-2 my-3">Sign In</h2>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={GetEmail}
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={GetPassword}
            />
          </Form.Group>
          <Form.Label className="login-message">Invalid Credentials</Form.Label>
          <Button
            variant="danger"
            type="submit"
            className="w-100"
            onClick={(e) => {
              e.PreventDefault();
              LoginValidation(email, password, HandleLogin);
            }}
          >
            Login
          </Button>
          <Form.Label className="p-3">
            <Link to="/register">Create a new Account?</Link>
          </Form.Label>
        </Form>
      </div>
    </Container>
  );
}

export default LoginForm;
