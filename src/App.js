import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import PasswordResetLink from "./pages/PasswordResetLink";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-screen bg-slate-900">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>
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
