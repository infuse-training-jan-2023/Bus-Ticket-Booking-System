import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import Ticket from './ticketCard'

export default function UserProfile() {
    localStorage.setItem('userEmail', 'abc@gmail.com')
    const userEmail = localStorage.getItem('userEmail')
    localStorage.setItem('userId', '63e49ceca788d71cb4dae60c')
    const userId = localStorage.getItem('userId')
    // localStorage.setItem('isAdmin', true)
    // const isAdmin = localStorage.getItem('isAdmin')

    const [tickets, setTickets] = useState([])
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

    const [cancel, setCancel] = useState('')
    const set_cancel = (data) => {
        setCancel(data)
        console.log(cancel)
    }

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        if(!userId)
            navigate('/')

        fetchTickets()
    }, [userId, cancel])

    return (
        <Container>
            <div className='mt-3 d-flex justify-content-between'>
                <div>Email id: {userEmail}</div>
                <div><Button variant='danger' onClick={logout}>Logout</Button></div>
            </div>
            <div className='mt-5'>
                <h3>{tickets.length} Tickets booked</h3>
                {tickets.length > 0 && tickets.map(ticket => {
                    return <Ticket id={ticket._id} bus_id={ticket.bus_id} doj={ticket.date} ticketPrice={ticket.ticket_price} selectedSeats={ticket.selected_seats} status={ticket.status} set_cancel={set_cancel} showStatus={true}/>
                })
                }
            </div>
        </Container>
    )
}
