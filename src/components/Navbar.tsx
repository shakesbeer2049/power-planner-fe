import { HiChevronDoubleUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Navbar = () => {
  const AuthContext = useAuth();
  const { userDetails, handleLogout } = AuthContext;

  return (
    <div className="nav-container flex">
      <div className="navbar bg-base-100 justify-between">
        <a className="btn btn-ghost text-xl">
          <HiChevronDoubleUp className="text-2xl" />
          <Link to="/">Power Planner</Link>
        </a>
        {userDetails?.username ? (
          <div className="logged-in">
            <button className="btn btn-info mr-2" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-success mr-2">
              <Link to="/tasks/daily">Tasks</Link>
            </button>
          </div>
        ) : (
          <div className="home-buttons flex justify-between">
            <button className=""></button>
            <Link to="/login">
              <b>Login</b>
            </Link>
            <button className="">
              <Link to="/register">
                <b>Sign Up</b>
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
