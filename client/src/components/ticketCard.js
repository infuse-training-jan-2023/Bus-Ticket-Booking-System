import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'
import moment from 'moment'

export default function Ticket(props) {
  const {id, bus_id, doj, ticketPrice, selectedSeats, status, set_cancel, showStatus} = props
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

  const cancelTicket = async() => {
    try {
        const response = await fetch("http://127.0.0.1:4000/ticket", {          
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({"ticket_id": id, "date": doj}),})
        const data = await response.json()
        // setCancelStatus(data)
        set_cancel(data)
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
                  <div>{bus.length > 0 && 
                    ((bus[0].arrival_time.toString().length === 3) ? '0' + bus[0].arrival_time.toString().substring(0, 1) : bus[0].arrival_time.toString().substring(0, 2)) + ':' + bus[0].arrival_time.toString().slice(-2)
                  }
                  </div>
                  <div>{bus.length > 0 && bus[0].start_city.charAt(0).toUpperCase() + bus[0].start_city.slice(1)}</div>
              </Col>
              <Col sm>
                  <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}}>{bus.length > 0 && 
                    ((bus[0].departure_time < bus[0].arrival_time) ?
                      (((Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().length === 3) ? 
                      '0' + (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().substring(0, 1) 
                      : 
                      (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().substring(0, 2)) + 'hrs ' + (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().slice(-2) + 'mins'
                    :
                    ((Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().length === 3) ? 
                      '0' + Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().substring(0, 1) 
                      : 
                      Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().substring(0, 2)) + 'hrs ' + Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().slice(-2) + 'mins'
                    )
                  }</div>
                  <div><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
              </Col>           
              <Col sm>                
                  <div>{bus.length > 0 && 
                    ((bus[0].departure_time.toString().length === 3) ? '0' + bus[0].departure_time.toString().substring(0, 1) : bus[0].departure_time.toString().substring(0, 2)) + ':' + bus[0].departure_time.toString().slice(-2)
                  }
                  </div>
                  <div>{bus.length > 0 && bus[0].destination_city.charAt(0).toUpperCase() + bus[0].destination_city.slice(1)}</div>
              </Col>
          </Row>
          <Row>
            <div className='text-muted'>
              Seats booked: {selectedSeats && selectedSeats.map(s => <span>{s} </span>)}
            </div>
          </Row>
      </Col>
      <Col className='m-2'>
          <div>Rs.{ticketPrice}</div>
          <div>
            {status && showStatus && <Button variant="danger" style={{width: '100%'}} onClick={cancelTicket}>Cancel</Button>}
            {!status && showStatus && <p className='text-danger'>Ticket is cancelled</p>}
          </div>
      </Col>
    </Row>
  </Card>
  )
}
