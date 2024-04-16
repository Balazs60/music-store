import { useNavigate } from 'react-router-dom';
import React from 'react';

const SuccessfulOrderPage = () => {
  const navigate = useNavigate();

  const handleNavigateToMainPage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="p-8 border-2 border-blue-500 rounded-lg bg-white w-full max-w-md text-center">
      <p className="text-blue-500 font-bold text-lg">
        Your order is successful, and under process!
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={handleNavigateToMainPage}
      >
        Main Page
      </button>
    </div>
  </div>
  );
};


export default SuccessfulOrderPage;
