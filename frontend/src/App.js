import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./authPages/loginPage/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import RegisterPage from "./authPages/registerPage/RegisterPage";
import AlertNotification from "./shared/components/AlertNotification";
function App() {
  console.disableYellowBox = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <AlertNotification />
    </>
  );
}

export default App;
