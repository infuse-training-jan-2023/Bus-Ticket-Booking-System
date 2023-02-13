import { start } from '@popperjs/core'
import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'

export default function BusCard(props) {
  const {startCity, destinationCity, seatPrice, arrivalTime, departureTime, buttonType} = props

  return (
        <Card
          className="mb-2 p-4"
          style={{textAlign: 'center'}}
        >
          <Row className='justify-content-md-center align-items-center'>
            <Col xs={8}>
                <Row>
                    <Col sm>
                        <div>{arrivalTime}</div>
                        <div>{startCity}</div>
                    </Col>
                    <Col sm>
                        <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}>{departureTime - arrivalTime}</div>
                        <div><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
                    </Col>           
                    <Col sm>                
                        <div>{departureTime}</div>
                        <div>{destinationCity}</div>
                    </Col>
                </Row>
            </Col>
            <Col className='m-2'>
                <div>{seatPrice}</div>
                <div>
                    <Button variant="success" style={{width: '100%'}}>{buttonType}</Button>
                </div>
            </Col>
          </Row>
        </Card>
  )
}
