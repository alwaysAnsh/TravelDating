import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'



const JoinRequests = () => {

    const [requestData, setRequestData] = useState([]);
    const {currentUser } = useSelector((state) => state.user);

    //joining request api endpoint
    const JoiningRequests = async() => {
        try {
          const res = await axios.get(`/api/v1/${currentUser._id}/join-requests`)
          if(res.status !== 200 ){
            console.log("Bad response. Error fetching details");
            return;
          }

          console.log("Fetched successfully: ", res.data.requests);
          setRequestData(res.data.requests);

        } catch (error) {
          console.log("Somethign went wrong fetching details of joined trips: ", error);
          return;
        }
      }

useEffect(()=> {
    JoiningRequests();
}, [])


return (
    <div className="p-6 bg-gray-300 min-h-screen">
      <div className="text-2xl font-semibold mb-6">
        Joining Requests for <span className="text-red-700">{currentUser.firstName}</span>
      </div>
  
      {
        requestData.length === 0 ? (<div>No requests currently</div>) : (<div className="space-y-6">
            {
              requestData.map((joinReq, key) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Trip Join Request ID:</span> {joinReq.tripId._id}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Title of Trip:</span> {joinReq.tripId.title}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">User ID:</span> {joinReq.userId._id}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Name of User:</span> {joinReq.userId.firstName} {joinReq.userId.lastName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Email of User:</span> {joinReq.userId.email}
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Accept
                        </button>
                        <button  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Reject
                        </button>
                </div>
              ))
            }
          </div>)
      }
    </div>
  );
  
}

export default JoinRequests