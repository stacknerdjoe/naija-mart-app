import React from 'react'
import Signin from './components/auth/Signin'
import Navbar from './components/user/Navbar'
import Signup from './components/auth/Signup';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from "./components/NotFound";
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';



export default function App() {

  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === 'admin';

  if (isAdmin) return <AdminNavigator />;

  return (
    <>
      < Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/verification' element={<EmailVerification />} />
        <Route path='/auth/forget-password' element={<ForgetPassword />} />
        <Route path='/auth/reset-password' element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
