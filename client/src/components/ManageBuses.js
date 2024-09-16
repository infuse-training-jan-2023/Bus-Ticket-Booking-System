// App.js
import React, { useEffect, useState } from "react";
import { Container, Table,Button } from 'react-bootstrap'
import { useNavigate } from "react-router";
import { fetchAllBuses } from "../API/BusAPI";
import Bus from './Bus'

export default function BusComponent() {
  const [buses, setbuses] = useState([])
  const userId = localStorage.getItem('user_id')
  const navigate=useNavigate()

  const fetchBuses = async() => {
    const buses = await fetchAllBuses()
    setbuses(buses)
  }  
  
  const [cancel, setCancel] = useState('')
  const deleteBusStatus = (data) => {
      setCancel(data)
      console.log(cancel)
  }

  useEffect(() => {
    if (!userId) navigate("/login");
    fetchBuses()    
  }, [userId, cancel]);

return (
    <div>
      <Container className='w-75'>
      <h3 className="text-center text-muted">Buses</h3>
      <div className="text-right">
      <Button variant='danger' className='text-center'onClick={()=>navigate('/add_bus')}>Add Bus</Button>
      </div>
      <hr/>
			<Table style={{margin: 'auto'}}>
				<thead>
					<tr>
						<th className='text-center'>Sr. No.</th>
						<th className='text-center'>Bus Id</th>
						<th className='text-center'>Bus Type</th>
						<th className='text-center'>Start City</th>
						<th className='text-center'>Destination City</th>
						<th className='text-center'>Ticket Price</th>
						<th className='text-center'>Options</th>
					</tr>
				</thead>
				<tbody>
					{ buses.length > 0 && buses.map((bus, idx) => <Bus key={bus._id} bus={bus} idx={idx} deleteBusStatus={deleteBusStatus}/>) }
				</tbody>
			</Table>
		</Container>
    </div>
  );
}