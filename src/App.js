import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import BookingList from './components/bookings/booking_list';
import BookingNew from './components/bookings/booking_new';
import BookingDetail from './components/bookings/booking_detail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path='/bookings' element={<BookingList />} />
          <Route path='/bookings/new' element={<BookingNew />} />
          <Route path='/bookings/:id' element={<BookingDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
