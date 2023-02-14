import { Container, Table, Row, Col, Button } from 'react-bootstrap'

export default function AdminPage() {
	return (
		<Container className='w-75'>
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
					<tr>
						<td>63e4b4c0219ec66d45de9b32</td>
						<td>Bus Type</td>
						<td>Start City</td>
						<td>Destination City</td>
						<td>Ticket Price</td>
						<td as={Row}>
							<Col as={Button} variant="danger">View</Col>
							<Col as={Button} variant="danger" className='mx-2'>Delete</Col>
						</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}