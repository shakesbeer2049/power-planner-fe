import DeleteTaskModal from "./DeleteTaskModal";
import { TbMoodEmpty } from "react-icons/tb";
import "../styles/Task.css";
import { TaskDetailsType } from "../types/types";
type TaskProps = {
  category: string;
  taskList: TaskDetailsType[];
  handleTaskUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    task: TaskDetailsType
  ) => void;
};
const Task: React.FC<TaskProps> = ({
  category,
  taskList,
  handleTaskUpdate,
}) => {
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
                onChange={(e) => {
                  handleTaskUpdate(e, task);
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
                className={task.completedOn ? "completed" : ""}
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
