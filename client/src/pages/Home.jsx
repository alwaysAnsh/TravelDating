import {React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/09.jpg'
import axios from 'axios'
import '../App.css'
import TripCard from '../components/TripCard';

const Home = () => {

  const [data, setData ] = useState({})

  const fetchAllTrips = async() => {
    try {
      const response = await axios.get('/api/v1/getAllTrips');
      if(response.status != 200 )
      {
        console.log("error fetching response ")
        return;
      }
      console.log("response : ", response)
      setData(response.data.trips);
    } catch (error) {
      console.log("Some error occured fetching details of all data: ", error);
      // console.log("error: ", response?.error);
    }
  }

  useEffect(() => {
    fetchAllTrips();
  }, [])


  return (
    <div
        className="relative bgimage h-screen w-screen flex flex-col  bg-cover bg-center"
        
    >
        {/* Dark overlay to make text stand out */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content of the homepage */}
        <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">TakemewithYou</h1>
            <p className="text-lg md:text-xl mb-8">
                Discover your next adventure with us. Sign up now and start exploring!
            </p>

            {/* Buttons for Sign Up and Login */}
            <div className="flex justify-center space-x-4 mb-8">
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

        {/* Display trips */}
        <div className="absolute bottom-0 left-0 right-0 top-[20%] overflow-y-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Object.keys(data).map((key) => (
                    <TripCard
                        key={key}
                        title={data[key].title}
                        source={data[key].source}
                        destination={data[key].destination}
                        dates={data[key].dates}
                        itinerary={data[key].itinerary}
                        budget={data[key].budget}
                        participants={data[key].participants}
                        createdAt={data[key].createdAt}
                        creator={data[key].creator}
                    />
                ))}
            </div>
        </div>
    </div>
);
};


export default Home;
