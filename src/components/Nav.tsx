import { HiChevronDoubleUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const AuthContext = useAuth();
  const { userDetails, handleLogout } = AuthContext;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <HiChevronDoubleUp className="text-2xl text-primary mr-2" />
            <Link to="/" className="text-2xl font-bold tracking-tight">
              SKILLBOUND
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {userDetails?.username ? (
              <>
                <Link
                  to="/tasks/daily"
                  className="text-gray-700 hover:text-primary font-medium"
                >
                  Tasks
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-primary font-semibold border border-primary px-4 py-1 rounded-full hover:bg-primary hover:text-white transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <details className="dropdown dropdown-end">
              <summary className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <ul className="menu menu-sm dropdown-content right-0 mt-3 z-[100] p-2 shadow bg-white rounded-box w-52">
                {userDetails?.username ? (
                  <>
                    <li>
                      <Link to="/tasks/daily">Tasks</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-red-500">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
