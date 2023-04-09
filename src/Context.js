import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../src/BackEndURL";

export const allDataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    const localStorageToken = localStorage.getItem("token");

    const responce = await fetch(`${URL}/users/who-has-logged-in`, {
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

  return (
    <allDataContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        getUserData: getUserData,
      }}
    >
      {children}
    </allDataContext.Provider>
  );
}
