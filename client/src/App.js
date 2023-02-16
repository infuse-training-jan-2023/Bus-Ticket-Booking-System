import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'
import Footer from './components/footer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchPage from './components/searchPage'
import HomePage from './components/HomePage'
import PageNotFound from './components/PageNotFound'
import BusSeatBooking from './components/busseat'
import UserProfile from './components/userProfile'
import Payment from './components/Payment'
import Bus_Component from './components/getBuses'
import User_Component from './components/getUsers'
import Sample from './components/sample'


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        {/* <Route index element={<HomePage />} /> */}
        <Route index element={<Sample />} />
        <Route path="/search_bus" element={<SearchPage />} />
        <Route path="/book_ticket/:id/:doj" element={<BusSeatBooking />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/payment/:ticket_id" element={<Payment />} />
        <Route path="/manage_users" element={<User_Component />} />
        <Route path="/manage_buses" element={<Bus_Component />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;