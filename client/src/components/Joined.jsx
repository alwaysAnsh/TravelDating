import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import { messaging } from '../firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';





const Joined = () => {
  useEffect(()=>{
    // onMessage(messaging, (payload) => {
    //   console.log('Message received. ', payload);
    //   alert("message join req sent")
    // });
  },[])
  return (
    <div>
      <div>
        Joined
      </div>
      <Link to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              back to home
            </button>
          </Link>

    </div>
  )
}

export default Joined