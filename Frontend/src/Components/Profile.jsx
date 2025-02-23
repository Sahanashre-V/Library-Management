import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    mem_name: storedUser?.mem_name || '',
    mem_phone: storedUser?.mem_phone || '',
    mem_email: storedUser?.mem_email || '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:7070/api/members/${storedUser.mem_id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Redirect to login page if unauthorized or forbidden
        navigate('/login');
      } else {
        setMessage('Profile update failed. ' + (error.response?.data?.error || error.message));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="mem_name"
          placeholder="Name"
          value={formData.mem_name}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="text"
          name="mem_phone"
          placeholder="Phone"
          value={formData.mem_phone}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="email"
          name="mem_email"
          placeholder="Email"
          value={formData.mem_email}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button type="submit" className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
