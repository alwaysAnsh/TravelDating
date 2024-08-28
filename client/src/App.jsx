import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Hero from './pages/dashboard/Hero'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<SignUp/>} />
        <Route path='/dashboard/:loginId' element = {<Hero/>} />
      </Routes>
    </>
  )
}

export default App
