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



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<SignUp/>} />
        <Route element={<PrivateRoute/>} >
          <Route path='/dashboard/:loginId' element = {<Hero/>} />
          <Route path='/create-trip/:userId' element = {<CreateTrip/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
