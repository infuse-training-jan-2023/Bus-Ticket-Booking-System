// App.js
import React, { useEffect, useState } from "react";
import { Container, Table,Button } from 'react-bootstrap'
import { useNavigate } from "react-router";
import Bus from './Bus'


export default function BusComponent() {
// set state
  const [buses, setbuses] = useState([]);
  const [deleted,setdeleted]=useState('false')
  const userId = localStorage.getItem('user_id')
  const navigate=useNavigate()

    const fetchBuses = async()=>{
        try{
            const response = await fetch(`http://127.0.0.1:4000/buses`, {
                method: 'GET', 
              })
              const buses = await response.json()
              setbuses(buses)
              setdeleted('deleted')
        }
        catch(error){
        }
    }      

  useEffect(() => {
    if (!userId) navigate("/login");
    fetchBuses()    
  }, [buses]);

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
					{ buses.length > 0 && buses.map((bus, idx) => <Bus key={bus._id} bus={bus} idx={idx}/>) }
				</tbody>
			</Table>
		</Container>
    </div>
  );
}