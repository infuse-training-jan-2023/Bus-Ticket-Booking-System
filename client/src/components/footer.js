import {Container} from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid className="bg-light" style={{marginTop:'5rem'}}>
        <footer class="d-flex flex-wrap justify-content-center mt-5 py-2 border-top">
            <p class="text-muted">&copy; Infuse Company, Inc</p>
        </footer>
    </Container>
  );
}