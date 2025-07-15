import React, { useState, createContext, useEffect, useContext } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import useApiCaller from "../hooks/useApiCaller";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";
import type { CustomJWTPayload } from "../types/types";
import type { TaskDetailsType } from "../types/types";

type APICallerType = {
  data: unknown;
  isError: unknown;
  isLoading: unknown;
};
type TaskContextType = {
  taskList: TaskDetailsType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskDetailsType[]>>;
  handleTaskUpdate: (
    taskToUpdate: TaskDetailsType,
    sourceTaskList: TaskDetailsType[]
  ) => Promise<void>;
  handleTaskDelete: (taskToDelete: TaskDetailsType) => Promise<void>;
};

type TaskProviderProps = {
  children: React.ReactNode;
};

const TaskContext = createContext<TaskContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({
  children,
}): React.ReactElement => {
  const [taskList, setTaskList] = useState<TaskDetailsType[]>([]);
  const AuthContext = useAuth();
  const { setUserDetails } = AuthContext;

  // Initial user details fetch
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      let userId = "";

      if (jwt) {
        userId = jwtDecode<CustomJWTPayload>(jwt).id;
        if (userId) {
          const verifyUser = await callApi("/home", "GET", {});
          if (verifyUser.status === "success") {
            setUserDetails(verifyUser.data);
          }
        }
      }
    })();
  }, []);

  // Initial Task fetch
  const url =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BE_URL
      : import.meta.env.VITE_PROD_BE_URL;

  const {
    data: taskData = {} as { tasks: TaskDetailsType[] },
    isError: taskError,
    isLoading: tasksLoading,
  }: APICallerType = useApiCaller(url + "/tasks", "GET", {});

  // Effects
  useEffect(() => {
    if (
      !tasksLoading &&
      !taskError &&
      Array.isArray((taskData as { tasks: TaskDetailsType[] }).tasks)
    ) {
      setTaskList((taskData as { tasks: TaskDetailsType[] }).tasks);
    }
  }, [tasksLoading, taskData]);

  // TASK UPDATE HANDL
  const handleTaskUpdate = async (
    taskToUpdate: TaskDetailsType,
    sourceTaskList: TaskDetailsType[]
  ) => {
    try {
      console.log("sourceTaskList", sourceTaskList);
      // Update Task on server
      const taskRes = await taskService.updateTask(taskToUpdate);
      // If task updated
      if (taskRes.status === "success") {
        // Update Task
        const updatedTask = taskRes.data.task;
        const today = new Date().toISOString().split("T")[0];
        // Update TaskList in UI
        const updatedList = sourceTaskList.map((task: TaskDetailsType) =>
          task.taskId === updatedTask.taskId && task.scheduledOn.includes(today)
            ? updatedTask
            : task
        );
        console.log(updatedList, "updatedList");
        // update state
        setTaskList(updatedList);
        setUserDetails(taskRes.data.user);
        // If task is completed , show toast
        if (updatedTask.completedOn)
          toast.success("Well Done, Task Completed.", {
            autoClose: 1000,
            theme: "dark",
          });
      } else {
        toast.error("Error in updating task", {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log("error in updating task", error);
      toast.error("Error in updating task", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  // Task Delete
  const handleTaskDelete = async (taskToDelete: TaskDetailsType) => {
    if (taskToDelete.completedOn) {
      toast.error("Cannot delete a completed task");
      return;
    }
    const taskRes = await taskService.deleteTask(taskToDelete);
    if (taskRes.status === "success") {
      toast.success("Task Deleted!");
      const updatedList = taskList.filter(
        (task) => task.taskId !== taskToDelete.taskId
      );
      setTaskList(updatedList);
    } else {
      toast.error("Error! Please try again!");
    }
  };

  return (
    <TaskContext.Provider
      value={{ taskList, setTaskList, handleTaskUpdate, handleTaskDelete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
