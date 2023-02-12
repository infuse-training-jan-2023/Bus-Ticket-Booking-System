import React from "react";

const Seat = ({ seat, onClick, booked, rowIndex, seatIndex }) => {
  return (
    <button
      disabled={booked}
      onClick={() => onClick(rowIndex, seatIndex)}
      style={{
        backgroundColor: booked ? "red" : "green",
        width: "50px",
        height: "50px",
        margin: "5px",
        borderRadius: "5px",
        border: "none",
        float: "left",
      }}
    >
      {seat}
    </button>
  );
};

const Seats = ({ rows, onSeatClick, bookedSeats }) => {
  let seats = [];
  for (let i = 0; i < rows.length; i++) {
    let row = [];
    for (let j = 0; j < rows[i].length; j++) {
      let booked = false;
      for (let k = 0; k < bookedSeats.length; k++) {
        if (
          bookedSeats[k].row === i &&
          bookedSeats[k].seat === j &&
          bookedSeats[k].booked
        ) {
          booked = true;
        }
      }
      row.push(
        <Seat
          key={j}
          seat={j}
          onClick={onSeatClick}
          booked={booked}
          rowIndex={i}
          seatIndex={j}
        />
      );
    }
    seats.push(
      <div key={i} style={{ clear: "both" }}>
        {row}
      </div>
    );
  }
  return seats;
};

const App = () => {
  const [rows, setRows] = React.useState([
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3, 4],
  ]);
  const [bookedSeats, setBookedSeats] = React.useState([]);

  const onSeatClick = (rowIndex, seatIndex) => {
    setBookedSeats((prevBookedSeats) => [
      ...prevBookedSeats,
      { row: rowIndex, seat: seatIndex, booked: true },
    ]);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>Bus Seat Booking System</h1>
      <Seats rows={rows} onSeatClick={onSeatClick} bookedSeats={bookedSeats} />
    </div>
  );
};

export default App;