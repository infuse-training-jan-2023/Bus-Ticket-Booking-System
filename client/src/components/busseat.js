import { React, useEffect, useState } from 'react'
import { Button,Container,Row ,Col} from 'react-bootstrap';

export default function  BusSeatBooking(){
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus,setBus]=useState([]);
  const [seatPrice,setSeatPrice]=useState([])

  const [name, setName] = useState([])
  const [gender, setGender] = useState([])
  const [booked,setBookedSeats]=useState([])

  const handleSeatSelection = (seat) => {
    if (!selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    }
  };
  const handleGender = (e, seatNo) => {
    const { value } = e.target
    setGender(gender.concat(value))
  }

  const handlePassengerName = (e, seatNo) => {
    e.preventDefault()
    let value = e.target.value
    if (!value) {
        return (setName("name is required"))
    } else {
        setName(name.concat(value))
    }
  }


  const hanledisable=(seat)=>{
    if(booked.includes(seat)){
      return true
    }
    else if(ignore.includes(seat)){
      return true
    }

  }

  const handlevariant=(seat)=>{
    if(ignore.includes(seat)){
      return 'outline-light'
    }
    if(booked.includes(seat)){
      return 'danger'
    }
    return selectedSeats.includes(seat)? 'success' : 'secondary';
  }

  const checkmiddleline=(seat)=>{
    if(ignore.includes(seat)){
      return false
    }
    else{
      return true
    }
  }

  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => {
        return (
            <form key={idx} className="form seatfrm">
              <span class="border-top"></span>
                <p class="text-capitalize text-center text-weight-bold">Seat No:{seat}</p>
                <input className="form-control seatInp" onBlur={e => handlePassengerName(e, seat)} type="text" name="passenger-name" placeholder="Enter Name" />
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="male" value="Male" onClick={e => handleGender(e, seat)} />
                    <label class="form-check-label" for="male">Male</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="female" value="Female" onClick={e => handleGender(e, seat)} />
                    <label class="form-check-label" htmlFor="female">Female</label>
                </div>
            </form>)

    })
  }

  const handleBookNowClick =async()=>{
    try{
      const response = await fetch('http://127.0.0.1:4000/ticket', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selected_seats: selectedSeats,
          date: bus,
          bus_id:bus["bus_id"],
          user_id:localStorage.user_id,
          ticket_price:bus["ticket_price"],
          day:"tuesday",
        })
      });
      const data = await response.json();
      }catch(error) {

         console.log(error)
      } 
  }

  const fetchBus = async() => {
    try {
      const response = await fetch('http://127.0.0.1:4000/bus/63e4b5ac219ec66d45de9b35', {
        method: 'GET', 
      })
      const bus_res = await response.json()
      setBus(bus_res);
      setSeatPrice(bus_res['seat_price'])
      const routes=bus_res["booked_seat"]
      routes.forEach(element => {
        if(element.date_of_journey==="2023-02-12"){
          console.log(element)
          setBookedSeats(element.seat_numbers)
        }
        
      });
      console.log(routes)
      
    } 
    catch (error) {
      console.error('Error:', error);
    }
}

useEffect(() => {
  fetchBus()
  
}, []);

  const seats = ['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'c1', 'c2', 'c3', 'c4', 'c5', 'd1', 'd2', 'd3', 'd4', 'd5'];
  const ignore=['b3','d3','c3']
  return (
    <div className='mt-5'>
      <Container>
        <Row>
          <Col className="" md={6}>
            <div>
                {seats.map((seat, index) => {
                if (index % 5=== 0) {
                return (
                  <div key={index}>
                    {seats.slice(index, index + 5).map((innerSeat) => (
                      //checkmiddleline(innerSeat)&&
                      <Button
                        key={innerSeat}
                        //variant={selectedSeats.includes(innerSeat)? 'success' : 'primary'}
                        variant={handlevariant(innerSeat)}
                        // disabled={booked.includes(innerSeat)}
                        disabled={hanledisable(innerSeat)}
                        onClick={() => handleSeatSelection(innerSeat)}
                        className="m-1 btn-lg"
                        style={{width: "80px",height:"80px"}}
                      >
                        {innerSeat}
                      </Button>
                    ))}
                  </div>
                );
              }

              return null;
            })}
            </div>
          </Col>
          <Col md={4}>
            <div className='border lg'>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='secondary'
                    style={{width: "40px",height:"40px"}}>
                  </Button>
                </p>
                <p>Available Seats</p>
              </div>

              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='danger'
                    style={{width: "40px",height:"40px"}}>
                  </Button>
                </p>
                <p style={{marginLeft: '6px'}}>Booked Seats</p>
              </div>

              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='success'
                    style={{width: "40px",height:"40px"}}>
                  </Button>
                </p>
                <p>Selected Seats</p>
              </div>
            </div>
              <div className='border'>
                <h4 className="mt-3">Selected seats:</h4>
                <div>{selectedSeats.join(', ') || 'None'}</div>
                <div><p>Total Number of selected Seats : {selectedSeats.length}</p></div>
                <div style={{color:"red"}}><p className='fs-4'>Total Price:{seatPrice*selectedSeats.length}</p></div>
                <Button
                 className="m-1 btn-md"
                 variant='primary'
                 onClick={handleBookNowClick()}
                 >BOOK-NOW</Button>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default BusSeatBooking;