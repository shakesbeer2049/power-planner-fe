import DeleteTaskModal from "./DeleteTaskModal";
import { TbMoodEmpty } from "react-icons/tb";
import "../styles/Task.css";
import type { TaskDetailsType } from "../types/types";
import { useTask } from "../context/TaskContext";
import { toast } from "react-toastify";
import { format } from "date-fns";

type TaskProps = {
  category: string;
  taskList: TaskDetailsType[];
  allTasks: TaskDetailsType[];
  type: string;
};

const Task: React.FC<TaskProps> = ({ allTasks, category, taskList, type }) => {
  const TaskContext = useTask();
  const { handleTaskUpdate } = TaskContext;

  const onTaskUpdate = (task: TaskDetailsType) => {
    if (type === "weekly") {
      toast.warning("Cannot update tasks in weekly view", { autoClose: 900 });
      return;
    }
    handleTaskUpdate(task, allTasks);
  };

  const handleTaskChecked = (task: TaskDetailsType): boolean => {
    const today = format(new Date(), "yyyy-MM-dd");
    if (task.completedOn && task.completedOn?.includes(today)) {
      return true;
    }
    return false;
  };

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
                checked={handleTaskChecked(task)}
                className="checkbox checkbox-accent"
                name="task"
                id="task"
                onChange={() => onTaskUpdate(task)}
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
