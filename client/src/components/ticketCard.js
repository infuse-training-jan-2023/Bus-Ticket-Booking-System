import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'
import moment from 'moment'

export default function Ticket(props) {
  const {bus_id, doj, ticketPrice, selectedSeats, status} = props
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const day = days[new Date(doj).getDay()]
  const [bus, setBus] = useState([])
  
  const fetchBus = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:4000/bus?bus_id=${bus_id}&day=${day}`, {method: 'GET'})
        const bus_res = await response.json()
        setBus(bus_res)
        console.log(bus)
    }  
    catch (error) {
        console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchBus()
  }, [bus_id])

  return (
    <Card
    className="mb-2 p-4 bg-light text-center"
  >
    <Row className='justify-content-md-center align-items-center'>
      <p style={{fontWeight: 'bold'}}>Date of Journey: {moment(doj).format('MMM Do YYYY')}</p>
      <Col xs={8}>
          <Row>
              <Col sm>
                  <div>{bus.length > 0 && bus[0].arrival_time}</div>
                  <div>{bus.length > 0 && bus[0].start_city}</div>
              </Col>
              <Col sm>
                  <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}>05hrs 10mins</div>
                  <div><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
              </Col>           
              <Col sm>                
                  <div>{bus.length > 0 && bus[0].departure_time}</div>
                  <div>{bus.length > 0 && bus[0].destination_city}</div>
              </Col>
          </Row>
          <Row>
            <div className='text-muted'>
              Seats booked: {selectedSeats.map(s => <span>{s} </span>)}
            </div>
          </Row>
      </Col>
      <Col className='m-2'>
          <div>Rs.{ticketPrice}</div>
          <div>
            {status && <Button variant="danger" style={{width: '100%'}}>Cancel</Button>}
          </div>
      </Col>
    </Row>
  </Card>
  )
}
