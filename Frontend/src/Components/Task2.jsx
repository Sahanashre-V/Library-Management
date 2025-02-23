import { Link, Outlet } from 'react-router-dom';

function Task2() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task 2: Library Reports</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="never-borrowed" className="text-blue-600 underline">Books Never Borrowed</Link>
          </li>
          <li>
            <Link to="outstanding" className="text-blue-600 underline">Outstanding Books</Link>
          </li>
          <li>
            <Link to="top-borrowed" className="text-blue-600 underline">Top 10 Borrowed</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Task2;
