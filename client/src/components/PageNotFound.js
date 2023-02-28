import {Container, Row} from 'react-bootstrap';

export default function PageNotFound() {
	return(
		<Container>
			<Row>
				 <img src='../../images/pageNotFound.gif' alt='404' className='d-block' style={{objectFit:'contain', height: '75vh', margin: 'auto'}} />
			</Row>
		</Container>
	);
}