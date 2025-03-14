import { useEffect, useState } from "react";
import "../styles/tasksToday.css";
import { TbMoodEmpty } from "react-icons/tb";

import DeleteTaskModal from "./DeleteTaskModal";
import { TaskDetailsType } from "../types/types";

type TasksOnDayXProps = {
  handleTaskUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    task: TaskDetailsType
  ) => void;
  taskList: TaskDetailsType[];
  weekDay: string;
};
const TasksOnDayX = ({
  handleTaskUpdate,
  taskList,
  weekDay,
}: TasksOnDayXProps) => {
  const [tasksToday, setTasksToday] = useState<{
    health: TaskDetailsType[];
    wealth: TaskDetailsType[];
    knowledge: TaskDetailsType[];
  }>({
    health: [],
    wealth: [],
    knowledge: [],
  });

  const makeTaskList = () => {
    const tasksToday = taskList.filter((task) =>
      task?.taskRepeatsOn?.includes(weekDay)
    );
    const healthTasks = tasksToday.filter(
      (task) => task?.taskCategory == "health"
    );
    const wealthTasks = tasksToday.filter(
      (task) => task?.taskCategory == "wealth"
    );
    const knowledgeTasks = tasksToday.filter(
      (task) => task?.taskCategory == "knowledge"
    );

    setTasksToday({
      health: healthTasks,
      wealth: wealthTasks,
      knowledge: knowledgeTasks,
    });
  };

  useEffect(() => {
    if (taskList?.length > 0) makeTaskList();
  }, [taskList]);

  return (
    <div className="tasks-today text-left mt-16 ml-8 lg:mt-0">
      <h1 className="text-5xl font-bold text-center mb-16 mt-16 text-teal-800">
        {weekDay}
      </h1>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Health</h2>
      <div className="tasks">
        {tasksToday.health?.length > 0 ? (
          tasksToday.health.map((task) => (
            <div className="task-h1-input" key={task.taskId}>
              <DeleteTaskModal task={task} />{" "}
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                name="task"
                id="task"
                checked={task.isCompleted}
                onChange={(e) => handleTaskUpdate(e, task)}
              />{" "}
              <h4
                onClick={() => {
                  const modal = document.getElementById(
                    String(task.taskId)
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                key={task.taskId}
                className={task.isCompleted ? "completed" : ""}
              >
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            <TbMoodEmpty className="inline" /> So Empty!{" "}
          </span>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Knowledge</h2>
      <div className="tasks">
        {tasksToday.wealth?.length > 0 ? (
          tasksToday.wealth.map((task) => (
            <div className="task-h1-input" key={task.taskId}>
              <DeleteTaskModal task={task} />{" "}
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="task"
                id="task"
                checked={task.isCompleted}
                onChange={(e) => handleTaskUpdate(e, task)}
              />{" "}
              <h4
                onClick={() => {
                  const modal = document.getElementById(
                    String(task.taskId)
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                key={task.taskId}
                className={task.isCompleted ? "completed" : ""}
              >
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            <TbMoodEmpty className="inline" /> So Empty!{" "}
          </span>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Wealth</h2>
      <div className="tasks">
        {tasksToday.knowledge?.length > 0 ? (
          tasksToday.knowledge.map((task) => (
            <div className="task-h1-input" key={task.taskId}>
              <DeleteTaskModal task={task} />{" "}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) => handleTaskUpdate(e, task)}
                name="task"
                id="task"
                className="checkbox checkbox-accent"
              />{" "}
              <h4
                onClick={() => {
                  const modal = document.getElementById(
                    String(task.taskId)
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                key={task.taskId}
                className={task.isCompleted ? "completed" : ""}
              >
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            <TbMoodEmpty className="inline" /> So Empty!{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default TasksOnDayX;
