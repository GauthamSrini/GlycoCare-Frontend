import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import Prescription from './components/prescription/Prescription'
import Recommendation from './components/Recomdation/Recommendation'
import { Route, Routes } from 'react-router-dom'
import Chatbot from './components/chatbot/Chatbot'
import Login from './components/login/Login'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  return (
    <div style={{display:"flex"}}>
      {location.pathname!='/' && <Sidebar/>}
      <div className='rendringComponent'>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/prescription' element={<Prescription/>}/>
        <Route path='/recommentation' element={<Recommendation/>}/>
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
