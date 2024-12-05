import Menu from "./components/Menu";
import Home from "./components/Home";
import Booking from "./components/Booking";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";

function App() {
  const { token } = useContext(UserContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={token == null ? <Navigate to="/login" replace /> : <Menu />}
        ></Route>
        <Route
          path="/booking"
          element={
            token == null ? <Navigate to="/login" replace /> : <Booking />
          }
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/reviews"
          element={
            token == null ? <Navigate to="/login" replace /> : <Reviews />
          }
        />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
