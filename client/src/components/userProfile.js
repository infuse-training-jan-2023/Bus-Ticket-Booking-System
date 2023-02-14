import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Ticket from './ticketCard'

export default function UserProfile() {
    localStorage.setItem('userEmail', 'abc@gmail.com')
    const userEmail = localStorage.getItem('userEmail')
    localStorage.setItem('userId', '63e49ceca788d71cb4dae60c')
    const userId = localStorage.getItem('userId')
    localStorage.setItem('isAdmin', true)
    const isAdmin = localStorage.getItem('isAdmin')

    const [tickets, setTickets] = useState([])
    const [bus, setBus] = useState([])

    const fetchTickets = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:4000/ticket/${userId}`, {method: 'GET'})
            const ticket_res = await response.json()
            setTickets(ticket_res)
            console.log(tickets)
        }  
        catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [userId])

    return (
        <Container>
            <div className='mt-3'>Email id: {userEmail}</div>
            <div className='mt-5'>
                <h3>{tickets.length} Tickets booked</h3>
                {tickets.length > 0 && tickets.map(ticket => {
                    return <Ticket bus_id={ticket.bus_id} doj={ticket.date} ticketPrice={ticket.ticket_price} selectedSeats={ticket.selected_seats} status={ticket.status}/>
                })
                }
            </div>
        </Container>
    )
}
