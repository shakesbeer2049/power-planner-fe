import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define the shape of user details (adjust as needed)
type UserDetailsType = Record<string, string> | null;

type AuthContextType = {
  userDetails: UserDetailsType;
  setUserDetails: Dispatch<SetStateAction<UserDetailsType>>;
  handleLogout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

// Create context with undefined as default to ensure safe access
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>(null);

  // Logout function
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
