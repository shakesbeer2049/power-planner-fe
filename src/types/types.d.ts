export type TaskDetailsType = {
  scheduledOn: string;
  completedOn: string | Date;
  taskId?: string;
  taskName: string;
  taskRepeatsOn: string[];
  taskCategory: string;
  createdOn: string | Date;
  relatedUserId: string;
};

export type DeleteTaskModalProps = {
  task: TaskDetailsType;
};

export type DrawerProps = {
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
};

export type CustomJWTPayload = {
  id: string;
};

export type UseApiCallerReturnType = {
  data: TaskDetailsType[] | null;
  isLoading: boolean;
  isError: Error | null;
  refetch: () => Promise<void>;
};
