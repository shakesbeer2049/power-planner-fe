import { useEffect, useState } from "react";
import "../styles/tasksToday.css";
import { TbMoodEmpty } from "react-icons/tb";
import handleTaskUpdate from "../context/TaskContext";
import DeleteTaskModal from "./DeleteTaskModal";
import { TaskDetailsType } from "../types/types";
import Task from "./Task";

type TasksOnDayXProps = {
  taskList: TaskDetailsType[];
  weekDay: string;
  dateOnThisDay: Date;
};

const TasksOnDayX = ({
  taskList,
  weekDay,
  dateOnThisDay,
}: TasksOnDayXProps) => {
  console.log("date", dateOnThisDay);
  const [tasksOnThisDay, setTasksOnThisDay] = useState<{
    health: TaskDetailsType[];
    wealth: TaskDetailsType[];
    knowledge: TaskDetailsType[];
  }>({
    health: [],
    wealth: [],
    knowledge: [],
  });
  /**
   * Filters tasks that repeat on the given weekDay and
   * separates them by category, then updates the state
   * with the new lists of tasks.
   */
  const makeTaskList = () => {
    const tasksOnThisDay = taskList.filter((task) =>
      task?.taskRepeatsOn?.includes(weekDay)
    );
    console.log("tasksOnThisDay", tasksOnThisDay);
    const healthTasks = tasksOnThisDay.filter(
      (task) => task?.taskCategory == "health"
    );
    const wealthTasks = tasksOnThisDay.filter(
      (task) => task?.taskCategory == "wealth"
    );
    const knowledgeTasks = tasksOnThisDay.filter(
      (task) => task?.taskCategory == "knowledge"
    );
    setTasksOnThisDay({
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
      <h1 className="text-5xl font-bold mb-16 mt-16 text-teal-800 text-left">
        {weekDay}
      </h1>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-left">Health</h2>
      <div className="tasks">
        <Task
          taskList={tasksOnThisDay.health}
          category="Health"
          allTasks={taskList}
        />
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-left">Knowledge</h2>
      <div className="tasks">
        {tasksOnThisDay.wealth?.length > 0 ? (
          tasksOnThisDay.wealth.map((task) => (
            <div className="task-h1-input" key={task.taskId}>
              <DeleteTaskModal task={task} />{" "}
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="task"
                id="task"
                checked={Boolean(task.completedOn)}
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
                className={task.completedOn ? "completed" : ""}
              >
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-left">
            {" "}
            <TbMoodEmpty className="inline" /> So Empty!{" "}
          </span>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-left">Wealth</h2>
      <div className="tasks">
        {tasksOnThisDay.knowledge?.length > 0 ? (
          tasksOnThisDay.knowledge.map((task) => (
            <div className="task-h1-input" key={task.taskId}>
              <DeleteTaskModal task={task} />{" "}
              <input
                type="checkbox"
                checked={Boolean(task.completedOn)}
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
                className={task.completedOn ? "completed" : ""}
              >
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-left">
            {" "}
            <TbMoodEmpty className="inline" /> So Empty!{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default TasksOnDayX;
