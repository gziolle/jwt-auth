import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">home</Link>
          </div>
          <div>
            <Link to="/register">register</Link>
          </div>
          <div>
            <Link to="/login">login</Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
