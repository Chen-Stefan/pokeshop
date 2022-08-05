import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Context, { myContext } from "./pages/Context";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";

function App() {
  const ctx = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
