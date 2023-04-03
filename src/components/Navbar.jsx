import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
  };

  return (
    <>
      <div className="bg-slate-700 relative">
        <div className="h-16  flex items-center justify-between container mx-auto">
          <div className="ml-5 md:ml-0">
            <h1 className="text-white font-bold text-2xl">
              <Link to="/">URL shortner</Link>
            </h1>
          </div>
          <ul className="hidden text-white md:flex gap-4 font-semibold">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              {" "}
              <Link to="/statistics">Statistics</Link>
            </li>
            <li onClick={logOut} className="cursor-pointer">
              Logout
            </li>
          </ul>
          <div className="mr-5 text-white md:hidden z-10">
            <HiOutlineMenuAlt3 size={"30px"} />
          </div>

          <div
            className={`h-screen w-3/4 bg-blue-500 absolute right-0 top-0`}
          ></div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
