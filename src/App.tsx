import React, { useState } from "react";
import "./styles/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import WeeklyTasks from "./components/WeeklyTasks";
import TasksToday from "./components/TasksToday";
import Stats from "./components/Stats";
import Performance from "./components/Performance";
import { TaskProvider } from "./context/TaskContext";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("daily");

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/tasks",
      element: (
        <TaskProvider>
          <Drawer
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </TaskProvider>
      ),
      children: [
        {
          path: "daily",
          element: <TasksToday />,
        },
        {
          path: "weekly",
          element: <WeeklyTasks />,
        },
        {
          path: "stats",
          element: <Stats />,
        },
        {
          path: "performance",
          element: <Performance />,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
