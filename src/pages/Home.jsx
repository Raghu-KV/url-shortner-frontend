import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    const localStorageToken = localStorage.getItem("token");

    const responce = await fetch("http://localhost:4000/who-has-logged-in", {
      method: "GET",
      headers: { "x-auth-token": localStorageToken },
    });
    if (responce.status === 401) {
      navigate("/log-in");
    } else {
      const data = await responce.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <h1>this is home</h1>;
}

export default Home;
