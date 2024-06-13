import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // handle successful registration here
      alert('Registration successful!'); // show a success message to the user
      window.location.href = '/login'; // redirect to the login page
    } catch (error) {
      // handle error here
      alert(error.message); // show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-2xl w-2/4">
        <h2 className="text-3xl font-bold mb-10 text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-6 rounded-md text-black"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 mb-6 rounded-md text-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 mb-6 rounded-md text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-500 py-2 rounded-md text-white text-sm" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;