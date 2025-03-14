import { useTask } from "../context/TaskContext";

import { DeleteTaskModalProps } from "../types/types";

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task }) => {
  const context = useTask();

  return (
    <>
      <dialog id={task.taskId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete this task!</h3>
          <p className="py-4">Click Delete to confirm or Close to cancel.</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => context.handleTaskDelete(task)}
              disabled={task.isCompleted}
            >
              Delete
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteTaskModal;
