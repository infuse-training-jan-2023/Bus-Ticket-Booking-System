// Customer.js
import {Row, Col, Button,Modal} from 'react-bootstrap'
import React from 'react'

// deconstructed props
function BusRow({bus:{_id, bus_type, start_city, destination_city,seat_price,routine} }) {

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

function displayroutine(){
   routine.map((item) => {
    return (<p>{item.arrival_time}</p>)
  }) 
}

  return (
    <>
        <tr key={_id}>
            <td className='text-center'>{_id}</td>
            <td className='text-center'>{bus_type}</td>
            <td className='text-center'>{start_city}</td>
            <td className='text-center'>{destination_city}</td>
            <td className='text-center'>{seat_price}</td>
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
            <li>Day :{item.day}</li>
            <ul>
            <li>Arrival Time : {item.arrival_time}</li>
            <li>Departure Time :{item.departure_time}</li>
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