export type TaskDetailsType = {
    taskId?: string;
    taskName: string;
    taskRepeatsOn: string[];
    taskCategory: string;
    isCompleted?: boolean;
    createdOn: string;
    relatedUserId: string;
  };

export type DeleteTaskModalProps = {
    task: TaskDetailsType;
  };

export type DrawerProps = {
    selectedMenu : string;
    setSelectedMenu : React.Dispatch<React.SetStateAction<string>>;
}

export type CustomJWTPayload = {
    id: string;
  };

