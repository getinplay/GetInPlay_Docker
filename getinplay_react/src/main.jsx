import ReactDOM from "react-dom/client";
// import { useState } from "react";
import "./assets/index.css";
import App from "./App";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import GamesPage from "./components/Pages/Games/GamesPage";
import HomePage from "./components/Pages/Home/HomePage";
import MembershipPage from "./components/Pages/Membership/MembershipPage";
import AboutUsPage from "./components/Pages/AboutUs/AboutUsPage";
import ContactUsPage from "./components/Pages/ContactUs/ContactUsPage";
import LoginPage from "./components/Pages/Login/LoginPage";
import GameSlots from "./components/Pages/Games/GameSlots";
import ForgotPassword from "./components/Pages/Login/ForgotPassword";
import BookingHistoryPage from "./components/Pages/Bookings/BookingHistoryPage";
import ProfilePage from "./components/Pages/Profile/ProfilePage";
import UpdatePasswordPage from "./components/Pages/UpdatePassword/UpdatePasswordPage";
import SignUpPage from "./components/Pages/SignUp/SignUpPage";

const router = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<HomePage />} />
        <Route path='games' element={<GamesPage />} />
        <Route path='games/:id' element={<GameSlots />} />
        <Route path='membership' element={<MembershipPage />} />
        <Route path='about-us' element={<AboutUsPage />} />
        <Route path='contact-us' element={<ContactUsPage />} />
        <Route path='bookings' element={<BookingHistoryPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='update-password' element={<UpdatePasswordPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(router);
