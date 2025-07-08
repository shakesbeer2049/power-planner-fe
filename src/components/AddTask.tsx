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

const AddTask = () => {
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

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  const addTaskHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskObj: TaskDetailsType = {
      ...taskDetails,
      taskRepeatsOn: selectedDays,
      relatedUserId: userDetails?.userId || "",
    };

    if (!taskObj.relatedUserId) {
      toast.warning("You are not logged in! Try reloading.", {
        autoClose: 1000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
      return;
    }

    if (!taskObj.taskName || !taskObj.taskCategory || !selectedDays.length) {
      toast.warning("Please fill all the task details!", {
        autoClose: 1000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
      return;
    }

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
    } else {
      window.alert("Error adding task");
    }
  };

  const taskCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };

  const daysOfWeek = getDaysLeft();
  const toggleForm = () => setIsFormVisible(!isFormVisible);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const formContent = (
    <motion.form
      className="space-y-4 form-data-main bg-white"
      onSubmit={addTaskHandler}
    >
      <input
        id="task-name"
        type="text"
        value={taskDetails.taskName}
        onChange={handleTaskInput}
        placeholder="Enter your task"
        className="w-full p-3 border border-gray-300 rounded-lg font-medium"
      />

      <select
        id="task-category"
        className="w-full p-3 border border-gray-300 rounded-lg font-medium"
        onChange={taskCategoryHandler}
        value={taskDetails.taskCategory}
      >
        <option value="">Select Category</option>
        <option value="health">Health</option>
        <option value="wealth">Wealth</option>
        <option value="knowledge">Knowledge</option>
      </select>

      <div>
        <p className="font-semibold">Repeats on:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`px-3 py-1 rounded-full border font-medium transition-colors duration-200 ${
                selectedDays.includes(day)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
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
      <button
        onClick={toggleForm}
        className="fixed bottom-3 right-3 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium"
      >
        <Plus size={18} className="text-lg" />
        <span className="sm:block">Add Task</span>
      </button>
      {isFormVisible && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            {formContent}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AddTask;
