import React from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { messaging } from '../firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const TripCard = ({ title, source, destination, dates, itinerary, budget, participants, createdAt, creatorId, creatorEmail, creator, tripId }) => {

    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user)
    // console.log("tripId: ", tripId)
    
    let userId ;
    let token ;
    if(currentUser)
    {
        userId = currentUser._id;
    }
    else{
        userId = null;
    }
    if(currentUser)
    {
        token = currentUser.token;
    }
    else{
        token = null;
    }

    const joinTripApi = async() => {
        // console.log("userid: ", userId)
        try {
            if(!currentUser)
            {
                navigate('/login')
                return;
            }
            else{
                const response = await axios.post(`/api/v1/join-trip/${userId}`, {tripId: tripId, token: token, userId: userId })
                if(response.status != 200 )
                {
                    console.log("error joining trip, server responded with bad status: ",response.data.message)
                    return;
                }
                console.log("request for join sent successfull");
                alert("message join req sent")
                navigate('/joined');
            }
        } catch (error) {
            console.log('Somethign went wrong joining trip: ', error.response.data.message)
        }
    }

    const AlertUnableToJoin = () => {
        alert("Can't join the trip that you created")
    }


    return (
        <div className="max-w-sm rounded overflow-hidden flex flex-row  shadow-lg bg-gradient-to-r from-orange-100 to-cyan-400 text-black">
            <div className="px-6 py-4">
                
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Source:</strong> {source}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Destination:</strong> {destination}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Dates:</strong> {new Date(dates.start).toLocaleDateString()} - {new Date(dates.end).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Itinerary:</strong> {itinerary}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Budget:</strong> ${budget}
                </p>
                {/* <p className="text-gray-700 text-base mb-2">
                    <strong>Participants:</strong> {participants.join(', ')}
                </p> */}
                <p className="text-gray-700 text-base mb-2">
                    <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
                </p>
                <p className="text-pink-700 text-base mb-2">
                    <strong>Creator:</strong> {creator}
                </p>
                <p className="text-blue-700 text-base mb-2">
                    <strong>Email:</strong> {creatorEmail}
                </p>
                <p className="text-white bg-black p-2 text-base mb-2">
                    <strong>tripId:</strong> {tripId}
                </p>
                {
                    creatorId === userId ? (<button disable onClick = {AlertUnableToJoin} className="bg-gray-600 hover:bg-gray-400 text-white
                        font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                                               created by you
                                           </button>) : (<button onClick = {joinTripApi} className="bg-purple-600 hover:bg-purple-700 text-white
 font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                        Join this trip
                    </button>)
                }
            </div>
        </div>
    );
};

export default TripCard;
