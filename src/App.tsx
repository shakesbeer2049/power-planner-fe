import React from "react";
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
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/RegisterForm";
import Leaderboards from "./components/Leaderboards";
import NotificationScheduler from "./components/NotificationScheduler";

const App: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <SignupForm /> },
    {
      path: "/tasks",
      element: (
        <TaskProvider>
          <Drawer />
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
        {
          path: "leaderboards",
          element: <Leaderboards />,
        },
        {
          path: "notifications",
          element: <NotificationScheduler />,
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
