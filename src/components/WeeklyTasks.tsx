import TasksToday from "./TasksOnDayX";
import { isDateInCurrentWeek } from "../utils/daysAndDates";
import { useContext } from "react";
import TasksOnDayX from "./TasksOnDayX";

import TaskContext, { useTask } from "../context/TaskContext";

const WeeklyTasks = () => {
  const TaskContext = useTask();
  const { taskList, handleTaskUpdate } = TaskContext;

  console.log("tasks", taskList);

  const thisWeekTasks = taskList.filter((task) =>
    isDateInCurrentWeek(task.createdOn)
  );
  
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-[2.5rem] mb-0 weekly-heading">
        Weekly Tasks
      </h1>
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Monday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Tuesday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Wednesday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Thursday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Friday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Saturday"}
      />
      <TasksOnDayX
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Sunday"}
      />
    </>
  );
};

export default WeeklyTasks;
