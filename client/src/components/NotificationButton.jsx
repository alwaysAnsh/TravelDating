import React, { useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDARRFagRc485GHHqgyc7reZaJYziHXzg8",
    authDomain: "takemewithyou-71cd4.firebaseapp.com",
    projectId: "takemewithyou-71cd4",
    storageBucket: "takemewithyou-71cd4.appspot.com",
    messagingSenderId: "813147478505",
    appId: "1:813147478505:web:9137339aa0600cc06c5378",
    measurementId: "G-2BZ96TQD6H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function NotificationButton() {
  const [permissionStatus, setPermissionStatus] = useState(Notification.permission);

  function requestPermission() {
    if (Notification.permission === 'denied') {
      alert('Notification permission has been denied. Please enable it in your browser settings.');
      return;
    }

    Notification.requestPermission().then((permission) => {
      setPermissionStatus(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getFCMToken(); // Proceed to get FCM token
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
        alert('Permission was denied. Please enable notifications in browser settings if you wish to receive notifications.');
      } else {
        console.log('Notification permission dismissed.');
      }
    }).catch((error) => {
      console.error('Error requesting notification permission:', error);
    });
  }

  function getFCMToken() {
    const messaging = getMessaging(app);

    getToken(messaging, { vapidKey: 'BHpW1e2NEuBQiMWYfJp-oNzlOEIGLJD9K9XfmiBT-1GLhPHsEv5haNml5z6mCyt-AY4sysrWfNiVrrOvsdFyT7A' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // Send the token to your server or use it as needed
          showNotification('FCM Token Received', 'You have successfully registered for notifications.');
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while retrieving token.', error);
      });
  }

  function showNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

  return (
    <div>
      <button 
        onClick={requestPermission} 
        className="bg-white hover:bg-red-700 text-black font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Enable Notification
      </button>

      {permissionStatus === 'denied' && (
        <p className="text-red-500">
          Notifications are currently blocked. Please enable them in your browser settings.
        </p>
      )}

      {permissionStatus === 'granted' && (
        <p className="text-green-500">
          Notifications are enabled.
        </p>
      )}
    </div>
  );
}

export default NotificationButton;
