import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'

export default function BusCard() {
  return (
        <Card
          className="mb-2"
          style={{ width: '54rem', textAlign: 'center'}}
        >
          <Row className='justify-content-md-center'>
            <Col className='justify-content-md-center'>
                <Row>
                    <Col sm>
                        <div>04:30PM</div>
                        <div>Panjim</div>
                    </Col>
                    <Col sm>
                        <div>04:30PM</div>
                        <div><img src='../../images/right-arrow.png' width={50} height={10} /></div>
                    </Col>           
                    <Col sm>                
                        <div>12:30AM</div>
                        <div>Mumbai</div>
                    </Col>
                </Row>
            </Col>
            <Col sm className='m-2'>
                <div>Rs. 1000</div>
                <div>
                    <Button variant="success">Book</Button>
                </div>
            </Col>
          </Row>
        </Card>
  )
}
