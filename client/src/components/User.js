import React from 'react'

function User({user:{_id,emailid, gender}, idx}) {

  return (
        <tr key={_id}>
            <td className='text-center'>{idx + 1}</td>
            <td className='text-center'>{_id}</td>
            <td className='text-center'>{emailid}</td>
            <td className='text-center'>{gender}</td>
        </tr>
  )
}
export default User