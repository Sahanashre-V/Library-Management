import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    mem_name: '',
    mem_phone: '',
    mem_email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7070/api/members', formData);
      setMessage('Signup successful!');
      // Store the token
      localStorage.setItem('token', res.data.token);
      // Store the user details (name, phone, email) under the key "user"
      localStorage.setItem('user', JSON.stringify({
        mem_name: formData.mem_name,
        mem_phone: formData.mem_phone,
        mem_email: formData.mem_email
      }));
      setFormData({ mem_name: '', mem_phone: '', mem_email: '' });
    } catch (error) {
      setMessage('Signup failed. ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
