import {React} from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Sample() {
  return (
    <Container className='mt-2'>
        <Row className='justify-content-center align-item-center'> 
            <Col sm className='mt-2'>
                <h2 className='mb-3 display-5'>Online Ticket Booking Sytem</h2>
                <p className='text-muted lead'>Test our buses for us</p>
                <div className='mt-5'><Button as={Link} to='/search_bus' variant='danger'> Get Started </Button></div></Col>
            <Col sm className='mt-2'>
                <img className='img-fluid' src='https://img.freepik.com/free-vector/red-tourist-bus-with-open-luggage-compartment-vector-illustration_1284-46228.jpg?w=996&t=st=1676506208~exp=1676506808~hmac=4647547e090ca018978bb353cd40801a2031937c38cbcc7ec2862f8b9cd2760b'  alt='bus_image'/>
            </Col>
        </Row>
        <Row>
        <h2 className='text-center my-3'>Why choose us?</h2>
            <Row xs={1} md={4} className="justify-content-between my-5">
                <Col>
                    <Card className='border-0'>
                        <Card.Img variant="top" src="https://images.railyatri.in/ry_images_prod/Group-1031992x-1675242852.png" />
                    </Card>
                </Col>
                <Col>
                    <Card className='border-0'>
                        <Card.Img variant="top" src="https://images.railyatri.in/ry_images_prod/Group-1032002x-1675242849.png" />
                    </Card>
                </Col>
                <Col>
                    <Card className='border-0'>
                        <Card.Img variant="top" src="https://images.railyatri.in/ry_images_prod/Group-1032012x-1675242858.png" />
                    </Card>
                </Col>
            </Row>
        </Row>
        <Row className='bg-light text-center'>
            <div className='mx-auto w-75 mb-5 pt-2'>
                 <h2 style={{marginBottom: '2rem'}}>Online Bus booking on IntrCity SmartBus</h2>
                 <p className='lead'>Infuse Bus Travels is India's widest player for Bus bookings in India. We promise our bus travellers a consistent performance with the most comfortable and reliable journey experience. Here you can find the best online bus ticketing as well as exceptional onboard services. The brand operates a branded fleet of dependable buses that provide safe, secure, and punctual travel.</p>
            </div>
            <div className='mx-auto w-75 mb-5'>
                 <h2 style={{marginBottom: '2rem'}}>Bus Tickets Online</h2>
                 <p className='lead'>Infuse Bus Travels SmartBus has also become the most preferred mobile app because of its easy bus booking procedures and other in-bus branded features to help you during the trip. When you travel on a SmartBus, on-time departure and arrival are guaranteed, as is guaranteed safety with CCTV surveillance, GPS, a boarding lounge and a cleaned washroom onboard, and personalised help from the bus captain and boarding staff. Travellers can book buses online through IntrCity.com or download the user-friendly IntrCity mobile app.</p>
            </div>
            <div className='mx-auto w-75 mb-5'>
                 <h2 style={{marginBottom: '2rem'}}>Why Infuse Bus Travels for Bus Booking?</h2>
                 <p className='lead'>Infuse Bus Travels is the best and most popular smart bus ticket booking platform, offering remarkable bus travel options. The IntrCity SmartBus app and website offer an affordable and cost-efficient online travel booking service.</p>
            </div>
        </Row>
    </Container>
  )
}
