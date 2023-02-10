
import './App.css';
import Login_form from './components/login_form/login_form';
import Registration_form from './components/registeration_form/registeration_form';


// validate user credentials
async function login_validation(email,password){
      var credentials = {'email': String(email),'password':String(password)}
      const settings = {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(credentials)
    };
    const fetchResponse = await fetch('http://127.0.0.1:4000/login', settings);
    const data = await fetchResponse.json()
    if(data['Error']!==undefined){
      console.log(data['Error'])
    }
    else{
      console.log(data)
    }
  }

  // register user
  async function register_user(user){
    console.log(user)
      const settings = {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(user)
    };
    const fetchResponse = await fetch('http://127.0.0.1:4000/register', settings);
    const data = await fetchResponse.json()
    console.log(data)
  }




function App() {
  return (
    <div className="App">
      <Login_form on_submit={login_validation}/>
      <Registration_form on_submit={register_user}/>
    </div>
  );
}

export default App;
