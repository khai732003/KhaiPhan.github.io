import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import Revenue from "./pages/Revenue";
import FormAddEdit from "./components/FormAddEdit";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <ToastContainer position="top-right" autoClose={2000}/>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="usermanagement" element={<UserManagement />} />
            <Route path="add" element={<FormAddEdit />} />
            <Route path="update/:id" element={<FormAddEdit />} />
            <Route path="revenue" element={<Revenue />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;