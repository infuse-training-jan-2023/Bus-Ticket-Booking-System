import 'bootstrap/dist/css/bootstrap.min.css'
import Login_form from './components/login_form/loginForm';
import Registration_form from './components/registeration_form/registerationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './components/searchPage';
import UserProfile from './components/userProfile'
import BusSeatBooking from './components/seatBooking'
import Payment from './components/Payment'
import User_Component from './components/getUsers'
import HomePage from './components/HomePage'
import Bus_Component from './components/getBuses'
import PageNotFound from './components/PageNotFound'
import NavBar from './components/navbar'
import Footer from './components/footer'


function App() {
  return (

  <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/search_bus" element={<SearchPage />} />
        <Route path="/book_ticket/:id/:doj" element={<BusSeatBooking />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/payment/:ticket_id" element={<Payment />} />
        <Route path="/manage_users" element={<User_Component />} />
        <Route path="/manage_buses" element={<Bus_Component />} />
        <Route path="/login" element={<Login_form />} />
        <Route path="/register" element={<Registration_form />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;