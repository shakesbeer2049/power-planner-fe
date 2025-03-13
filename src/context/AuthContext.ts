import { useState, createContext } from "react";

type AuthContextType = {
  userDetails: any;
  setUserDetails: any;
  handleLogout: any;
};

type AuthProviderType = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderType> = (props) => {
  const [userDetails, setUserDetails] = useState([]);
  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "https://power-planner-fe-rpuw.onrender.com";
  };

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
