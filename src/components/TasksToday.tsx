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
  const [tasksToday, setTasksToday] = useState({
    health: [],
    wealth: [],
    knowledge: [],
  });

  const makeTaskList = () => {
    const today = new Date().toISOString().split("T")[0];
    const healthTasks = taskList.filter(
      (task) =>
        task?.taskCategory === "health" &&
        task?.scheduledOn?.split("T")[0] === today
    );
    const wealthTasks = taskList.filter(
      (task) =>
        task?.taskCategory === "wealth" &&
        task?.scheduledOn?.split("T")[0] === today
    );
    const knowledgeTasks = taskList.filter(
      (task) =>
        task?.taskCategory === "knowledge" &&
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
    const completedToday = taskList.filter((task) => task.completedOn).length;
    if (targetToday !== 0) {
      setAllTasksComplete(completedToday === targetToday);
    }
  }, [taskList]);

  if (!taskList)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="tasks-today mt-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-left text-primary mb-6">
        Focus on Today
      </h1>

      <DoneForToday trigger={allTasksComplete} />

      <div className="space-y-8 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-4 border-b pb-2">
            Health
          </h2>
          {tasksToday.health.length > 0 ? (
            <Task
              category={"Health"}
              allTasks={taskList}
              taskList={tasksToday.health}
              type="daily"
            />
          ) : (
            <p className="text-gray-400 italic">No health tasks today.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4 border-b pb-2">
            Wealth
          </h2>
          {tasksToday.wealth.length > 0 ? (
            <Task
              category={"Wealth"}
              allTasks={taskList}
              taskList={tasksToday.wealth}
              type="daily"
            />
          ) : (
            <p className="text-gray-400 italic">No wealth tasks today.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">
            Knowledge
          </h2>
          {tasksToday.knowledge.length > 0 ? (
            <Task
              category={"Knowledge"}
              allTasks={taskList}
              taskList={tasksToday.knowledge}
              type="daily"
            />
          ) : (
            <p className="text-gray-400 italic">No knowledge tasks today.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <AddTask />
      </div>
    </div>
  );
};

export default TasksToday;
