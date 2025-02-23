import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Issuance() {
  const navigate = useNavigate();
  const [issuances, setIssuances] = useState([]);
  const [newIssuance, setNewIssuance] = useState({
    book_id: "",
    issuance_date: "",
    issuance_member_id: "",
    issued_by: "",
    target_return_date: "",
    issuance_status: "",
  });
  const [editIssuance, setEditIssuance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIssuances();
  }, []);

  const fetchIssuances = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:7070/api/issuances", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssuances(res.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error fetching issuances:", error);
      }
    }
  };

  const handleNewChange = (e) => {
    setNewIssuance({ ...newIssuance, [e.target.name]: e.target.value });
  };

  const handleCreateIssuance = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:7070/api/issuances", newIssuance, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewIssuance({
        book_id: "",
        issuance_date: "",
        issuance_member_id: "",
        issued_by: "",
        target_return_date: "",
        issuance_status: "",
      });
      fetchIssuances();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error creating issuance:", error);
      }
    }
  };

  const handleEditClick = (issuance) => {
    setEditIssuance({ ...issuance });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditIssuance({ ...editIssuance, [e.target.name]: e.target.value });
  };

  const handleUpdateIssuance = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:7070/api/issuances/${editIssuance.issuance_id}`,
        {
          book_id: editIssuance.book_id,
          issuance_date: editIssuance.issuance_date,
          issuance_member_id: editIssuance.issuance_member_id,
          issued_by: editIssuance.issued_by,
          target_return_date: editIssuance.target_return_date,
          issuance_status: editIssuance.issuance_status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeModal();
      fetchIssuances();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        console.error("Error updating issuance:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIssuance(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issuance Management</h1>

      {/* Create New Issuance Form */}
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Issue a Book</h2>
        <form onSubmit={handleCreateIssuance}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Book ID</label>
            <input
              type="number"
              name="book_id"
              value={newIssuance.book_id}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Book ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Issuance Date</label>
            <input
              type="date"
              name="issuance_date"
              value={newIssuance.issuance_date}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Member ID</label>
            <input
              type="number"
              name="issuance_member_id"
              value={newIssuance.issuance_member_id}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Member ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Issued By</label>
            <input
              type="text"
              name="issued_by"
              value={newIssuance.issued_by}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Issuer's Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Target Return Date</label>
            <input
              type="date"
              name="target_return_date"
              value={newIssuance.target_return_date}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Issuance Status</label>
            <input
              type="text"
              name="issuance_status"
              value={newIssuance.issuance_status}
              onChange={handleNewChange}
              className="w-full p-2 border rounded"
              placeholder="Enter status (Issued, Returned, etc.)"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Issue Book
          </button>
        </form>
      </div>

      {/* List of Issuances */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Issued Books List</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Book ID</th>
              <th className="p-2">Issuance Date</th>
              <th className="p-2">Member ID</th>
              <th className="p-2">Issued By</th>
              <th className="p-2">Target Return</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issuances.map((issuance) => (
              <tr key={issuance.issuance_id} className="border-b">
                <td className="p-2">{issuance.issuance_id}</td>
                <td className="p-2">{issuance.book_id}</td>
                <td className="p-2">
                  {new Date(issuance.issuance_date).toLocaleDateString()}
                </td>
                <td className="p-2">{issuance.issuance_member_id}</td>
                <td className="p-2">{issuance.issued_by}</td>
                <td className="p-2">
                  {new Date(issuance.target_return_date).toLocaleDateString()}
                </td>
                <td className="p-2">{issuance.issuance_status}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(issuance)}
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Issuance</h2>
            <form onSubmit={handleUpdateIssuance}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Book ID</label>
                <input
                  type="number"
                  name="book_id"
                  value={editIssuance.book_id}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Issuance Date</label>
                <input
                  type="date"
                  name="issuance_date"
                  value={editIssuance.issuance_date.split("T")[0]}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Member ID</label>
                <input
                  type="number"
                  name="issuance_member_id"
                  value={editIssuance.issuance_member_id}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Issued By</label>
                <input
                  type="text"
                  name="issued_by"
                  value={editIssuance.issued_by}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Target Return Date</label>
                <input
                  type="date"
                  name="target_return_date"
                  value={editIssuance.target_return_date.split("T")[0]}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Issuance Status</label>
                <input
                  type="text"
                  name="issuance_status"
                  value={editIssuance.issuance_status}
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
                  Update Issuance
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

export default Issuance;
