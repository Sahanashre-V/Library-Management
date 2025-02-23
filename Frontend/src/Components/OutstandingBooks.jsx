import { useState, useEffect } from 'react';
import axios from 'axios';

function OutstandingBooks() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:7070/api/reports/outstanding-books');
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching outstanding books:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Outstanding Books</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Member Name</th>
            <th className="p-2 border">Book Name</th>
            <th className="p-2 border">Issued Date</th>
            <th className="p-2 border">Target Return Date</th>
            <th className="p-2 border">Author</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{item.member_name}</td>
              <td className="p-2 border">{item.book_name}</td>
              <td className="p-2 border">{new Date(item.issued_date).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(item.target_return_date).toLocaleDateString()}</td>
              <td className="p-2 border">{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OutstandingBooks;
