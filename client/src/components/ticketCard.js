import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap'
import moment from 'moment'
import '../App.css'
import { useNavigate } from 'react-router'

export default function Ticket(props) {
  const {id, bus_id, doj, ticketPrice, selectedSeats, status, set_cancel, showStatus} = props
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const day = days[new Date(doj).getDay()]
  const [bus, setBus] = useState([])
  const userId = localStorage.getItem('user_id')
  const [duration, setDuration] = useState('')
  const navigate=useNavigate()
  
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

  const findDuration = () => {    
    const duration = (bus[0].departure_time - bus[0].arrival_time) < 0 ? (bus[0].departure_time - bus[0].arrival_time + 2400) : (bus[0].departure_time - bus[0].arrival_time)    
    const mins = duration.toString().slice(-2), hrs = (duration.toString().length === 3) ? '0' + duration.toString().substring(0, 1) : duration.toString().substring(0, 2)    
    setDuration(`${hrs}hrs ${mins}mins`)  
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
        set_cancel(data)
    }  
    catch (error) {
        console.log('Error:', error);
    }
  }

  useEffect(() => {
    if (!userId) navigate("/login");
    fetchBus()
  }, [bus_id])

  useEffect(() => {
    if(bus.length > 0)
      findDuration()
  }, [bus])

  return (
    <Card
    className="mb-2 p-4 bg-light text-center"
  >
    <Row className='justify-content-md-center align-items-center'>
      <div className='d-flex gap-3 justify-content-md-center'>
        <p style={{fontWeight: 'bold'}}>Ticket Id: {id}</p>
        <p style={{fontWeight: 'bold'}}>Bus Id: {bus_id}</p>
        <p style={{fontWeight: 'bold'}}>Date of Journey: {moment(doj).format('MMM Do YYYY')}</p>
      </div>
      <Col xs={12} md={8}>
          <Row>
              <Col sm>
                  <div><span className='ticket-span'>Arrival Time: </span>
                  <span>{bus.length > 0 && 
                    ((bus[0].arrival_time.toString().length === 3) ? '0' + bus[0].arrival_time.toString().substring(0, 1) : bus[0].arrival_time.toString().substring(0, 2)) + ':' + bus[0].arrival_time.toString().slice(-2)
                  }</span>
                  </div>
                  <div><span className='ticket-span'>From: </span>
                    {bus.length > 0 && bus[0].start_city.charAt(0).toUpperCase() + bus[0].start_city.slice(1)}</div>
              </Col>
              <Col sm>
                  <div style={{fontStyle: 'italic', fontSize: '0.8rem', marginBottom: '0'}} className='duration'>
                  <span className='ticket-span'>Duration: </span>
                    {
                    // bus.length > 0 && 
                    // ((bus[0].departure_time < bus[0].arrival_time) ?
                    //   (((Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().length === 3) ? 
                    //   '0' + (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().substring(0, 1) 
                    //   : 
                    //   (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().substring(0, 2)) + 'hrs ' + (Math.abs(bus[0].departure_time - bus[0].arrival_time)+2400).toString().slice(-2) + 'mins'
                    // :
                    // ((Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().length === 3) ? 
                    //   '0' + Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().substring(0, 1) 
                    //   : 
                    //   Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().substring(0, 2)) + 'hrs ' + Math.abs(bus[0].departure_time - bus[0].arrival_time).toString().slice(-2) + 'mins'
                    // )
                    duration
                  }</div>
                  <div className='ticket-span-arrow'><img src='../../images/right-arrow.png' width={150} height={20} alt="Arrow"/></div>
              </Col>           
              <Col sm>                
                  <div>
                    <span className='ticket-span'>Departure Time: </span>
                    {bus.length > 0 && 
                    ((bus[0].departure_time.toString().length === 3) ? '0' + bus[0].departure_time.toString().substring(0, 1) : bus[0].departure_time.toString().substring(0, 2)) + ':' + bus[0].departure_time.toString().slice(-2)
                  }
                  </div>
                  <div><span className='ticket-span'>To: </span>{bus.length > 0 && bus[0].destination_city.charAt(0).toUpperCase() + bus[0].destination_city.slice(1)}</div>
              </Col>
          </Row>
          <Row>
            <div className='text-muted selected-seats'>
              Seats booked: {selectedSeats && selectedSeats.map(s => <span>{s} </span>)}
            </div>
          </Row>
      </Col>
      <Col className='m-2' sm>
          <div><span className='ticket-span'>Price: </span>Rs.{ticketPrice}</div>
          <div>
            {status && showStatus && <Button variant="danger" style={{width: '100%'}} onClick={cancelTicket}>Cancel</Button>}
            {!status && showStatus && <p className='text-danger'>Ticket is cancelled</p>}
          </div>
      </Col>
    </Row>
  </Card>
  )
}
