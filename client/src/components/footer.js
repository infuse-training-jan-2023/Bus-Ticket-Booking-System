import {Container} from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid className='footer'  style={{background:"#d55457"}}>
        <footer class="d-flex flex-wrap justify-content-center mt-5 py-2 border-top fixed-bottom" style={{background:"#d55457"}}>
            <p class="text-muted">&copy; Infuse Company, Inc</p>
        </footer>
    </Container>
  );
}