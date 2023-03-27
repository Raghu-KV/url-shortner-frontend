import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const getUserName = async () => {
    const localStorageToken = localStorage.getItem("token");

    const responce = await fetch("http://localhost:4000/who-has-logged-in", {
      method: "GET",
      headers: { "x-auth-token": localStorageToken },
    });
    if (responce.status === 401) {
      navigate("/log-in");
    } else {
      const data = await responce.json();
      setUserName(data);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div>
      <h1 className="text-white font-bold text-center text-2xl pt-12">{`you have logged in as: ${userName.userName}`}</h1>
    </div>
  );
}

export default Home;
