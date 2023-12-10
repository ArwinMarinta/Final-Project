import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/Login";
import DetailPage from "./pages/DetailPage/DetailPage";
import ProfilePage from "./pages/ProfilePage/Profile";
import NotificationPage from "./pages/NotificationPage/notifications";
import ResetPasswordPage from "./pages/PasswordPage/ResetPassword";
import MyCourse from "./pages/Class/MyCourse";
import Course from "./pages/Class/Course";
import LoginAdmin from "./pages/LoginPage/LoginAdmin";
import HomeAdmin from "./pages/DasboardAdminPage/HomeAdmin";
import ManageCourse from "./pages/DasboardAdminPage/ManageCourse";
import OtpPage from "./pages/OtpPage/Otp";
import VerifyEmail from "./pages/PasswordPage/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/my-course" element={<MyCourse />} />
        <Route path="/course/:nameCourse" element={<Course />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/manage-course" element={<ManageCourse />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
