import {Card, Button, Container, Row, Col} from 'react-bootstrap';

export default function Payment() {
	return (
		<Container style={{position:'absolute', top: '50%', translate:'7.5% -50%'}}>
			<Card>
				<Card.Header as="h5" className='text-center'>Booking</Card.Header>
				<Card.Body className='text-center'>
					<Card.Title>
						<span className='mx-2'>Booking Successful</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle text-success" viewBox="0 0 16 16">
							<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
							<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
						</svg>
					</Card.Title>
					<Row className='pb-2'>
						<Col>
							<Button variant="primary">Check Ticket</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button variant="primary">Book Return Ticket</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	  );
}