import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addSeat,
//   selectSeatType,
//   selectBookedSeats,
// } from "../features/seats/seatsSlice";

export default function EachDeckSeat({ id, data }) {
//   const seatType = useSelector(selectSeatType);
//   const bookedSeatsData = useSelector(selectBookedSeats);
//   const dispatch = useDispatch();
//   const [select, setSelect] = useState(false);

//   useEffect(() => {
//     setSelect(false);
//   }, [seatType]);

//   function handleClick(e) {
//     dispatch(addSeat({ name: e.target.name, data: data }));
//     setSelect(!select);
//   }

//   function checkSeatType() {
//     if (bookedSeatsData.includes(id)) {
//       return true;
//     }

//     if (seatType === "ALL") {
//       return false;
//     }

//     if (id.length === 1) {
//       if (seatType === "SINGLE") {
//         return false;
//       } else {
//         return true;
//       }
//     } else if (id.length >= 2) {
//       if (seatType === "SHARE") {
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }

  return (
    <div>
      <button
        name={id}
      >
        {id}
      </button>
    </div>
  );
}
