
import './App.css';
import Login_form from './components/login_form/login_form';
import Registration_form from './components/registeration_form/registeration_form';



function login_validaation(email,password){
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      var json_data = JSON.stringify(xhr.response)
      console.log(json_data)
    }
  }

  xhr.open('GET', 'localhost:4000/login', true);
  xhr.send({'email':String(email),'password':String(password)});
}




function App() {
  return (
    <div className="App">
      <Login_form on_submit={login_validaation}/>
      <Registration_form/>
    </div>
  );
}

export default App;
