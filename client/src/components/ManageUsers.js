// App.js
import React, { useEffect, useState } from "react";
import { Container, Table} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { fetchAllUsers } from "../API/UserAPI";
import User from './User'


export default function UserComponent() {
// set state
  const [users, setusers] = useState([]);
  const userId = localStorage.getItem('user_id')
  const navigate=useNavigate()

  const fetchUsers = async()=>{
    const users = await fetchAllUsers()
    setusers(users)
  }

  useEffect(() => {
    if (!userId) navigate("/login");
    fetchUsers()
    
  }, []);

return (
    <div>
      <Container className='w-100'>
      <h3 className="text-center text-muted">Registered Users</h3>
      <hr/>
			<Table style={{margin: 'auto'}}>
				<thead>
					<tr>
            <th className='text-center'>Sr. No.</th>
						<th className='text-center'>User Id</th>
						<th className='text-center'>Email Id</th>
						<th className='text-center'>Gender</th>
					</tr>
				</thead>
				<tbody>
					{ users.length > 0 && users.map((user, idx) => <User key={user._id} user={user} idx={idx}/>) }
				</tbody>
			</Table>
		</Container>
    </div>
  );
}