import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import UserInfoProvider, { UserContext } from "./context/UserInfoContext";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import PokemonProfile from "./pages/PokemonProfile";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <UserInfoProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route
              path="/search/pokemon/:pokemonIndex"
              element={<PokemonProfile />}
            ></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
          <Footer />
        </UserInfoProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
