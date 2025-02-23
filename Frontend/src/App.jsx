import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Books from './Components/Book';
import Issuance from './Components/Issuance';
import Task2 from './Components/Task2';
import NeverBorrowed from './Components/NeverBorrowed';
import OutstandingBooks from './Components/OutstandingBooks';
import TopBorrowed from './Components/TopBorrowed';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Books />} />
        <Route path="/issuance" element={<Issuance />} />
        {/* Task2 as a parent route with nested routes */}
        <Route path="/task2" element={<Task2 />}>
          <Route path="never-borrowed" element={<NeverBorrowed />} />
          <Route path="outstanding" element={<OutstandingBooks />} />
          <Route path="top-borrowed" element={<TopBorrowed />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
