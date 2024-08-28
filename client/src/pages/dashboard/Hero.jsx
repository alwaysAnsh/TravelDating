import React from 'react';
import { Link  } from 'react-router-dom';
import {useSelector} from 'react-redux'
import bg from '../../assets/08.jpg'
import '../../App.css'

const Hero = () => {

    const { currentUser } = useSelector((state) => state.user);

    // console.log("currentuser: ", currentUser)

  return (
    <div
      className="bgimageDashboard relative h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center"
      
    >
      
      <div className="absolute inset-0 bg-black opacity-10 "></div>

      
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">TakemewithYou - Dashboard</h1>
        <p className="text-lg md:text-xl mb-8">
          Discover your next adventure with us. Sign up now and start exploring!
        </p>

        
        <div className="flex space-x-4">
          <Link to={`/create-trip/${currentUser._id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Create a trip
            </button>
          </Link>
          <Link to="/join-trip">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Join a trip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
