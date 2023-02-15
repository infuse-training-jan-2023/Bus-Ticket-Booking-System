import {Container, Button, Navbar} from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar expand="lg" style={{background: '#d55457'}}>
      <Container fluid>
        <Navbar.Brand href="/">Infuse Bus Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Button variant="outline-danger">LOG IN</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}