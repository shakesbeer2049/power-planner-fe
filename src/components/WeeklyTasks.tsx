import { useEffect, useState } from "react";
import Task from "./Task";
import "../styles/weekly.css";
import useApiCaller from "../hooks/useApiCaller";
import { TaskDetailsType } from "../types/types";
import { createWeeklyTasks } from "../utils/taskCalculations";

const WeeklyTasks = () => {
  const [allTasks, setAllTasks] = useState<Record<string, TaskDetailsType[]>>();

  const url =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BE_URL
      : import.meta.env.VITE_PROD_BE_URL;

  const {
    data: weeklyTaskList,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller(url + "/tasks/weekly", "GET", {});

  useEffect(() => {
    if (Array.isArray(weeklyTaskList) && weeklyTaskList.length > 0) {
      const weeklyTasksMap = createWeeklyTasks(weeklyTaskList);
      console.log("weeklyTasksMap", weeklyTasksMap);
      if (weeklyTasksMap) setAllTasks(weeklyTasksMap);
    }
  }, [weeklyTaskList]);

  if (tasksLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (taskError)
    return (
      <div className="text-center text-red-500 font-semibold mt-20">
        Something went wrong fetching your tasks. Please try again.
      </div>
    );

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="outlet outlet-container ml-4 mt-8 px-4">
      <h1 className="text-4xl font-bold text-left mt-8 mb-6 text-primary">
        Weekly Tasks
      </h1>

      <div className="flex flex-col gap-8">
        {weekdays.map((day) => (
          <div key={day} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4 border-b pb-2">
              {day}
            </h2>

            {allTasks?.[day] && allTasks[day].length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Task
                  taskList={allTasks[day]}
                  category={""}
                  allTasks={Array.isArray(weeklyTaskList) ? weeklyTaskList : []}
                  type="weekly"
                />
              </div>
            ) : (
              <div className="text-gray-400 italic">No tasks for this day.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTasks;
