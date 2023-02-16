import { useEffect, useState } from 'react'
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Ticket from './ticketCard'

export default function Payment() {
	const {ticket_id} = useParams()

	const [ticket, setTicket] = useState({})
	const fetchATicket = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:4000/payment_success/${ticket_id}`, {method: 'GET'})
            const ticket_res = await response.json()
            setTicket(ticket_res)
            // console.log(ticket)
        }  
        catch (error) {
            console.log('Error:', error);
        }
	}

	useEffect(() => {
		fetchATicket()
	}, [])

	return (
		<Container>
			<Card border="danger" className='my-5'>
				<Card.Header as="h5" className='text-center'>Ticket</Card.Header>
				<Card.Body className='text-center'>
					<Card.Title>
						<span>Booking Successful</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle text-success" viewBox="0 0 16 16">
							<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
							<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
						</svg>
					</Card.Title>
					<div className='my-5'>
						{ticket &&
							<Ticket id={ticket._id} bus_id={ticket.bus_id} doj={ticket.date} ticketPrice={ticket.ticket_price} selectedSeats={ticket.selected_seats} showStatus={false}/>}
					</div>
					<Row className='pb-2 d-flex justify-content-center'>
						<Col>
							<Button variant="danger">Download Ticket</Button>
						</Col>
						<Col>
							<Button variant="danger" as={Link} to="/user_profile">Go to profile</Button>
						</Col>
						<Col>
							<Button variant="danger" as={Link} to="/search_bus">Book Another Ticket</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	  );
}