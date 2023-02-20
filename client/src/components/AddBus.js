import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {addNewBus} from '../API/BusAPI'

let id = 0

export default function AddBus() {
  const [fields, setFields] = useState({})
  const [day, setDay] = useState('')
  const [aTime, setATime] = useState('')
  const [dTime, setDTime] = useState('')  
  const [allRoutines, setAllRoutines] = useState([])

  const navigate=useNavigate()

  const addBus = () => {
    
    fields['routine'] = allRoutines.map(({day, arrival_time, departure_time}) => ({day, arrival_time, departure_time}))
    console.log(fields)
    if(Object.keys(fields).length < 4) {
        alert("Please fill all the fields")
    } 
    else if(fields.start_city === fields.destination_city) {
        alert("Start city and destination city can't be same")
    }
    else if(fields.bus_type==null){
        alert("Please select the bus Type")
    }
    else if(fields.seat_price > 3000) {
        alert("Price can't be greater than Rs.3000")
    }
    else if(fields.seat_price < 100){
        alert("Please enter correct seat price")
    }
    else if((fields.routine).length==0){
        alert("please add atleast one routine for the bus")
    }
    else{
        addBusToDB()
    }
  }

  const addBusToDB = async () => {
    const res = await addNewBus(fields)
    console.log(res)
    navigate('/manage_buses')
  };

  const addRoutine = () => {
    setDay('')
    setATime('')
    setDTime('')
    setAllRoutines([...allRoutines, {'id': id++, 'day': day, 'arrival_time': aTime, 'departure_time': dTime}])
  }

  const deleteRoutine = (idx) => {
    setAllRoutines(
        allRoutines.filter(r => r.id !== idx)
      )
  }

  useEffect(() => {
    if(!localStorage.getItem('is_admin'))
        navigate('/login')
  }, [])

  return (
    <Container>
        <h2>Add bus details</h2>
        <hr/>
        <Form className='my-3'>
            <Row className="mb-4">
                <Form.Group as={Col}>
                    <Form.Label>Start City</Form.Label>
                    <Form.Select onChange={(e) => {setFields(prev => ({...prev, 'start_city': e.target.value}))}}>
                        <option>Choose Start City</option>
                        <option value='goa'>Goa</option>
                        <option value='bangalore'>Banglore</option>
                        <option value='delhi'>Delhi</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Destination City</Form.Label>                
                    <Form.Select onChange={(e) => {setFields(prev => ({...prev, 'destination_city': e.target.value}))}}>
                        <option>Choose Destination City</option>
                        <option value='goa'>Goa</option>
                        <option value='bangalore'>Banglore</option>
                        <option value='delhi'>Delhi</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} >
                    <Form.Label>Bus Type</Form.Label> 
                    <div onChange={(e) => {setFields(prev => ({...prev, 'bus_type': e.target.value}))}}>
                        <Form.Check inline type='radio' label='AC' value='ac' name='bus-type'/>
                        <Form.Check inline type='radio' label='NON-AC' value='non-ac' name='bus-type'/>
                    </div>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Seat price</Form.Label> 
                    <Form.Control type="number" min={1} max={3000} onChange={(e) => {setFields(prev => ({...prev, 'seat_price': e.target.value}))}}/>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Label>Bus Routine</Form.Label> 
                <Col sm='auto' md={3}>
                    <Form.Group>
                        <Form.Label>Day</Form.Label>                
                        <Form.Select onChange={(e) => {setDay(e.target.value)}} value={day}>
                            <option>Choose Day</option>
                            <option value='monday'>Monday</option>
                            <option value='tuesday'>Tuesday</option>
                            <option value='wednesday'>Wednesday</option>
                            <option value='thursday'>Thursday</option>
                            <option value='friday'>Friday</option>
                            <option value='saturday'>Saturday</option>
                            <option value='sunday'>Sunday</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col sm='auto' md={3}>
                    <Form.Group>
                        <Form.Label>Arrival Time</Form.Label>
                        <input type='time' className='form-control' value={aTime} onChange={(e) => {setATime(e.target.value)}}/>
                    </Form.Group>
                </Col>

                <Col sm='auto' md={3}>
                    <Form.Group>
                        <Form.Label>Deparuture Time</Form.Label>
                        <input type='time' className='form-control' value={dTime} onChange={(e) => {setDTime(e.target.value)}}/>
                    </Form.Group>
                </Col>

                <Col sm='auto' md={3}>
                    <Form.Group>
                        <Form.Label>Add more routines</Form.Label>
                        <div>
                            <Button variant="outline-danger" onClick={() => addRoutine()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </Button>
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            {allRoutines.length > 0 && 
                <Row className="mb-4">
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Day</th>
                            <th>Arrival Time</th>
                            <th>Deparuture Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allRoutines.map((r, idx) => {
                                return (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{r.day.charAt(0).toUpperCase() + r.day.slice(1)}</td>
                                    <td>{r.arrival_time}</td>
                                    <td>{r.departure_time}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => deleteRoutine(r.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Row>
            }

            <Button variant="danger" type="submit" onClick={(e) => {e.preventDefault(); addBus()}}>
                Submit
            </Button>
        </Form>
    </Container>
  )
}
