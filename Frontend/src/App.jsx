import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Book from './Components/Book';
import Issuance from './Components/Issuance';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<Book />} />
            <Route path="/issuance" element={<Issuance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
