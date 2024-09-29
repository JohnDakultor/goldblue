import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import About from "../pages/AboutPage";
import Contact from "../pages/ContactPage";
import SignUp from "../pages/SignUp";
import ReqAut from "../utils/ReqAuth"
import { AuthProvider } from "../services/Authentication";
import Dashboard from "../model/productPages/Dashboard";
import Deposit from "../model/productPages/Deposit";
import Withdraw from "../model/productPages/Withdraw";
import Notification from "../model/productPages/Notification";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AdminPanel from "../model/Admin/AdminPanel";

export default function Navigation() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/dashboard" element={<ReqAut><Dashboard /></ReqAut>} />
          <Route path="/deposit" element={<ReqAut><Deposit /></ReqAut>} />
          <Route path="/withdraw" element={<ReqAut><Withdraw /></ReqAut>} />
          <Route path="/notification" element={<ReqAut><Notification /></ReqAut>} />
          <Route path="/admin" element={<ReqAut><AdminPanel /></ReqAut>} />

          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route index path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}
