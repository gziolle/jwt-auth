import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Bye } from "./pages/Bye";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bye" element={<Bye />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
