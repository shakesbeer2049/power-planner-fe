import { useState } from "react";
import { CSSObject } from "@emotion/react";
import Select, { MultiValue } from "react-select";
import { getDaysLeft } from "../utils/daysAndDates";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext.tsx";
// import MultiSelect from "./MultiSelect";

import { TaskDetailsType } from "../types/types";

const AddTaskModal = () => {
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
    completedOn: "",
  });

  //handle task input
  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  console.log(userDetails, "userDetails");

  // Add Task Handler
  const addTaskHandler = async () => {
    // Task object
    const taskObj = {
      taskId: "",
      taskName: taskDetails.taskName,
      taskCategory: taskDetails.taskCategory,
      taskRepeatsOn: taskDetails.taskRepeatsOn,
      relatedUserId: userDetails?.userId,
    };

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

  // task repeats on handler
  const taskRepeatsOnHandler = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    const repeatsOn = newValue.map((repeat) => repeat.value);
    setTaskDetails({ ...taskDetails, taskRepeatsOn: repeatsOn });
  };

  // Handle Task Category
  const taskCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };

  const selectStyles = {
    container: (css: CSSObject) => ({ ...css, width: "150px" }),
  };
  return (
    <div className="modal-box add-task-modal">
      <h3 className="font-bold text-xl text-center mb-4">Add Task</h3>
      {/* Task input */}
      <div className="add-task-content lg:text-center">
        <input
          type="text"
          name="add-task-input"
          id="add-task-input"
          placeholder="I will ... "
          onChange={handleTaskInput}
          value={taskDetails.taskName}
          className="input"
        />
        {/* Task Attributes */}
        <div className="task-category-div">
          {/* choose category */}
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

          {/* date selection */}
          {/* <input type="date" name="task-date" id="task-date" /> */}

          <div className="react-select lg:ml-20">
            <Select
              options={getDaysLeft()}
              isMulti
              hideSelectedOptions={true}
              placeholder="Repeats on"
              // styles ={{ "z-index": 5 }}
              onChange={taskRepeatsOnHandler}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              value={taskDetails.taskRepeatsOn.map((day) => ({
                value: day,
                label: day,
              }))}
              maxMenuHeight={100}
              styles={selectStyles}
            />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" id="save-cancel-task">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn mr-5">Close</button>
            <button
              className="btn btn-primary text-white"
              onClick={addTaskHandler}
            >
              Save
            </button>
          </form>
          {/* <ToastContainer /> */}
        </div>
      </div>

      {/* <MultiSelect /> */}
    </div>
  );
};

export default AddTaskModal;
