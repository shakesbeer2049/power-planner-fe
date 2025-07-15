import axios from "axios";
import { callApi } from "./callApi";
import type { TaskDetailsType } from "../types/types";

const baseUrl = `/tasks`;

export const addTask = async (taskDetails: TaskDetailsType) => {
  try {
    const addTaskRes = await callApi(baseUrl, "POST", taskDetails);
    return addTaskRes;
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const updateTask = async (taskToUpdate: TaskDetailsType) => {
  try {
    const updateTaskRes = await callApi(
      `${baseUrl}/${taskToUpdate.taskId}`,
      "PUT",
      taskToUpdate
    );

    return updateTaskRes;
  } catch (error) {
    console.log("error in update tasks", error);
  }
};

export const deleteTask = async (taskDetails: TaskDetailsType) => {
  try {
    const deleteTaskRes = await callApi(
      `${baseUrl}/${taskDetails.taskId}`,
      "DELETE",
      taskDetails
    );
    return deleteTaskRes;
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const getTasks = async () => {
  try {
    const getTaskRes = await axios.get(`${baseUrl}`);
    return getTaskRes.data;
  } catch (error) {
    console.log("error in get tasks", error);
  }
};
