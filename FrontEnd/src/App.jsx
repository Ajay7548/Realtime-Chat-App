import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Setting from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const {onlineUsers, authUser, checkAuth, isCheckingAuth } = useAuthStore()

  console.log({onlineUsers});
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);
  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className='h-screen'>
        <Navbar />

        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : < Navigate to="/login" />} />
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        {/* <ToastContainer /> */}
      </div>
    </>
  )
}

export default App

