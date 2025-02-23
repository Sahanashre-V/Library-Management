import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="cursor-pointer text-white font-bold text-xl">Library</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/signup" className="cursor-pointer text-white">Signup</Link>
        <Link to="/login" className="cursor-pointer text-white">Login</Link>
        <Link to="/profile">
          <FaUserCircle className="cursor-pointer text-white text-2xl" />
        </Link>
        <Link to="/book" className="cursor-pointer text-white">Books</Link>
        <Link to="/issuance" className="cursor-pointer text-white">Issuance</Link>
        <Link to="/task2" className="cursor-pointer text-white">Task 2</Link>
      </div>
    </nav>
  );
}

export default Navbar;
