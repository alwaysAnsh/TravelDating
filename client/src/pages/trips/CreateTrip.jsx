import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../App.css'

const CreateTrip = () => {
  const {currentUser} = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    destination: '',
    itinerary: '',
    start: '',
    end: '',
    budget: '',
    participants: [],
    creator: currentUser._id
  });

 
  // console.log("cirruser:", currentUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.source) newErrors.source = 'Source is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.itinerary) newErrors.itinerary = 'Itinerary is required';
    if (!formData.start) newErrors.start = 'Start date is required';
    if (!formData.end) newErrors.end = 'End date is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.creator) newErrors.creator = 'Creator is required';
    if (!formData.participants) newErrors.participants = 'Participants are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleParticipantsChange = (e) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      participants: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true)
        const mappedData = {
          ...formData,
          dates: {
            start: formData.start,
            end: formData.end
          },
          token: currentUser.token // Include token if required by the backend
        };
        const response = await axios.post('http://localhost:4000/api/v1/create-trip', mappedData);
        console.log("res: ", response)
        if(response.status != 201)
        {
          console.log("response not found");
          return;
        }
        setFormData({
          title: '',
          source: '',
          destination: '',
          itinerary: '',
          start: '',
          end: '',
          budget: '',
          participants: '',
          creator: ''
        })
        setLoading(false);
        navigate(`/dashboard/${currentUser._id}`)
      } catch (error) {
        console.log("Something went wrong creating trip, sorry: ", error)
        console.log("Error Details: ", error.response ? error.response.data : "No response from server");

      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-200">

      {/* Left side: Image */}
      <div className="sm:w-1/2 w-full max-h-screen bg-cover bg-center bgimageCreateTrip" ></div>

      {/* Right side: Form */}
      <div className="sm:w-1/2 w-full flex items-center justify-center p-8 ">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold mt-24 underline uppercase ">Create a Trip</h2>
          

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Source */}
          <div>
            <label htmlFor="source" className="block text-gray-700">Source</label>
            <input 
              type="text" 
              id="source" 
              name="source" 
              value={formData.source} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.source ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-gray-700">Destination</label>
            <input 
              type="text" 
              id="destination" 
              name="destination" 
              value={formData.destination} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
          </div>

          {/* Itinerary */}
          <div>
            <label htmlFor="itinerary" className="block text-gray-700">Itinerary</label>
            <textarea 
              id="itinerary" 
              name="itinerary" 
              value={formData.itinerary} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.itinerary ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.itinerary && <p className="text-red-500 text-sm">{errors.itinerary}</p>}
          </div>

          {/* Dates */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="start" className="block text-gray-700">Start Date</label>
              <input 
                type="date" 
                id="start" 
                name="start" 
                value={formData.start} 
                onChange={handleChange} 
                className={`w-full p-2 border ${errors.start ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.start && <p className="text-red-500 text-sm">{errors.start}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="end" className="block text-gray-700">End Date</label>
              <input 
                type="date" 
                id="end" 
                name="end" 
                value={formData.end} 
                onChange={handleChange} 
                className={`w-full p-2 border ${errors.end ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-gray-700">Budget</label>
            <input 
              type="number" 
              id="budget" 
              name="budget" 
              value={formData.budget} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
          </div>

          {/* Participants */}
          <div>
            <label htmlFor="participants" className="block text-gray-700">Participants (comma-separated User IDs)</label>
            <input 
              type="text" 
              id="participants" 
              name="participants" 
              value={formData.participants} 
              onChange={handleParticipantsChange} 
              className={`w-full p-2 border ${errors.participants ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.participants && <p className="text-red-500 text-sm">{errors.participants}</p>}
          </div>

          {/* Creator */}
          <div>
            <label htmlFor="creator" className="block text-gray-700">Creator (User ID)</label>
            <input 
              type="text" 
              id="creator" 
              name="creator" 
              value={formData.creator} 
              onChange={handleChange} 
              className={`w-full p-2 border ${errors.creator ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.creator && <p className="text-red-500 text-sm">{errors.creator}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
