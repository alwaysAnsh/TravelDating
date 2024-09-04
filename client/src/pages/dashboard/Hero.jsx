import {React, useState, useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import bg from '../../assets/08.jpg'
import axios from 'axios'
import '../../App.css'
import { setToken, setUser } from '../../redux/authSlice';

const Hero = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [data, setData ] = useState({})
    const token = currentUser.token;
    console.log("currentuser: ", currentUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserTrips = async() => {
      try {
        const response = await axios.get(`/api/v1/get-trip/${currentUser._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.status != 200 )
        {
          console.log("error fetching response ")
          return;
        }
        console.log("response: ", response.data)
        setData(response.data);
      } catch (error) {
        console.log("Some error occured fetching details of all data: ", error);
        // console.log("error: ", response?.error);
      }
    }

    useEffect(() => {
      fetchUserTrips();
    }, [])

    const handleLogout = ()=> {
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate('/login');
    }
    

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
          <button onClick = {handleLogout} className="bg-white hover:bg-red-700 text-black font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
