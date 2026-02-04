import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import UserContext from './context/UserContext';
import { emptyuser } from './constants/emptyUser';

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login';
import AvailablePartners from './pages/AvailablePartners';
import WorkPartner from './pages/WorkPartner';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [globalUser,setGlobalUser] = useState(emptyuser);

  return (
    <BrowserRouter>
        <UserContext.Provider value={{globalUser, setGlobalUser, isLoggedIn, setIsLoggedIn }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/registration' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/availablePartners' element={<AvailablePartners />} />
            <Route path='/workPartner' element={<WorkPartner />} />
            <Route path='/resetPassword' element={<ResetPassword/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='*' element={<PageNotFound/>} />
          </Routes>
        </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App