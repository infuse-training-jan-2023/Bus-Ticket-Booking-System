
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
  return (

    
    // <div className="App">
    //   <Login_form on_submit={login_validation}/>
    //   <Registration_form on_submit={register_user}/>
    // </div>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/successful_login' index element={<Home_page emailid={window.localStorage.getItem('emailid')}/>}/>
    <Route path="/login" element={[<Login_form/>]} />
    <Route path='/register' index element={<Registration_form/>} />
    <Route path='/' />

    </Routes>
    <Footer/>
  </BrowserRouter>
  );
};

export default App;