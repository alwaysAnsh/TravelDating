import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/09.jpg'
import '../App.css'

const Home = () => {
  return (
    <div
      className="bgimage relative h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center"
      
    >
      {/* Dark overlay to make text stand out */}
      <div className="absolute inset-0 bg-black opacity-50 "></div>

      {/* Content of the homepage */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">TakemewithYou</h1>
        <p className="text-lg md:text-xl mb-8">
          Discover your next adventure with us. Sign up now and start exploring!
        </p>

        {/* Buttons for Sign Up and Login */}
        <div className="flex space-x-4">
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
