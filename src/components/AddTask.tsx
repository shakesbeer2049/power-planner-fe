import React, { useState } from "react";
import { Plus } from "lucide-react";
import { getDaysLeft } from "../utils/daysAndDates";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext.tsx";
import { TaskDetailsType } from "../types/types";
import { motion } from "framer-motion";
import "../styles/drawer.css";
type AddTaskProps = {
  isModal: boolean;
};

const AddTask: React.FC<AddTaskProps> = ({ isModal }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const taskContext = useTask();
  const { taskList, setTaskList } = taskContext;
  const AuthContext = useAuth();
  const { userDetails } = AuthContext;

  const [taskDetails, setTaskDetails] = useState<TaskDetailsType>({
    taskId: "",
    taskName: "",
    taskRepeatsOn: [],
    taskCategory: "",
    relatedUserId: "",
    createdOn: "",
    scheduledOn: "",
    completedOn: "",
  });

  //handle task input
  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  // Add Task Handler
  const addTaskHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // Task object
    const taskObj: TaskDetailsType = {
      taskId: "",
      taskName: taskDetails.taskName,
      taskCategory: taskDetails.taskCategory,
      taskRepeatsOn: selectedDays,
      relatedUserId: userDetails?.userId || "",
      createdOn: "",
      completedOn: "",
      scheduledOn: "",
    };

    if (!taskObj.relatedUserId) {
      toast.warning(
        "You are not logged in! Try reloading the page if the issue persists.",
        {
          autoClose: 1000,
          theme: "dark",
          pauseOnFocusLoss: false,
          closeOnClick: true,
        }
      );
      return;
    }

    // validate fields
    let formValid = true;
    if (
      !taskObj.taskName ||
      !taskObj.taskCategory ||
      !taskObj.taskRepeatsOn.length
    )
      formValid = false;

    if (formValid) {
      const res = await taskService.addTask(taskObj);

      if (res.status === "success") {
        const insertedTask = res.data.task;
        setTaskList([...taskList, insertedTask]);
        setTaskDetails({ ...taskDetails, taskName: "" });
        toast.success("Task Added.", {
          autoClose: 1000,
          theme: "dark",
          pauseOnFocusLoss: false,
          closeOnClick: true,
        });
      } else window.alert("error in adding Task");
    } else {
      toast.warning("Please fill all the task details!", {
        autoClose: 1000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    }
  };

  // Handle Task Category
  const taskCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };

  const daysOfWeek = getDaysLeft();

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // handle day toggle
  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const formContent = (
    <motion.form
      // initial={{ opacity: 0, x: 0, y: 0 }}
      // animate={isModal ? {} : { opacity: 1, x: "-5%", y: "-100%" }}
      // transition={{ duration: 0.5 }}
      className="space-y-4 form-data-main bg-white"
      onSubmit={addTaskHandler}
    >
      <input
        id="task-name"
        type="text"
        value={taskDetails.taskName}
        onChange={handleTaskInput}
        placeholder="Enter your task"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="task-category">
        <select
          name="task-category"
          id="task-category"
          className=""
          onChange={taskCategoryHandler}
          value={taskDetails.taskCategory}
        >
          <option value="">Category</option>
          <option value={"health"}>Health</option>
          <option value={"wealth"}>Wealth</option>
          <option value={"knowledge"}>Knowledge</option>
        </select>
      </div>
      <div>
        <p className="font-medium">Repeats on:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`px-3 py-1 rounded-full border ${
                selectedDays.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
        <button type="button" onClick={toggleForm} className="text-red-500">
          Cancel
        </button>
      </div>
    </motion.form>
  );

  return (
    <>
      {!isModal ? (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-md task-form-container-mobile">
          {!isFormVisible ? (
            <button
              onClick={toggleForm}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 w-fit"
            >
              <Plus size={18} /> Add Task
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {formContent}
            </motion.div>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={toggleForm}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 w-fit"
          >
            <Plus size={18} /> Add Task
          </button>
          {isFormVisible && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50  task-form-container-modal"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full ">
                {formContent}
              </div>
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default AddTask;
