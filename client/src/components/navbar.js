import {Container, Button, Navbar} from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Infuse Bus Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Button variant="outline-success">LOG IN</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}