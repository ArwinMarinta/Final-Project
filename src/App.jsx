import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/Login";
import DetailPage from "./pages/DetailPage/DetailPage";
import ProfilePage from "./pages/ProfilePage/Profile";
import NotificationPage from "./pages/NotificationPage/notifications";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
