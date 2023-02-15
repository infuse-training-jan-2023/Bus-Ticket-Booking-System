import { Container, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function NavBar() {
  const navigate = useNavigate();
  const uid = window.localStorage.getItem("user_id")
  const isadmin = window.localStorage.getItem('is_admin')

  console.log(isadmin)

  function handleLogout() {
    console.log("in logout");
    window.localStorage.clear();
    navigate('/')
  }

  return (
    <Navbar expand="lg" style={{background: '#d55457'}}>
      <Container fluid>
        <Navbar.Brand href="/">Infuse Bus Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {isadmin=='true' && 
             <Button className='mx-2' variant="dark" onClick={()=>navigate('/users')}>
             USERS
           </Button>
          }
  
          {isadmin=='true' &&
             <Button className='mx-2' variant="dark" onClick={() => navigate('/buses')}>
             BUSES
           </Button>
          }

          {uid ? (
            <Button className='mx-2' variant="dark" onClick={() => handleLogout()}>
              LOG OUT
            </Button>
          ) : (
            <Button
              variant="dark"
              onClick={() => navigate("/login")}
            >
              LOG IN
            </Button>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}