import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegisterationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './components/SearchPage';
import UserProfile from './components/UserProfile'
import BusSeatBooking from './components/SeatBooking'
import Payment from './components/Payment'
import UserComponent from './components/ManageUsers'
import HomePage from './components/HomePage'
import BusComponent from './components/ManageBuses'
import PageNotFound from './components/PageNotFound'
import NavBar from './components/Navbar'
import Footer from './components/Footer'


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
        <Route path="/manage_users" element={<UserComponent />} />
        <Route path="/manage_buses" element={<BusComponent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;
