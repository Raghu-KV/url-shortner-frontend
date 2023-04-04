import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX, HiLogout } from "react-icons/hi";
import { useState } from "react";
import { useRef, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
  };

  const mobileNavRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!mobileNavRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div className="bg-slate-700 fixed w-screen">
        <div className="h-16 flex items-center justify-between container mx-auto">
          <div className="ml-5 md:ml-0">
            <h1 className="text-white font-bold text-2xl">
              <Link to="/">URL shortner</Link>
            </h1>
          </div>
          <ul className="hidden text-white md:flex gap-4 font-semibold">
            <li className="py-2">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="py-2">
              {" "}
              <Link to="/statistics">Statistics</Link>
            </li>
            <li
              onClick={logOut}
              className="cursor-pointer rounded-lg px-6 py-2 bg-slate-900 hover:scale-105 transition-all duration-100"
            >
              <HiLogout className="inline-block mr-2 mb-1" />
              Logout
            </li>
          </ul>
          <div
            className="mr-5 text-white md:hidden z-10"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <HiX size={"30px"} />
            ) : (
              <HiOutlineMenuAlt3 size={"30px"} />
            )}
          </div>
          {/*  */}

          <ul
            className={`h-screen absolute w-4/6 bg-slate-700  right-0 top-0 ${
              openNav ? "translate-x-0" : "translate-x-full"
            } transition-all ease-out duration-300 text-white flex flex-col gap-2 font-semibold items-center justify-center
            text-xl`}
            ref={mobileNavRef}
          >
            <li className="">
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              {" "}
              <Link to="/statistics">Statistics</Link>
            </li>
            <li
              onClick={logOut}
              className="cursor-pointer mt-10 rounded-lg px-6 py-2 bg-slate-900"
            >
              <HiLogout className="inline-block mr-2 mb-1" />
              Logout
            </li>
          </ul>

          {/*  */}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
