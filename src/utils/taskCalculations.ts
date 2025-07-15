import type { TaskDetailsType } from "../types/types";
import { getToday, isDateInCurrentWeek } from "./daysAndDates";
import { format, startOfWeek, addDays } from "date-fns";

export const calculateDailyProgress = (taskData: TaskDetailsType[]) => {
  const tasksToday = taskData.filter((task) =>
    task.taskRepeatsOn.includes(getToday())
  );
  const dailyTaskCount = tasksToday.length;
  const completedTasks = tasksToday.filter((task) => task.completedOn).length;
  return parseInt(((completedTasks / dailyTaskCount) * 100).toString());
};

export const generateStats = (
  tasks: TaskDetailsType[],
  selectedStat: string
) => {
  let totalTasks = 0;
  let completedTasks = 0;

  if (selectedStat === "overall") {
    totalTasks = tasks.length || 0;
    completedTasks = tasks.filter((task) => task.completedOn).length;
  } else if (selectedStat === "weekly") {
    totalTasks = tasks.filter((task) =>
      isDateInCurrentWeek(
        typeof task.createdOn === "string"
          ? task.createdOn
          : task.createdOn.toISOString()
      )
    ).length;

    completedTasks = tasks.filter(
      (task) =>
        isDateInCurrentWeek(
          typeof task.createdOn === "string"
            ? task.createdOn
            : task.createdOn.toISOString()
        ) && task.completedOn
    ).length;
  } else if (selectedStat === "yearly") {
    const thisYear = new Date().getFullYear().toString();

    totalTasks = tasks.filter((task) =>
      (typeof task.createdOn === "string"
        ? task.createdOn
        : task.createdOn?.toISOString()
      )?.includes(thisYear)
    ).length;
    completedTasks = tasks.filter(
      (task) =>
        (typeof task.createdOn === "string"
          ? task.createdOn
          : task.createdOn?.toISOString()
        )?.includes(thisYear) && task.completedOn
    ).length;
  }
  let achievedPercent = "0";
  if (completedTasks > 0) {
    achievedPercent = ((completedTasks / totalTasks) * 100).toFixed(1);
  }

  return { totalTasks, completedTasks, achievedPercent };
};

export const createWeeklyTasks = (tasks: TaskDetailsType[]) => {
  try {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
    const weekMap: Record<string, string> = {};
    const dateTaskMap: Record<string, TaskDetailsType[]> = {};

    // Create a mapping of day names to dates
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(weekStart, i);
      const dayName = format(currentDate, "EEEE");
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      weekMap[dayName] = formattedDate;
      dateTaskMap[formattedDate] = []; // Ensure we initialize arrays properly
    }

    // Assign tasks to their correct date
    for (const task of tasks) {
      const taskScheduledOn = task.scheduledOn.split("T")[0]; // Extract date part only
      if (dateTaskMap[taskScheduledOn]) {
        dateTaskMap[taskScheduledOn].push(task);
      }
    }

    console.log("Week Map:", weekMap);
    console.log("Date Task Map:", dateTaskMap);

    // Convert the `dateTaskMap` into a `dayName` → tasks mapping
    const weeklyTasksFinal: Record<string, TaskDetailsType[]> = {};
    for (const dayName in weekMap) {
      if (dateTaskMap[weekMap[dayName]]) {
        weeklyTasksFinal[dayName] = dateTaskMap[weekMap[dayName]];
      } else {
        weeklyTasksFinal[dayName] = []; // Ensure empty arrays for missing days
      }
    }

    return weeklyTasksFinal;
  } catch (error) {
    console.error("Error in createWeeklyTasks:", error);
    return {}; // Return empty object on failure
  }
};
