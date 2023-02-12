import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const BusSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [name, setName] = useState([])
  const [gender, setGender] = useState([])
  const [seatNumber, setSeatnumber] = useState([])

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
      console.log(seat)
      return true
    }

  }

  const handlevariant=(seat)=>{
    if(ignore.includes(seat)){
      //return 'danger';
      return 'outline-light'
    }
    if(booked.includes(seat)){
      return 'danger'
    }
    return selectedSeats.includes(seat)? 'success' : 'primary';
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

  const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5'];
  const booked=['A1','D5']
  const ignore=['B3','D3','C3']
  return (
    <div>
      <div>
        <div className="d-flex flex-column align-items-bottom col-md-4 position-absolute top-50 start-0 translate-middle-y" style={{"margin-left":"100px"}}>
          <div>
            {seats.map((seat, index) => {
            if (index % 5=== 0) {
            return (
              <div key={index} className="d-flex">
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
      </div>
      
      <div className='' style={{width: "30%","margin-left":"600px"}}>
      <h4 className="mt-3">Selected seats:</h4>
      <form className="form-group">
                {renderPassengerData(selectedSeats)}
      </form>
      </div>
             
      {/*<p><div>{selectedSeats.join(', ') || 'None'}</div></p> */}
      </div>
    </div>
  );
};

export default BusSeatBooking;