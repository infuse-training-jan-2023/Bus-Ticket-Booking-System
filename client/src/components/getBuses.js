// App.js
import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import Bus from './Bus'


export default function Bus_Component() {
// set state
  const [buses, setbuses] = useState([]);

    const fetchUsers = async()=>{
        try{
            const response = await fetch(`http://127.0.0.1:4000/buses`, {
                method: 'GET', 
              })
              const buses = await response.json()
              setbuses(buses)

        }
        catch(error){

        }
    }

        

  useEffect(() => {
    fetchUsers()    
  }, [buses]);

return (
    <div>
      {/* pass data down to the Customers component where we'll create the table*/}
      <Container className='w-75'>
            <p>{buses.length} buses</p>
			<Table style={{margin: 'auto'}}>
				<thead>
					<tr>
						<th className='text-center'>Bus Id</th>
						<th className='text-center'>Bus Type</th>
						<th className='text-center'>Start City</th>
						<th className='text-center'>Destination City</th>
						<th className='text-center'>Ticket Price</th>
						<th className='text-center'>Options</th>
					</tr>
				</thead>
				<tbody>
					{ buses.length > 0 && buses.map(bus => <Bus key={bus._id} bus={bus}/>) }
				</tbody>
			</Table>
		</Container>
    </div>
  );
}