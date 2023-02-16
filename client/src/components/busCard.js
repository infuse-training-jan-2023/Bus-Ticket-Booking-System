import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../App.css' 

export default function BusCard(props) {
  const {id, startCity, destinationCity, seatPrice, arrivalTime, departureTime, buttonType, dateOfJourney, showDate} = props
  const duration = departureTime < arrivalTime ? Math.abs(departureTime - arrivalTime) + 2400 : Math.abs(departureTime - arrivalTime)
  const mins = duration.toString().slice(-2), hrs = (duration.toString().length === 3) ? '0' + duration.toString().substring(0, 1) : duration.toString().substring(0, 2)
  const aTime = ((arrivalTime.toString().length === 3) ? '0' + arrivalTime.toString().substring(0, 1) : arrivalTime.toString().substring(0, 2)) + ':' + arrivalTime.toString().slice(-2)
  const dTime = ((departureTime.toString().length === 3) ? '0' + departureTime.toString().substring(0, 1) : departureTime.toString().substring(0, 2)) + ':' + departureTime.toString().slice(-2)

  return (
        <Card
          className="mb-2 p-4 bg-light"
          style={{textAlign: 'center'}}
        >
          <Row className='justify-content-md-center align-items-center'>
            {showDate && <p style={{fontWeight: 'bold'}}>{moment(dateOfJourney).format('MMM Do YYYY')}</p>}
            <Col md={8}>
                <Row>
                    <Col sm>
                        <div><span className='ticket-span'>Arr Time: </span>{aTime}</div>
                        <div><span className='ticket-span'>To: </span>{startCity.charAt(0).toUpperCase() + startCity.slice(1)}</div>
                    </Col>
                    <Col sm>
                        <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}><span className='ticket-span'>Duration: </span>{`${hrs}hrs ${mins}mins`}</div>
                        <div className='ticket-span-arrow'><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
                    </Col>           
                    <Col sm>                
                        <div><span className='ticket-span'>Depart Time: </span>{dTime}</div>
                        <div><span className='ticket-span'>To: </span>{destinationCity.charAt(0).toUpperCase() + destinationCity.slice(1)}</div>
                    </Col>
                </Row>
            </Col>
            <Col className='m-2'>
                <div><span className='ticket-span'>Price: </span>Rs.{seatPrice}</div>
                <div>
                    {
                      buttonType === 'Book' && <Button variant="danger" as={Link} to={`/book_ticket/${id}/${dateOfJourney}`} style={{width: '100%'}}>Book</Button>
                    }
                </div>
            </Col>
          </Row>
        </Card>
  )
}
