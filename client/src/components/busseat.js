import React from 'react'
import { useParams } from 'react-router-dom'

export default function BusSeatBooking() {
    const { bus_id, doj } = useParams()
    return (
        <>
            <div>{bus_id}</div>
            <div>{doj}</div>
        </>
    )
}
