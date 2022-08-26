import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import UserInfoProvider, { UserContext } from "./context/UserInfoContext";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import Store from "./pages/Store";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import PokemonProfile from "./pages/PokemonProfile";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import StripeContainer from "./components/StripeContainer";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        {/* <UserInfoProvider> */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route
              path="/store/pokemon/:pokemonIndex"
              element={<PokemonProfile />}
            ></Route>
            <Route path="/checkout" element={<StripeContainer />}></Route>
          </Routes>
        {/* </UserInfoProvider> */}
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
