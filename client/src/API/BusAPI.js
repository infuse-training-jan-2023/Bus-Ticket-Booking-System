const url = 'http://127.0.0.1:4000/'

export const fetchBusByFilters = async(filters) => {
    try {
        const response = await fetch(`${url}bus_search`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(filters),
        })
        const data = await response.json()
        return data
      }  
    catch (error) {
        console.log('Error:', error);
    }
}

export const fetchBusById = async (id) => {
    try {
      const response = await fetch(`${url}bus/${id}`, {
        method: "GET",
      });
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error:", error);
    }
}

export const fetchBusByIdAndDay = async(id, day) => {
    try {
        const response = await fetch(`${url}bus?bus_id=${id}&day=${day}`, {method: 'GET'})
        const data = await response.json()
        return data
    }  
    catch (error) {
        console.log('Error:', error);
    }
}

export const fetchAllBuses = async()=>{
    try{
        const response = await fetch(`${url}buses`, {
            method: 'GET', 
          })
          const data = await response.json()
          return data
    }
    catch(error){
        console.log(error)
    }
} 

export const addNewBus = async(fields) => {
    try {
      const response = await fetch(`${url}bus`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
}

export const deleteBus = async(_id) => {
    try {
      const response = await fetch(`${url}bus/${_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };