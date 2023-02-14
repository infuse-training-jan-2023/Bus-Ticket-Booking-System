import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './components/searchPage';
import BusSeatBooking from './components/busseat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="/search_bus" element={<SearchPage />} />
        <Route path="/book_ticket/:id/:doj" element={<BusSeatBooking />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
