import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'

export default function BusCard() {
  return (
        <Card
          className="mb-2 p-4"
          style={{textAlign: 'center'}}
        >
          <Row className='justify-content-md-center align-items-center'>
            <Col xs={8}>
                <Row>
                    <Col sm>
                        <div>04:30PM</div>
                        <div>Panjim</div>
                    </Col>
                    <Col sm>
                        <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}>12hrs 15mins</div>
                        <div><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
                    </Col>           
                    <Col sm>                
                        <div>12:30AM</div>
                        <div>Mumbai</div>
                    </Col>
                </Row>
            </Col>
            <Col className='m-2'>
                <div>Rs.1000</div>
                <div>
                    <Button variant="success" style={{width: '100%'}}>Book</Button>
                </div>
            </Col>
          </Row>
        </Card>
  )
}
