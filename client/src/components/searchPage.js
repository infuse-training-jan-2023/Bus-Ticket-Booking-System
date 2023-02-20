import { React, useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import BusCard from './BusCard'

export default function SearchPage() {
  const cities = ['goa', 'bangalore', 'delhi']
  const [filters, setFilters] = useState({})
  const setField = (field,  value) => {
    setFilters({...filters,[field]: value})
  }
  const [timeType, setTimeType] = useState('routine.arrival_time')
  const [earlyMorning, setEarlyMorning] = useState(false)
  const [morning, setMorning] = useState(false)
  const [afternoon, setAfternoon] = useState(false)
  const [evening, setEvening] = useState(false)
  const [busACType, setACBusType] = useState(false)
  const [busNACType, setNACBusType] = useState(false)
  const [buses, setBuses] = useState([])
  const [search, setSearch] = useState(0)
  const [addFilter, setAddFilter] = useState(0)
  const [priceLimit, setPriceLimit] = useState(3000)
  const [loading, setLoading] = useState(false)
  const [sortValue, setSortValue] = useState('seat_price')
  const [doj, setDOJ] = useState('')

  const timeQuery = [
    {
      'routine.arrival_time': {'$gt': 0, '$lte': 600}
    },
    {
      'routine.arrival_time': {'$gt': 600, '$lte': 1200}
    },
    {
      'routine.arrival_time': {'$gt': 1200, '$lte': 1800}
    },
    {
      'routine.arrival_time': {'$gt': 1800}
    },
    {
      'routine.departure_time': {'$gt': 0, 'lte': 600}
    },
    {
      'routine.departure_time': {'$gt': 600, '$lte': 1200}
    },
    {
      'routine.departure_time': {'$gt': 1200, '$lte': 1800}
    },
    {
      'routine.departure_time': {'$gt': 1800}
    }
  ]

  const typeFilter = [
    {"bus_type": "ac"},
    {"bus_type": "non-ac"}
  ]

  const handleFilterQueries = () => {
    let timeFilterArr = []
    if(timeType == 'routine.arrival_time') {
      if(earlyMorning) {
        timeFilterArr.push(timeQuery[0])
      }
      if(morning) {
        timeFilterArr.push(timeQuery[1])
      }
      if(afternoon) {
        timeFilterArr.push(timeQuery[2])
      }
      if(evening) {
        timeFilterArr.push(timeQuery[3])
      }
    }
    else {
      if(earlyMorning) {
        timeFilterArr.push(timeQuery[4])
      }
      if(morning) {
        timeFilterArr.push(timeQuery[5])
      }
      if(afternoon) {
        timeFilterArr.push(timeQuery[6])
      }
      if(evening) {
        timeFilterArr.push(timeQuery[7])
      }      
    }

    return timeFilterArr
  }

  const handleTypeQueries = () => {
    let filterArr = []
    if(busACType)
      filterArr.push(typeFilter[0])

    if(busNACType)
      filterArr.push(typeFilter[1])

    return filterArr
  }

  const applyFilters = () => {
    let x = []

    x.push({
      "routine.day": filters["routine.day"]
    })

    x.push({
      "seat_price": {'$lte': Number(priceLimit)}
    })

    if(handleTypeQueries().length > 0) {
      x.push({
        "$or": handleTypeQueries()
      })
    }

    if(handleFilterQueries().length > 0) {
      x.push({
        "$or": handleFilterQueries()
      })
    }


    filters["$and"] = x 
    setAddFilter(Math.floor((Math.random() * 1000) + 1))
  }
  
  const handleSearch = () => {
    if(Object.keys(filters).length < 3) {
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
      setDOJ(filters["routine.day"])
      filters["routine.day"] = days[inputDate.getDay()]
    }
    setSearch(Math.floor((Math.random() * 1000) + 1))
  }


  const fetchBus = async() => {
      try {
        const response = await fetch('http://127.0.0.1:4000/bus_search', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(filters),
        })
        const bus_res = await response.json()
        setBuses(bus_res)
      }  
      catch (error) {
        console.log('Error:', error);
      }
  }

  const sortBuses = (order) => {
    let sortedBuses = []
    if(order === 'asc')
      sortedBuses = [...buses].sort((a,b) => a[sortValue] - b[sortValue])
    else
      sortedBuses = [...buses].sort((a,b) => b[sortValue] - a[sortValue])
    setBuses(sortedBuses)
  }

  const handleCheckBoxes = (e) => {
    setTimeType(`routine.${e.target.value}`)
    setEarlyMorning(false)
    setMorning(false)
    setAfternoon(false)
    setEvening(false)
    document.querySelectorAll('.timeCheck input[type=checkbox]').forEach(el => el.checked = false)
  }

  useEffect(() => {
    if(search !== 0 || addFilter !== 0) {
      fetchBus()
      setLoading(true)
    }
  }, [search, addFilter]);

  return (
    <Container>
        <Row style={{border: '1px solid #ccc'}} className='my-5 p-3'>
          <Form>
            <h2 className='my-4'>Search & Book Tickets Online</h2>
            <Row>
              <Col sm={4}>
                <select class="form-select form-select-md mb-3" required onChange={e => {setField("start_city", e.target.value)}}>
                  <option>From: Select a city</option>
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
                    <option>To: Select a city</option>
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
              <Button variant='danger' style={{width: '20%'}} onClick={handleSearch}>Search</Button>
            </Row>
          </Form>
        </Row>

        {loading ? (
            <Row>
            <Col md={3}>
              <div>
                <h3>FILTERS</h3>
                <hr/>
                <Form>
                  <div className='mb-4'>
                    <h5>Bus Price</h5>
                    <input type="range" min={1} max={3000} value={priceLimit} style={{width: '100%'}} onChange={e => {setPriceLimit(e.target.value)}}/>
                    <p>Limit: Rs. {priceLimit}</p>
                  </div>
                  <div className='mb-4'>
                    <h5>Bus Time</h5>
                    <select class="form-select form-select-md mb-3" onChange={(e) => {handleCheckBoxes(e)}}>
                      <option value="arrival_time">Arrival at {filters["destination_city"].toUpperCase()}</option>
                      <option value="departure_time">Departure from {filters["start_city"].toUpperCase()}</option>
                    </select>
                    <Form.Check className='timeCheck' type="checkbox" label="Before 06:00" onClick={(e) => {setEarlyMorning(e.target.checked)}}/>
                    <Form.Check className='timeCheck' type="checkbox" label="06:00 to 12:00" onClick={(e) => {setMorning(e.target.checked)}}/>
                    <Form.Check className='timeCheck' type="checkbox" label="12:00 to 18:00" onClick={(e) => {setAfternoon(e.target.checked)}}/>
                    <Form.Check className='timeCheck' type="checkbox" label="After 18:00" onClick={(e) => {setEvening(e.target.checked)}}/>
                  </div>
                  <div className='mb-4'>
                    <h5>Bus Types</h5>
                    <Form.Check type="checkbox" label="AC" onClick={(e) => {setACBusType(e.target.checked)}}/>
                    <Form.Check type="checkbox" label="NON-AC" onClick={(e) => {setNACBusType(e.target.checked)}}/>
                  </div>
                  <Button variant='danger' style={{width: '100%', marginBottom: '2rem'}} onClick={applyFilters}>Apply Filters</Button>
                </Form>
              </div>
            </Col>
            <Col md={9}>
              <div className='d-flex justify-content-center align-items-baseline gap-4 mb-2'>
                <span>Sort: </span>
                <select class="form-select form-select-sm mb-3" onChange={(e) => {setSortValue(e.target.value)}}>
                  <option value="seat_price">Price</option>
                  <option value="arrival_time">Arrival Time</option>
                  <option value="departure_time">Departure Time</option>
                </select>
                <span><Button variant='danger' onClick={() => sortBuses('asc')}>&uarr;</Button></span>
                <span><Button variant='danger' onClick={() => sortBuses('desc')}>&darr;</Button></span>
              </div>
              {buses.length !== 0 && buses.map(bus => {
                return(
                  <BusCard id={bus.id} startCity={bus.start_city} destinationCity={bus.destination_city} seatPrice={bus.seat_price} arrivalTime={bus.arrival_time} departureTime={bus.departure_time} buttonType="Book" dateOfJourney={doj} showDate={false}/>
                )
              })
              }
            </Col>
          </Row>
        ) : (
          !loading ? (<p></p>) : (<p className='text-center'>No data found</p>)
        )}
    </Container>
  )
}
