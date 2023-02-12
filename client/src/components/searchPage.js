import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import BusCard from './busCard'

export default function SearchPage() {
  const cities = ['goa', 'delhi', 'banglore']

  return (
    <Container>
        <Row style={{border: '1px solid #ccc'}} className='my-5 p-3'>
          <Form>
            <h2 className='my-4'>Search & Book Tickets Online</h2>
            <Row>
              <Col sm={4}>
                <select class="form-select form-select-md mb-3">
                  {cities.map(city => {
                    return (
                      <option value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
                    )
                  })
                  }

                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                </Col>
                <Col sm={4}>
                  <select class="form-select form-select-md mb-3">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
                <Col sm={4}>
                  <div class='input-group' id='datetimepicker1'>
                    <input type='date' class="form-control" />
                  </div>
                </Col>
            </Row>
            <Row className='justify-content-end px-3'>
              <Button variant='primary' style={{width: '20%'}}>Search</Button>
            </Row>
          </Form>
        </Row>

        <Row>
          <Col md={3}>
            <div>
              <h3>FILTERS</h3>
              <hr/>
              <Form>
                <div className='mb-4'>
                  <h5>Bus Price</h5>
                  0<input type="range" min="1" max="100" style={{width: '88%', padding:'1rem'}} />100
                </div>
                <div className='mb-4'>
                  <h5>Bus Time</h5>
                  <select class="form-select form-select-md mb-3">
                    <option value="arrival" selected>Arrival</option>
                    <option value="departure">Departure</option>
                  </select>
                  <Form.Check type="checkbox" label="Before 6am"/>
                  <Form.Check type="checkbox" label="6am to 12pm"/>
                  <Form.Check type="checkbox" label="12pm to 6pm"/>
                  <Form.Check type="checkbox" label="After 6pm"/>
                </div>
                <div className='mb-4'>
                  <h5>Bus Types</h5>
                  <Form.Check type="checkbox" label="AC"/>
                  <Form.Check type="checkbox" label="NON-AC"/>
                </div>
                <Button variant='warning' style={{width: '100%'}} >Apply Filters</Button>
              </Form>
            </div>
          </Col>
          <Col md={9}>
            <div className='d-flex justify-content-center align-items-baseline gap-4 mb-2'>
              <span>Sort: </span>
              <select class="form-select form-select-sm mb-3">
                <option value="seat_price">Price</option>
                <option value="arrival_time">Arrival Time</option>
                <option value="departure_time">Departure Time</option>
              </select>
            </div>
            <BusCard/>
            <BusCard/>
            <BusCard/>
          </Col>
        </Row>
    </Container>
  )
}
