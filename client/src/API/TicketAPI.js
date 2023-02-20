const url = 'http://127.0.0.1:4000/'

export const fetchTicketById = async(ticket_id) => {
    try {
        const response = await fetch(`${url}payment_success/${ticket_id}`, {method: 'GET'})
        const data = await response.json()
        return data
    }  
    catch (error) {
        console.log('Error:', error);
    }
}

export const fetchTicketsByEmail = async(user_id) => {
    try {
        const response = await fetch(`${url}ticket/${user_id}`, {method: 'GET'})
        const data = await response.json()
        return data
    }  
    catch (error) {
        console.log('Error:', error);
    }
}

export const updateTicketStatus = async(id, doj) => {
    try {
        const response = await fetch(`${url}ticket`, {          
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({"ticket_id": id, "date": doj}),})
        const data = await response.json()
        return data
    }  
    catch (error) {
        console.log('Error:', error);
    }
  }