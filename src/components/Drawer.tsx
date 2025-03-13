import "../styles/drawer.css";
import { AiOutlineMenu } from "react-icons/ai";
import AddTaskModal from "./AddTaskModal";
import XPBar from "./UserProfile";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import AuthContext, { useAuth } from "../context/AuthContext";
import TaskContext, { useTask } from "../context/TaskContext";
import useApiCaller from "../hooks/useApiCaller";
import { DrawerProps } from "../types/types";

const Drawer: React.FC<DrawerProps> = ({ selectedMenu, setSelectedMenu }) => {
  const [drawerState, setDrawerState] = useState(false);
  const TaskContext = useTask();
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
            <XPBar taskList={TaskContext.taskList} />
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
            <li>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-primary mb-1"
                onClick={() => {
                  const modal = document.getElementById(
                    "add_task_modal"
                  ) as HTMLDialogElement;
                  modal?.showModal(); // Use optional chaining to avoid null errors
                }}
              >
                Add Task
              </button>
              <dialog id="add_task_modal" className="modal lg:mb-8">
                <AddTaskModal />
              </dialog>
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
      <div className="outlet w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Drawer;
