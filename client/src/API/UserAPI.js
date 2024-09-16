const url = 'http://127.0.0.1:4000/'

export const loginUser = async (email, password) => {
    try {
        let credentials = {'emailid': String(email),'password':String(password)}
        const settings = {
          method: 'POST',
          headers: {Accept: 'application/json','Content-Type': 'application/json'},
          body:JSON.stringify(credentials)
        }
    
        const response = await fetch(`${url}login`, settings);
        return response;
    }catch(error) {
        console.log(error)
    }
}

export const registerUser = async(user) => {
    try {
        const settings = {
            method: 'POST',
            headers: {Accept: 'application/json','Content-Type': 'application/json'},
            body:JSON.stringify(user)
        }
    
        const response = await fetch(`${url}register`, settings);
        return response
    }
    catch(error) {
        console.log(error)
    }
}

export const fetchAllUsers = async()=>{
    try{
        const response = await fetch(`${url}users`, {
            method: 'GET', 
          })
          const data = await response.json()
          return data
    }
    catch(error){
        console.log(error)
    }
}