import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const allDataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState("");

  return (
    <allDataContext.Provider
      value={{ userData: userData, setUserData: setUserData }}
    >
      {children}
    </allDataContext.Provider>
  );
}
