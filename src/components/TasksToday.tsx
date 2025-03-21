import { useEffect, useState } from "react";
import "../styles/tasksToday.css";
import "react-toastify/dist/ReactToastify.css";
import Task from "./Task";
import AddTask from "./AddTask";
import { TaskDetailsType } from "../types/types";
import { useTask } from "../context/TaskContext";
const TasksToday = () => {
  const TaskContext = useTask();
  const { taskList } = TaskContext;

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
    const healthTasks = taskList.filter(
      (task) => task?.taskCategory == "health"
    );
    const wealthTasks = taskList.filter(
      (task) => task?.taskCategory == "wealth"
    );
    const knowledgeTasks = taskList.filter(
      (task) => task?.taskCategory == "knowledge"
    );

    setTasksToday({
      health: healthTasks,
      wealth: wealthTasks,
      knowledge: knowledgeTasks,
    });
  };

  useEffect(() => {
    makeTaskList();
  }, [taskList]);

  if (!taskList) {
    return <>Please wait ...</>;
  } else
    return (
      <div className="tasks-today text-left mt-2 ml-8">
        <h1 className="text-3xl mt-[2.5rem] font-bold text-center">
          FOCUS ON TODAY
        </h1>

        <Task
          category={"Health"}
          allTasks={taskList}
          taskList={tasksToday.health}
        />

        <Task
          category={"Wealth"}
          allTasks={taskList}
          taskList={tasksToday.wealth}
        />

        <Task
          category={"Knowledge"}
          allTasks={taskList}
          taskList={tasksToday.knowledge}
        />

        <AddTask isModal={false} />
      </div>
    );
};

export default TasksToday;
