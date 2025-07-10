import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/dashboard" className="hover:text-gray-200">IDK Academy</Link>
      </div>
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/upload" className="hover:text-gray-300">Upload Score</Link>
        </li>
        <li>
          <Link to="/scores" className="hover:text-gray-300">History</Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
