import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import 'App.css';
import Context, { myContext } from "./pages/Context";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      {ctx ? (
        <>
          {ctx.isAdmin ? (
            <Route path="/admin" element={<AdminPage />}></Route>
          ) : null}
          <Route path="/profile" element={<Profile />}></Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </>
      )}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
