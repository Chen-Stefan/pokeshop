import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import PokemonProfile from "./pages/PokemonProfile";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import LoginRoute from "./components/routing/LoginRoute";
import StoreRoute from "./components/routing/StoreRoute";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<StoreRoute />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<LoginRoute />}></Route>
          <Route
            path="/pokemon/:pokemonIndex"
            element={<PokemonProfile />}
          ></Route>
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
