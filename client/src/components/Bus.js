// Customer.js
import {Row, Col, Button,Modal} from 'react-bootstrap'
import React from 'react'

// deconstructed props
function BusRow({bus:{_id, bus_type, start_city, destination_city,seat_price,routine}, idx}) {

  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }

  const handledeletebus = async()=>{
    try{
        const response = await fetch(`http://127.0.0.1:4000/bus/${_id}`, {
            method: 'DELETE', 
          })
          const res = await response.json()
    }
    catch(error){
        return error;
    }
}

const handleView=()=>{
  try{
    <handleView/>
  }catch(error){

  }
}

  return (
    <>
        <tr key={_id}>
            <td className='text-center'>{idx + 1}</td>
            <td className='text-center'>{_id}</td>
            <td className='text-center'>{bus_type}</td>
            <td className='text-center'>{start_city.charAt(0).toUpperCase() + start_city.slice(1)}</td>
            <td className='text-center'>{destination_city.charAt(0).toUpperCase() + destination_city.slice(1)}</td>
            <td className='text-center'>Rs.{seat_price}</td>
            <td as={Row} className='text-center'>
							<Col as={Button} variant="danger" data-toggle="modal" onClick={()=>initModal()}>View</Col>
							<Col as={Button} variant="danger" className='mx-2' onClick={()=>handledeletebus()}>Delete</Col>
						</td>
        </tr>
        <Modal show={isShow}>
        <Modal.Header closeButton onClick={()=>initModal()}>
          <Modal.Title>Bus Routine Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {routine &&
           routine.map((item) => {
            return (
            <>
            <ul>
            <li>Day: {item.day.charAt(0).toUpperCase() + item.day.slice(1)}</li>
            <ul>
            <li>Arrival Time: {((item.arrival_time.toString().length === 3) ? '0' + item.arrival_time.toString().substring(0, 1) : item.arrival_time.toString().substring(0, 2)) + ':' + item.arrival_time.toString().slice(-2)}</li>
            <li>Departure Time: {((item.departure_time.toString().length === 3) ? '0' + item.departure_time.toString().substring(0, 1) : item.departure_time.toString().substring(0, 2)) + ':' + item.departure_time.toString().slice(-2)}</li>
            </ul>
            </ul>
            </>)
          })
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default BusRow