import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import PasswordResetLink from "./pages/PasswordResetLink";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/forget-password/:id/:token"
          element={<PasswordResetLink />}
        />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
