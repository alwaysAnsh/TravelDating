import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Hero from './pages/dashboard/Hero'
import CreateTrip from './pages/trips/CreateTrip'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'
import Joined from './components/Joined'
import JoinRequests from './pages/trips/JoinRequests'
import Test from './pages/Test'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../public/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service worker registered successfully:', registration);
        // Optional: You can set the service worker for Firebase messaging
        // messaging.useServiceWorker(registration); // Not needed with compat libraries
      })
      .catch((err) => {
        console.error('Service worker registration failed:', err);
      });
  });
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<SignUp/>} />
        <Route path='/test' element = {<Test/>} />
        <Route element={<PrivateRoute/>} >
          <Route path='/:loginId' element = {<Home/>} />
          <Route path='/dashboard/:loginId' element = {<Hero/>} />
          <Route path='/create-trip/:userId' element = {<CreateTrip/>} />
          <Route path='/dashboard/:loginId/requests' element = {<JoinRequests/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
        <Route path="/joined" element={<Joined/>} />
      </Routes>
    </>
  )
}

export default App
