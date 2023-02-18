// Customer.js
import { Row, Col, Button, Modal } from "react-bootstrap";
import React from "react";

// deconstructed props
function BusRow({
  bus: { _id, bus_type, start_city, destination_city, seat_price, routine },
  idx,
}) {
  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  const HandleDeleteBus = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/bus/${_id}`, {
        method: "DELETE",
      });
      const res = await response.json();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <tr key={_id}>
        <td className="text-center">{idx + 1}</td>
        <td className="text-center">{_id}</td>
        <td className="text-center">{bus_type}</td>
        <td className="text-center">
          {start_city.charAt(0).toUpperCase() + start_city.slice(1)}
        </td>
        <td className="text-center">
          {destination_city.charAt(0).toUpperCase() + destination_city.slice(1)}
        </td>
        <td className="text-center">Rs.{seat_price}</td>
        <td as={Row} className="text-center d-flex gap-2">
          <Col
            as={Button}
            variant="outline-danger"
            data-toggle="modal"
            onClick={() => initModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </Col>
          <Col
            as={Button}
            variant="outline-danger"
            className=""
            onClick={() => HandleDeleteBus()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </Col>
        </td>
      </tr>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={() => initModal()}>
          <Modal.Title>Bus Routine Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {routine &&
            routine.map((item) => {
              return (
                <>
                  <ul>
                    <li>
                      Day:{" "}
                      {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                    </li>
                    <ul>
                      <li>
                        Arrival Time:{" "}
                        {(item.arrival_time.toString().length === 3
                          ? "0" + item.arrival_time.toString().substring(0, 1)
                          : item.arrival_time.toString().substring(0, 2)) +
                          ":" +
                          item.arrival_time.toString().slice(-2)}
                      </li>
                      <li>
                        Departure Time:{" "}
                        {(item.departure_time.toString().length === 3
                          ? "0" + item.departure_time.toString().substring(0, 1)
                          : item.departure_time.toString().substring(0, 2)) +
                          ":" +
                          item.departure_time.toString().slice(-2)}
                      </li>
                    </ul>
                  </ul>
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BusRow;
