import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import PokemonProfile from "./pages/PokemonProfile";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import HomeRoute from "./components/routing/HomeRoute";
import StoreRoute from "./components/routing/StoreRoute";
import PaymentRoute from "./components/routing/PaymentRoute";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRoute />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/store" element={<StoreRoute />}></Route>
          <Route
            path="/store/pokemon/:pokemonIndex"
            element={<PokemonProfile />}
          ></Route>
          <Route path="/checkout" element={<PaymentRoute />}></Route>
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
