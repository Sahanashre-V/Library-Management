import { useState, useEffect } from 'react';
import axios from 'axios';

function TopBorrowed() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:7070/api/reports/top-borrowed-books');
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching top borrowed books:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Top 10 Most Borrowed Books</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Book Name</th>
            <th className="p-2 border">Times Borrowed</th>
            <th className="p-2 border">Members Count</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{book.book_name}</td>
              <td className="p-2 border">{book.times_borrowed}</td>
              <td className="p-2 border">{book.members_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopBorrowed;
