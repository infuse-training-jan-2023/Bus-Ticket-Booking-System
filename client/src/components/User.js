// Customer.js
import {Row, Col, Button} from 'react-bootstrap'
import React from 'react'

// deconstructed props
function BusRow({user:{_id,emailid, gender}, idx}) {

  return (
        <tr key={_id}>
            <td className='text-center'>{idx + 1}</td>
            <td className='text-center'>{_id}</td>
            <td className='text-center'>{emailid}</td>
            <td className='text-center'>{gender}</td>
        </tr>
  )
}
export default BusRow