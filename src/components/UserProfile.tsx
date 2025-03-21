import { useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";
import "../styles/userprofile.css";
import { CiCircleInfo } from "react-icons/ci";
import { GiBrain } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { SiExpo } from "react-icons/si";
import { useTask } from "../context/TaskContext";

type TaskListType = {
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
};

const UserProfile = ({ isProfileOpen, setIsProfileOpen }: TaskListType) => {
  const AuthContext = useAuth();
  const { userDetails } = AuthContext;
  const [taskCount, setTaskCount] = useState({ totalToday: 0, completed: 0 });
  const [hoverXP, setHoverXP] = useState(false);
  const [hoverTasks, setHoverTasks] = useState(false);
  const TaskContext = useTask();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tasksToday = [];
    let completedToday = 0;

    console.log("taskList", TaskContext.taskList);

    for (const element of TaskContext.taskList) {
      if (element.scheduledOn === today) {
        // Compare the scheduled date
        tasksToday.push(element);
        if (element.completedOn) completedToday += 1;
      }
    }
    setTaskCount({ totalToday: tasksToday.length, completed: completedToday });
  }, [TaskContext.taskList]);

  return (
    <>
      <button className="user-details" onClick={() => setIsProfileOpen(true)}>
        {/* MAIN BAR */}
        <div className="avatar-user-lvl flex">
          <div className="avatar self-center">
            <div className="w-10 h-10 rounded-full mr-1">
              <img
                alt="avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="user-lvl">
            <h1 className="text-black">{userDetails?.username || "robot"}</h1>

            <h1>lvl {userDetails?.lvl || 0} </h1>
          </div>
        </div>
        <div className="xpbar">
          <CiCircleInfo
            className="inline info-xp"
            onMouseEnter={() => setHoverXP(true)}
            onMouseLeave={() => setHoverXP(false)}
          />
          {hoverXP && <div className="hover-text-xp">xp bar</div>}

          <progress
            className="progress progress-success w-24"
            value={userDetails?.xp || 0}
            max={userDetails?.nextXP || 0}
          ></progress>
          <br />
          <CiCircleInfo
            className="inline info-tasks"
            onMouseEnter={() => setHoverTasks(true)}
            onMouseLeave={() => setHoverTasks(false)}
          />
          {hoverTasks && <div className="hover-text-tasks">progress today</div>}
          <progress
            className="progress progress-error w-24"
            value={taskCount.completed || 0}
            max={taskCount.totalToday || 0}
          ></progress>
        </div>
      </button>

      {/* DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-base-200 shadow-lg transform transition-transform duration-300 ease-in-out w-80 ${
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User Profile</h2>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="text-2xl"
            >
              <IoClose />
            </button>
          </div>

          {/* LEGEND */}
          <div className="user-profile-drawer flex flex-col justify-between">
            <div className="left-profile">
              <div className="avatar-main flex">
                {/* AVATAR */}
                <div
                  className="w-14
                 h-14
                 rounded-full mr-1"
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="rounded-full"
                  />
                </div>
                {/* Name */}
                <div className="lvl-rank">
                  <span> {userDetails?.username || "Robot"}</span>
                  <br />
                  <span> {userDetails?.rank || "Recruit"}</span> |{" "}
                  <span> Level {userDetails?.lvl || 0}</span>
                </div>
              </div>
              <div className="progress-bar">
                <progress
                  className="progress progress-success w-45"
                  value={userDetails?.xp}
                  max={userDetails?.nextXp}
                ></progress>
                <br />

                <div className="xps w-45">
                  <span>{userDetails?.xp}</span>
                  <span>{userDetails?.nextXp}</span>
                </div>
              </div>
            </div>
            <div className="right-profile mt-6">
              <div className="points">
                <div className="xp flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <SiExpo className="text-3xl text-blue-800 mr-2" />
                    <label htmlFor="xp">Total XP</label>
                  </div>

                  <span> {userDetails?.xp || 0}</span>
                </div>
                <div className="hp flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <MdHealthAndSafety className="text-3xl text-red-800 mr-2" />
                    <span>Health Points</span>
                  </div>
                  <span> {userDetails?.hp || 0}</span>
                </div>
                <div className="wp flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <RiMoneyDollarCircleFill className="text-3xl text-green-700 mr-2" />
                    <span>Wealth Points</span>
                  </div>
                  <span> {userDetails?.wp || 0}</span>
                </div>
                <div className="kp flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <GiBrain className="text-3xl text-pink-500 mr-2" />
                    <span>Knowledge Points</span>
                  </div>
                  <span> {userDetails?.kp || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for closing when clicking outside */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default UserProfile;
