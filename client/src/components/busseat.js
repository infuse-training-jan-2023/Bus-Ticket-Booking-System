import { React, useEffect, useState } from 'react'
import { Button,Container,Row ,Col} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BusCard from '../components/busCard'
// import booked from "../../public/images/booked.png";
// import selected from "../../public/images/available.png";

export default function  BusSeatBooking(){
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus,setBus]=useState([]);
  const [seatPrice,setSeatPrice]=useState([])
  const [arrivalTime,setArrivalTime]=useState([])
  const [departureTime,setDepartureTime]=useState([])

  const [name, setName] = useState([])
  const [gender, setGender] = useState([])
  const [booked,setBookedSeats]=useState([])
  const [image,setImage]=useState(['../../images/available.png'])

  const {id,doj}=useParams()
  console.log(id)
  console.log(doj)

  const javascript_date = new Date(doj);
  console.log(javascript_date)
  const day=javascript_date.getDay()
 // console.log(getweekday(day))



  // const queryParameters = new URLSearchParams(window.location.search)
  // const b_id = queryParameters.get("id")
  // const dateOfJourney = queryParameters.get("doj")
  // console.log(b_id)
  // console.log(dateOfJourney)

  const getweekday=(day)=>{
    if(day==0){
      return 'sunday'
    }
    else if(day==1){
      return 'monday'
    }
    else if(day==2){
      return 'tuesday'
    }
    else if(day==3){
      return 'wednesday'
    }
    else if(day==4){
      return 'thursday'
    }
    else if(day==5){
      return 'friday'
    }
    else{
      return 'saturday'
    }
  }
  

  const handleSeatSelection = (seat) => {
    if (!selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    }
  };


  const hanledisable=(seat)=>{
    if(booked.includes(seat)){
      return true
    }
    else if(ignore.includes(seat)){
      return true
    }

  }

  const handleStyle=(seat)=>{
    if(ignore.includes(seat)){
      return {width: "80px",height:"80px",visibility:'hidden'}
    }
  }

  const handlevariant=(seat)=>{
    if(ignore.includes(seat)){
      return 'outline-light'
    }
    if(booked.includes(seat)){
      return 'outline-light'
    }
    return selectedSeats.includes(seat)? 'outline-green' : 'outline-light';
  }


  const [ticket, setTicket] = useState('')
  const navigate = useNavigate()
  const handleBookNowClick =async()=>{
    try{
      console.log(getweekday(day));
      // const post_data = {
      //   selected_seats: selectedSeats,
      //   date: doj,
      //   bus_id:bus["_id"],
      //   user_id:"1",
      //   ticket_price:bus["ticket_price"],
      //   day:getweekday(day),
      // }
      const post_data = {
        selected_seats:selectedSeats ,
        date: doj,
        bus_id:bus["_id"],
        user_id:localStorage.getItem('user_id'),
        ticket_price:seatPrice * selectedSeats.length,
        day:`${getweekday(day)}`,
      }
      const response = await fetch('http://127.0.0.1:4000/ticket', {
        method: 'POST', 
        mode:'cors',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(post_data)
      });
      const data = await response.json();
      setTicket(data.ticket_id)
      console.log(ticket)
      navigate(`/payment/${data.ticket_id}`)
      }catch(error) {
         console.log(error)
      } 
  }

  const fetchBus = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/bus/${id}`, {
        method: 'GET', 
      })
      const bus_res = await response.json()
      setBus(bus_res);
      setSeatPrice(bus_res['seat_price'])
      const routes=bus_res["booked_seat"]
      const routine=bus_res['routine']
      routine.forEach(element => {
        if(element.day===`${getweekday(day)}`){
          setArrivalTime(element.arrival_time)
          setDepartureTime(element.departure_time)
        }
        
      });

      routes.forEach(element => {
        if(element.date_of_journey===`${doj}`){
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

const userId = localStorage.getItem('user_id')
useEffect(() => {
  if(!userId)
    navigate('/login')
  fetchBus()
}, []);

  const seats = ['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'c1', 'c2', 'c3', 'c4', 'c5', 'd1', 'd2', 'd3', 'd4', 'd5','e1','e2','e3','e4','e5'];
  const ignore=['b3','d3','c3','e3']
  return (
    <div className='mt-5 text-nowrap'>
      <Container>
       <BusCard id={`${id}`} startCity={`${bus['start_city']}`} destinationCity={`${bus['destination_city']}`} seatPrice={seatPrice} arrivalTime={arrivalTime} departureTime={departureTime} dateOfJourney={`${doj}`} showDate={true}/>
        <Row className='mt-5'>
          <Col className="overflow-auto" md={6}>
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
                        style={handleStyle(innerSeat)}
                      >
                        {/* {innerSeat} */}
                        {/* {displaySeats} */}
                        <img src={booked.includes(innerSeat)? '../../images/booked.png': (selectedSeats.includes(innerSeat)? '../../images/selected.png' : '../../images/available.png')} alt="add item" width="48" height="48" />
                        {/* {seats.includes(innerSeat)&&<img src='../../images/booked.png' alt="add item" width="48" height="48" />} */}
                      </Button>
                    ))}
                  </div>
                );
              }

              return null;
            })}
            </div>
          </Col>
          <Col md={6}>
            <div className='border lg pt-3'>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='outline-green'
                    style={{width: "80px",height:"80px"}}>
                       <img src='../../images/available.png' alt="add item" width="36" height="36"/>
                  </Button>
                </p>
                <p>Available Seats</p>
              </div>

              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='outline-red'
                    style={{width: "50px",height:"50px"}}>
                    <img src='../../images/booked.png' alt="add item" width="36" height="36"/>
                  </Button>
                </p>
                <p style={{marginLeft: '20px'}}>Booked Seats</p>
              </div>

              <div className='d-flex justify-content-center align-items-center gap-2'>
                <p>
                  <Button
                    className="m-1 btn-lg"
                    variant='outline-red'
                    style={{width: "80px",height:"80px"}}>
                    <img src='../../images/selected.png' alt="add item" width="36" height="36"/>
                  </Button>
                </p>
                <p>Selected Seats</p>
              </div>
            </div>
              <div className='border text-wrap text-center'>
                <h4 className="mt-3">Selected seats:</h4>
                <div>{selectedSeats.join(', ') || 'None'}</div>
                <div><p>Total Number of selected Seats : {selectedSeats.length}</p></div>
                <div style={{color:"red"}}><p className='fs-4'>Total Price:{seatPrice*selectedSeats.length}</p></div>
                <Button
                 className="m-1 btn-md"
                 variant={selectedSeats.length==0?'outline-light':'danger'}
                 disabled={selectedSeats.length==0?true:false}
                 onClick={handleBookNowClick}
                 >BOOK-NOW</Button>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default BusSeatBooking;