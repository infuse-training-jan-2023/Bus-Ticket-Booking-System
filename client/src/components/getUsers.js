// App.js
import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import User from './User'


export default function User_Component() {
// set state
  const [users, setusers] = useState([]);

    const fetchUsers = async()=>{
        try{
            const response = await fetch(`http://127.0.0.1:4000/users`, {
                method: 'GET', 
              })
              const users = await response.json()
              setusers(users)

        }
        catch(error){
            return error;

        }
    }

  useEffect(() => {
    fetchUsers()
    
  }, []);

return (
    <div>
      {/* pass data down to the Customers component where we'll create the table*/}
      <Container className='w-75'>
			<Table style={{margin: 'auto'}}>
				<thead>
					<tr>
						<th className='text-center'>User Id</th>
						<th className='text-center'>Email Id</th>
						<th className='text-center'>Gender</th>
					</tr>
				</thead>
				<tbody>
					{ users.length > 0 && users.map(user => <User key={user._id} user={user} />) }
				</tbody>
			</Table>
		</Container>
    </div>
  );
}