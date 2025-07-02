import { useEffect, useState } from "react";
import Task from "./Task";
import "../styles/weekly.css";
import useApiCaller from "../hooks/useApiCaller";
import { TaskDetailsType } from "../types/types";
import { createWeeklyTasks } from "../utils/taskCalculations";

const WeeklyTasks = () => {
  const [allTasks, setAllTasks] = useState<Record<string, TaskDetailsType[]>>(
    {}
  );

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

  if (tasksLoading) return <>Please wait ...</>;
  if (taskError) {
    console.error("Error fetching weekly tasks");
    return <>Please try again.</>;
  }

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
    <div className="outlet outlet-container ml-8 mt-2">
      <h1 className="text-3xl font-bold text-left mt-[2.5rem] mb-0 weekly-heading">
        Weekly Tasks
      </h1>
      {weekdays.map((day) => (
        <div key={day} className="mt-10">
          <h1 className="text-5xl font-bold mb-10 text-teal-800 text-left day-name">
            {day}
          </h1>
          {allTasks[day] && allTasks[day].length > 0 ? (
            <Task
              taskList={allTasks[day]}
              category={""}
              allTasks={weeklyTaskList}
              type="weekly"
            />
          ) : (
            "What an empty day!"
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyTasks;
