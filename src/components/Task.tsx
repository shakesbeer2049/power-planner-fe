import DeleteTaskModal from "./DeleteTaskModal";
import { TbMoodEmpty } from "react-icons/tb";
import "../styles/Task.css";
import { TaskDetailsType } from "../types/types";
import { useTask } from "../context/TaskContext";

type TaskProps = {
  category: string;
  taskList: TaskDetailsType[];
  allTasks: TaskDetailsType[];
};
const Task: React.FC<TaskProps> = ({ allTasks, category, taskList }) => {
  const TaskContext = useTask();
  const { handleTaskUpdate } = TaskContext;
  return (
    <div className="tasks">
      <h2 className="text-2xl font-bold mb-4 text-left">{category}</h2>
      <ul>
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <li key={task.taskId} className="task-h1-input">
              <DeleteTaskModal task={task} />{" "}
              <input
                type="checkbox"
                checked={Boolean(task.completedOn)}
                className="checkbox checkbox-accent"
                name="task"
                id="task"
                onChange={() => {
                  handleTaskUpdate(task, allTasks);
                }}
              />{" "}
              <h4
                onClick={() => {
                  const modal = document.getElementById(
                    String(task.taskId)
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                key={task.taskId}
                className={
                  task.completedOn &&
                  task.scheduledOn.includes(String(new Date()))
                    ? "completed"
                    : ""
                }
              >
                {task.taskName}
              </h4>
            </li>
          ))
        ) : (
          <span>
            <TbMoodEmpty className="inline" /> So Empty!
          </span>
        )}
      </ul>
    </div>
  );
};

export default Task;
