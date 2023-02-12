import { React, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import BusCard from './busCard'

export default function SearchPage() {
  const cities = ['goa', 'banglore', 'delhi']
  const [filters, setFilters] = useState({})
  const setField = (field,  value) => {
    setFilters({...filters,[field]: value})
  }
  const [timeType, setTimeType] = useState('routine.arrival_time')
  const [earlyMorning, setEarlyMorning] = useState({})
  const [morning, setMorning] = useState({})
  const [afternoon, setAfternoon] = useState({})
  const [evening, setEvening] = useState({})
  const [busACType, setACBusType] = useState({})
  const [busNACType, setNACBusType] = useState({})

  const handleSearch = () => {
    if(!Object.keys(filters).length) {
      alert('Please fill up the fields')
      return
    }
    else if(filters["start_city"] === filters["destination_city"]) {
      alert('Start and destination city can\'t be same')
      return
    }
    else {
      const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
      let inputDate = new Date(filters["routine.day"]), currentDate = new Date()
      if(inputDate.getTime() < currentDate.getTime()) {
        alert('Invalid date selected')
        return
      }
      filters["routine.day"] = days[inputDate.getDay()]
    }
    // console.log(filters)
  }

  const applyFilters = () => {
    let filterArr = []
    const arr = [earlyMorning, morning, afternoon, evening]
    arr.forEach(element => {
      if(Object.keys(element).length) {
        let x = {}
        x[`${timeType}`] = element
        filterArr.push(x)
      }
    });

    if(Object.keys(busACType).length)
      filterArr.push(busACType)

    if(Object.keys(busNACType).length)
      filterArr.push(busNACType)

    filters["$or"] = filterArr
    console.log(filters)
  }

  return (
    <Container>
        <Row style={{border: '1px solid #ccc'}} className='my-5 p-3'>
          <Form>
            <h2 className='my-4'>Search & Book Tickets Online</h2>
            <Row>
              <Col sm={4}>
                <select class="form-select form-select-md mb-3" required onChange={e => {setField("start_city", e.target.value)}}>
                  <option>Select a city</option>
                {cities.map(city => {
                    return (
                      <option value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
                    )
                  })
                }
                </select>
                </Col>
                <Col sm={4}>
                  <select class="form-select form-select-md mb-3" required onChange={e => {setField("destination_city", e.target.value)}}>
                    <option>Select a city</option>
                  {cities.map(city => {
                    return (
                      <option value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
                    )
                  })
                  }
                  </select>
                </Col>
                <Col sm={4}>
                  <div class='input-group' id='datetimepicker1'>
                    <input type='date' class="form-control" required onChange={e => {
                      setField("routine.day", e.target.value)
                    }}/>
                  </div>
                </Col>
            </Row>
            <Row className='justify-content-end px-3'>
              <Button variant='primary' style={{width: '20%'}} onClick={handleSearch}>Search</Button>
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
                  0<input type="range" min="1" max="1000" style={{width: '80%'}} onChange={e => {setField("seat_price", {'$lte': Number(e.target.value)})}}/>1000
                </div>
                <div className='mb-4'>
                  <h5>Bus Time</h5>
                  <select class="form-select form-select-md mb-3" onChange={(e) => {setTimeType(`routine.${e.target.value}`)}}>
                    <option value="arrival_time">Arrival</option>
                    <option value="departure_time">Departure</option>
                  </select>
                  <Form.Check type="checkbox" label="Before 6am" onClick={(e) => {e.target.checked?setEarlyMorning({"$lt": 600}):setEarlyMorning({})}}/>
                  <Form.Check type="checkbox" label="6am to 12pm" onClick={(e) => {e.target.checked?setMorning({"$gte": 600, "$lt": 1200}):setMorning({})}}/>
                  <Form.Check type="checkbox" label="12pm to 6pm" onClick={(e) => {e.target.checked?setAfternoon({"$gte": 1200, "$lt": 1800}):setAfternoon({})}}/>
                  <Form.Check type="checkbox" label="After 6pm" onClick={(e) => {e.target.checked?setEvening({"$gte": 1800}):setEvening({})}}/>
                </div>
                <div className='mb-4'>
                  <h5>Bus Types</h5>
                  <Form.Check type="checkbox" label="AC" onClick={(e) => {e.target.checked?setACBusType({"bus_type": "ac"}):setACBusType('')}}/>
                  <Form.Check type="checkbox" label="NON-AC" onClick={(e) => {e.target.checked?setNACBusType({"bus_type": "non-ac"}):setNACBusType('')}}/>
                </div>
                <Button variant='warning' style={{width: '100%'}} onClick={applyFilters}>Apply Filters</Button>
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
