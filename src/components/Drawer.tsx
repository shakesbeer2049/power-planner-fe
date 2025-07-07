import "../styles/drawer.css";
import { useAuth } from "../context/AuthContext.tsx";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiChevronDoubleUp } from "react-icons/hi";
import { Link, Outlet, useLocation } from "react-router-dom";

const Drawer: React.FC = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const AuthContext = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "My Day", path: "daily", key: "daily" },
    { name: "My Week", path: "weekly", key: "weekly" },
    { name: "Performance", path: "performance", key: "performance" },
    { name: "Stats", path: "stats", key: "stats" },
    { name: "Leaderboards", path: "leaderboards", key: "leaderboards" },
    { name: "Notifications", path: "notifications", key: "notifications" },
  ];

  // Extract the last part of the path to match the key
  const currentPath = location.pathname.split("/").filter(Boolean).pop();
  const selectedMenu = currentPath || "daily"; // fallback if root

  return (
    <div className="main-model lg:flex">
      <div className="drawer lg:drawer-open drawer-container">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerState}
          onChange={(e) => setDrawerState(e.target.checked)}
        />

        <div className="drawer-content flex flex-col items-center justify-center">
          <div className="flex w-full justify-between pl-2 pr-2 pt-2">
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden text-5xl"
              id="side-menu-toggle"
            >
              <AiOutlineMenu />
            </label>
            <UserProfile
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
            />
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-2xl">
            <div className="task-progress"></div>
            <div className="logo flex pb-1 items-center">
              <HiChevronDoubleUp className="text-2xl" />
              <h1 className="ml-1 mb-1 text-5xl">
                <Link to="/">SKILLBOUND</Link>
              </h1>
            </div>

            {/* <li>
              <AddTask isModal={true} />
            </li> */}

            {menuItems.map((item) => (
              <li
                key={item.key}
                className={selectedMenu === item.key ? "selected-menu" : ""}
              >
                <Link to={item.path} onClick={() => setDrawerState(false)}>
                  {item.name}
                </Link>
              </li>
            ))}

            <li onClick={AuthContext.handleLogout}>
              <button className="btn btn-error logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="outlet outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Drawer;
