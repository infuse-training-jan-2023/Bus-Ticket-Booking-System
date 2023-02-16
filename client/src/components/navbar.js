import {Container, Button, Navbar} from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar expand="lg" className='px-2'>
      <Container fluid>
        <Navbar.Brand href="/" style={{fontWeight: '700'}}>Infuse <img src='../images/bus.png' width={60} height={60}/> Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Button variant="outline-danger">LOG IN</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}