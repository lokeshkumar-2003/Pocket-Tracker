import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Token");
    setUser({});
    navigate("/");
  };
  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
