import "../styles/drawer.css";
import { useAuth } from "../context/AuthContext.tsx";
import { DrawerProps } from "../types/types";
import AddTask from "./AddTask.tsx";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiChevronDoubleUp } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

const Drawer: React.FC<DrawerProps> = ({ selectedMenu, setSelectedMenu }) => {
  const [drawerState, setDrawerState] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const AuthContext = useAuth();

  return (
    <div className="main-model lg:flex">
      <div className="drawer lg:drawer-open drawer-container">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerState}
        />

        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <div className="flex w-full justify-between pl-2 pr-2 pt-2">
            {/* SIDE MENU TOGGLE */}
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden text-5xl"
              id="side-menu-toggle"
              onClick={() => setDrawerState(true)}
            >
              <AiOutlineMenu />
            </label>
            {/* XP BAR */}
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
            onClick={() => setDrawerState(false)}
          ></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-2xl">
            {/* Sidebar content here */}
            <div className="task-progress"></div>
            <div className="logo flex pb-1 items-center">
              <HiChevronDoubleUp className="text-2xl" />
              <h1 className="ml-1">
                {" "}
                <Link to="/"> LevelUP</Link>{" "}
              </h1>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <li>
              <AddTask isModal={true} />
            </li>

            <li
              onClick={() => {
                setSelectedMenu("daily");
                setDrawerState(false);
              }}
              className={selectedMenu === "daily" ? "selected-menu" : ""}
            >
              <Link to="daily">My Day</Link>
            </li>
            <li
              onClick={() => {
                setSelectedMenu("weekly");
                setDrawerState(false);
              }}
              className={selectedMenu === "weekly" ? "selected-menu" : ""}
            >
              <Link to="weekly">My Week</Link>
            </li>
            <li
              onClick={() => {
                setSelectedMenu("performance");
                setDrawerState(false);
              }}
              className={selectedMenu === "performance" ? "selected-menu" : ""}
            >
              <Link to="performance">Performance</Link>
            </li>
            <li
              onClick={() => {
                setSelectedMenu("stats");
                setDrawerState(false);
              }}
              className={selectedMenu === "stats" ? "selected-menu" : ""}
            >
              <Link to="stats">Stats</Link>
            </li>

            <li className="" onClick={AuthContext.handleLogout}>
              <button className="btn btn-error logout-btn ">Logout</button>
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
