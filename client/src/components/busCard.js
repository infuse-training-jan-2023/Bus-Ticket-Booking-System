import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'
import { Navigate, useNavigate, Link } from "react-router-dom";
import { redirect } from "react-router-dom";

export default function BusCard(props) {
  const {id,startCity, destinationCity, seatPrice, arrivalTime, departureTime, buttonType, dateOfJourney} = props
  const duration = Math.abs(departureTime - arrivalTime).toString()
  const mins = duration.slice(-2), hrs = (duration.length === 3) ? '0' + duration.substring(0, 1) : duration.substring(0, 2)
  const aTime = ((arrivalTime.toString().length === 3) ? '0' + arrivalTime.toString().substring(0, 1) : arrivalTime.toString().substring(0, 2)) + ':' + arrivalTime.toString().slice(-2)
  const dTime = ((departureTime.toString().length === 3) ? '0' + departureTime.toString().substring(0, 1) : departureTime.toString().substring(0, 2)) + ':' + departureTime.toString().slice(-2)

  return (
        <Card
          className="mb-2 p-4 bg-light"
          style={{textAlign: 'center'}}
        >
          <Row className='justify-content-md-center align-items-center'>
            <p style={{fontWeight: 'bold'}}>{dateOfJourney}</p>
            <Col xs={8}>
                <Row>
                    <Col sm>
                        <div>{aTime}</div>
                        <div>{startCity.charAt(0).toUpperCase() + startCity.slice(1)}</div>
                    </Col>
                    <Col sm>
                        <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}>{`${hrs}hrs ${mins}mins`}</div>
                        <div><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
                    </Col>           
                    <Col sm>                
                        <div>{dTime}</div>
                        <div>{destinationCity.charAt(0).toUpperCase() + destinationCity.slice(1)}</div>
                    </Col>
                </Row>
            </Col>
            <Col className='m-2'>
                <div>Rs.{seatPrice}</div>
                <div>
                    {
                      buttonType !== '' && <Button variant="danger" as={Link}  to={`/book_ticket/${id}/${dateOfJourney}`} style={{width: '100%'}}>{buttonType}</Button>
                    }
                </div>
            </Col>
          </Row>
        </Card>
  )
}
