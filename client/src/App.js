import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './components/searchPage';
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';
import BusSeatBooking from './components/busseat';
import UserProfile from './components/userProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/search_bus" element={<SearchPage />} />
        <Route path="/book_ticket/:id/:doj" element={<BusSeatBooking />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
