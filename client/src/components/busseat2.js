import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const BusSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seat) => {
    if (!selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    }
  };

  const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5'];

  return (
    <div>
      <h3>Select your seats:</h3>
      <div className="d-flex flex-column align-items-bottom col-md-4 position-absolute top-50 start-0 translate-middle-y ">
        <div>
          {seats.map((seat, index) => {
            if (index % 5 === 4) {
              return (
                <div key={index} className="d-flex">
                  {seats.slice(index - 4, index + 1).map((innerSeat) => (
                    <Button
                      key={innerSeat}
                      variant={selectedSeats.includes(innerSeat) ? 'success' : 'primary'}
                      onClick={() => handleSeatSelection(innerSeat)}
                      className="m-1 btn-lg"
                    >
                      {innerSeat}
                    </Button>
                  ))}
                </div>
              );
            } else if (index % 5 === 0) {
              return (
                <div key={index} className="d-flex">
                  {seats.slice(index, index + 4).map((innerSeat) => (
                    <Button
                      key={innerSeat}
                      variant={selectedSeats.includes(innerSeat) ? 'success' : 'primary'}
                      onClick={() => handleSeatSelection(innerSeat)}
                      className="m-1 btn-lg"
                    >
                      {innerSeat}
                    </Button>
                  ))}
                  <div className="w-100"></div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      <h4 className="mt-3">Selected seats:</h4>
      <p><div>{selectedSeats.join(', ') || 'None'}</div></p>
    </div>
  );
};

export default BusSeatBooking;