import {Container} from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid style={{marginTop:'5rem'}}>
        <footer class="d-flex flex-wrap justify-content-center mt-5 py-2 border-top fixed-bottom bg-light">
            <p class="text-muted">&copy; Infuse Company, Inc</p>
        </footer>
    </Container>
  );
}