import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    book_name: "",
    book_cat_id: "",
    book_collection_id: "",
    book_launch_date: "",
    book_publisher: "",
  });
  const [editBook, setEditBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:7070/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error fetching books:", error);
      }
    }
  };

  const handleNewChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7070/api/books", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewBook({
        book_name: "",
        book_cat_id: "",
        book_collection_id: "",
        book_launch_date: "",
        book_publisher: "",
      });
      fetchBooks();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error creating book:", error);
      }
    }
  };

  const handleEditClick = (book) => {
    setEditBook({ ...book });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7070/api/books/${editBook.book_id}`,
        {
          book_name: editBook.book_name,
          book_cat_id: editBook.book_cat_id,
          book_collection_id: editBook.book_collection_id,
          book_launch_date: editBook.book_launch_date,
          book_publisher: editBook.book_publisher,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeModal();
      fetchBooks();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error updating book:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditBook(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>

      {/* Create New Book Form */}
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleCreateBook}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Book Name</label>
            <input
              type="text"
              name="book_name"
              value={newBook.book_name}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter book name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category ID</label>
            <input
              type="number"
              name="book_cat_id"
              value={newBook.book_cat_id}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter category ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Collection ID</label>
            <input
              type="number"
              name="book_collection_id"
              value={newBook.book_collection_id}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter collection ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Launch Date</label>
            <input
              type="date"
              name="book_launch_date"
              value={newBook.book_launch_date}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Publisher</label>
            <input
              type="text"
              name="book_publisher"
              value={newBook.book_publisher}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter publisher"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Book
          </button>
        </form>
      </div>

      {/* List of Books */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Books List</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category ID</th>
              <th className="p-2">Collection ID</th>
              <th className="p-2">Launch Date</th>
              <th className="p-2">Publisher</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id} className="border-b">
                <td className="p-2">{book.book_id}</td>
                <td className="p-2">{book.book_name}</td>
                <td className="p-2">{book.book_cat_id}</td>
                <td className="p-2">{book.book_collection_id}</td>
                <td className="p-2">
                  {new Date(book.book_launch_date).toLocaleDateString()}
                </td>
                <td className="p-2">{book.book_publisher}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
            <form onSubmit={handleUpdateBook}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Book Name</label>
                <input
                  type="text"
                  name="book_name"
                  value={editBook.book_name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category ID</label>
                <input
                  type="number"
                  name="book_cat_id"
                  value={editBook.book_cat_id}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Collection ID</label>
                <input
                  type="number"
                  name="book_collection_id"
                  value={editBook.book_collection_id}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Launch Date</label>
                <input
                  type="date"
                  name="book_launch_date"
                  value={editBook.book_launch_date.split("T")[0]}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Publisher</label>
                <input
                  type="text"
                  name="book_publisher"
                  value={editBook.book_publisher}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Update Book
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
