import 'bootstrap/dist/css/bootstrap.min.css'
import Login_form from './components/LoginForm';
import Registration_form from './components/RegisterationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './components/SearchPage';
import UserProfile from './components/UserProfile'
import BusSeatBooking from './components/SeatBooking'
import Payment from './components/Payment'
import User_Component from './components/ManageUsers'
import Sample from './components/HomePage'
import Bus_Component from './components/ManageBuses'
import PageNotFound from './components/PageNotFound'
import NavBar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  return (

  <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route index element={<Sample />} />
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
