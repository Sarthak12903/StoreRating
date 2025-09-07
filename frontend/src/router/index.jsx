import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/Homepage";
import Login from "../pages/Login/Login";

export default function RouterEntry() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
