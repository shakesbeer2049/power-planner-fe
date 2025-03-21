import { isDateInCurrentWeek } from "../utils/daysAndDates";
import TasksOnDayX from "./TasksOnDayX";

import useApiCaller from "../hooks/useApiCaller";

const WeeklyTasks = () => {
  // Weekly Tasks
  const url =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BE_URL
      : import.meta.env.VITE_PROD_BE_URL;

  const {
    data: weeklyTaskList,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller(url + "/tasks/weekly", "GET", {});

  if (tasksLoading) {
    return <>Please wait ...</>;
  } else if (taskError) {
    console.log("Some error occured while fetching weekly tasks");
    return <>Please try again.</>;
  } else
    return (
      <>
        <h1 className="text-3xl font-bold text-center mt-[2.5rem] mb-0 weekly-heading">
          Weekly Tasks
        </h1>
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Monday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Tuesday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Wednesday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Thursday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Friday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Saturday"} />
        <TasksOnDayX taskList={weeklyTaskList ?? []} weekDay={"Sunday"} />
      </>
    );
};

export default WeeklyTasks;
