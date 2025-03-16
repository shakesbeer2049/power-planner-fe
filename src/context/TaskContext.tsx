import React, { useState, createContext, useEffect, useContext } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import useApiCaller from "../hooks/useApiCaller";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";
import { CustomJWTPayload } from "../types/types";
import { TaskDetailsType } from "../types/types";

type APICallerType = {
  data: any;
  isError: any;
  isLoading: any;
};
type TaskContextType = {
  taskList: any[];
  setTaskList: any;
  handleTaskUpdate: any;
  handleTaskDelete: any;
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
        console.log("userId", userId);
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
    data: taskData,
    isError: taskError,
    isLoading: tasksLoading,
  }: APICallerType = useApiCaller(url + "/tasks/all", "GET", {});

  // Effects
  useEffect(() => {
    if (!tasksLoading && !taskError) {
      setTaskList(taskData?.tasks);
    }
  }, [tasksLoading, taskData]);

  // TASK UPDATE HANDL
  const handleTaskUpdate = async (
    e: { target: { checked: any } },
    taskToUpdate: any
  ) => {
    console.log("task to update", taskToUpdate);
    console.log("e.target.checked", e.target.checked);

    // Update Task on server
    const taskRes = await taskService.updateTask(taskToUpdate);
    // If task updated
    if (taskRes.status === "success") {
      // Update Task
      const updatedTask = taskRes.data.task;
      // Update TaskList in UI
      const updatedList = taskList.map((task: TaskDetailsType) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
      // update state
      setTaskList(updatedList);
      // setUserDetails(taskRes.data.user);
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
  };

  // Task Delete
  const handleTaskDelete = async (taskToDelete: {
    isCompleted: boolean;
    taskId: string;
  }) => {
    if (taskToDelete.isCompleted) {
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
