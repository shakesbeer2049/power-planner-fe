import { useEffect, useState } from "react";
import "../styles/tasksToday.css";
import "react-toastify/dist/ReactToastify.css";
import Task from "./Task";
import AddTask from "./AddTask";
import { TaskDetailsType } from "../types/types";
import { useTask } from "../context/TaskContext";
import DoneForToday from "./DoneForToday";
const TasksToday = () => {
  const TaskContext = useTask();

  const { taskList } = TaskContext;
  const [allTasksComplete, setAllTasksComplete] = useState(false);

  const [tasksToday, setTasksToday] = useState<{
    health: TaskDetailsType[];
    wealth: TaskDetailsType[];
    knowledge: TaskDetailsType[];
  }>({
    health: [],
    wealth: [],
    knowledge: [],
  });

  // Functions
  const makeTaskList = () => {
    console.log("tasksToday", taskList);
    const today = new Date().toISOString().split("T")[0];
    const healthTasks = taskList.filter(
      (task) =>
        task?.taskCategory == "health" &&
        task?.scheduledOn?.split("T")[0] === today
    );
    const wealthTasks = taskList.filter(
      (task) =>
        task?.taskCategory == "wealth" &&
        task?.scheduledOn?.split("T")[0] === today
    );
    const knowledgeTasks = taskList.filter(
      (task) =>
        task?.taskCategory == "knowledge" &&
        task?.scheduledOn?.split("T")[0] === today
    );

    setTasksToday({
      health: healthTasks,
      wealth: wealthTasks,
      knowledge: knowledgeTasks,
    });
  };

  useEffect(() => {
    makeTaskList();

    const targetToday = taskList.length;

    const completedToday = taskList
      .map((task) => task.completedOn)
      .filter(Boolean).length;

    if (targetToday !== 0) {
      setAllTasksComplete(completedToday === targetToday);
    }
  }, [taskList]);

  if (!taskList) {
    return <>Please wait ...</>;
  } else
    return (
      <div className="tasks-today text-left mt-2 ml-8">
        <h1 className="text-3xl mt-[2.5rem] font-bold text-left">
          FOCUS ON TODAY
        </h1>

        <DoneForToday trigger={allTasksComplete} />
        <br />
        <Task
          category={"Health"}
          allTasks={taskList}
          taskList={tasksToday.health}
          type={"daily"}
        />

        <Task
          category={"Wealth"}
          allTasks={taskList}
          taskList={tasksToday.wealth}
          type={"daily"}
        />

        <Task
          category={"Knowledge"}
          allTasks={taskList}
          taskList={tasksToday.knowledge}
          type={"daily"}
        />

        <AddTask isModal={false} />
      </div>
    );
};

export default TasksToday;
