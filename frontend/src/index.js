import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import Support from './landing_page/support/SupportPage';
import PricingPage from './landing_page/pricing/PricingPage';
import NotFound from './landing_page/NotFound';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import Terms from './landing_page/signup/Terms';
import Signin from './landing_page/signin/Signin'
import FundTransferRules from './landing_page/funds/FundTransferRules'
import Contact from './landing_page/support/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/funds" element={<FundTransferRules/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/pricing" element={<PricingPage/>} />
      <Route path="/support" element={<Support/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
 </BrowserRouter>
);
 
// Removed undefined 'res' block that caused a compile error
