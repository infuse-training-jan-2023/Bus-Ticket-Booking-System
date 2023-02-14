
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login_form from './components/login_form/login_form';
import Registration_form from './components/registeration_form/registeration_form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_page from './components/home_page/home_page';
import Button from './components/button/button'
import NavBar from './components/navbar';
import Footer from './components/footer';
import { useState,useEffect } from 'react';


function App() {
  const [isloggedIn, setLog] = useState(false);

  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin());
  }, [isloggedIn]);

  function checkLogin() {
    console.log("user_id");
    console.log(window.localStorage.getItem("user_id"));
    if (window.localStorage.getItem("user_id") == null) {
      console.log("if");
      setLog(false);
    } else {
      console.log("else");
      setLog(true);
    }
  }
  return (

    
    // <div className="App">
    //   <Login_form on_submit={login_validation}/>
    //   <Registration_form on_submit={register_user}/>
    // </div>
    <BrowserRouter>
    <NavBar status={isloggedIn}/>
    <Routes>
    <Route path='/successful_login' index element={<Home_page emailid={window.localStorage.getItem('emailid')}/>}/>
    <Route path="/login" element={[<Login_form/>,<Button/>]} />
    <Route path='/register' index element={<Registration_form/>} />
    <Route path='/' />

    </Routes>
    <Footer/>
  </BrowserRouter>
  );
};

export default App;