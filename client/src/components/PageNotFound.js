import {Container, Row} from 'react-bootstrap';

export default function PageNotFound() {
	return(
		<Container>
			<Row>
				<img src='../../images/404.jpg' alt='404' className='d-block' style={{objectFit:'contain', height: '100vh', margin: 'auto'}} />
			</Row>
		</Container>
	);
}