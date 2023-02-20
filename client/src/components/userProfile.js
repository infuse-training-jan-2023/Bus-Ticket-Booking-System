import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { fetchTicketsByEmail } from '../API/TicketAPI'
import Ticket from './TicketCard'

export default function UserProfile() {
    const userEmail = localStorage.getItem('emailid')
    const userId = localStorage.getItem('user_id')

    const [tickets, setTickets] = useState([])
    const fetchTickets = async() => {
        const ticket_res = await fetchTicketsByEmail(userId)
        setTickets(ticket_res)
    }

    const [cancel, setCancel] = useState('')
    const set_cancel = (data) => {
        setCancel(data)
        console.log(cancel)
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(!userId)
            navigate('/login')
        fetchTickets()
    }, [userId, cancel])

    return (
        <Container>
            <div className='mt-5'>
                <p className='mb-5'>Email: {userEmail}</p>
                <h4>{tickets.length} Tickets booked</h4>
                {tickets.length > 0 && tickets.map(ticket => {
                    return <Ticket id={ticket._id} bus_id={ticket.bus_id} doj={ticket.date} ticketPrice={ticket.ticket_price} selectedSeats={ticket.selected_seats} status={ticket.status} set_cancel={set_cancel} showStatus={true}/>
                })
                }
            </div>
        </Container>
    )
}
