import { useEffect, useState } from "react";
import { getYears, months } from "../utils/daysAndDates";
import { callApi } from "../utils/callApi";
import type { TaskDetailsType } from "../types/types";

const Performance: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskDetailsType[]>([]);
  const years = getYears();
  const [year, setYear] = useState(years[years.length - 1]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetchAllTasks = async () => {
      const res = await callApi("/tasks/all", "GET", {});
      setTaskList(res.data.tasks);
    };
    fetchAllTasks();
  }, []);

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const makeMonthlyData = () => {
    const tasksThisYear = taskList.filter((task) => {
      const createdDate = new Date(task.createdOn);
      return createdDate.getFullYear() === year;
    });
    const monthlyTasksArray: TaskDetailsType[][] = Array.from(
      { length: 12 },
      () => []
    );

    tasksThisYear.forEach((task) => {
      const month = new Date(task.createdOn).getMonth();
      monthlyTasksArray[month].push(task);
    });

    return monthlyTasksArray.map((monthTasks, index) => {
      const completed = monthTasks.filter((task) => task.completedOn).length;
      return (
        <tr key={index}>
          <td className="font-semibold text-gray-700">{months[index]}</td>
          <td>
            {completed} / {monthTasks.length}
          </td>
          <td>
            <progress
              className="progress progress-primary w-40"
              value={completed}
              max={monthTasks.length}
            ></progress>
          </td>
        </tr>
      );
    });
  };

  const makeWeeklyData = () => {
    const monthIndex = months.indexOf(month);
    const tasksThisMonth = taskList.filter((task) => {
      const taskDate = new Date(task.createdOn);
      return (
        taskDate.getFullYear() === year && taskDate.getMonth() === monthIndex
      );
    });

    const weeklyTasksArray: TaskDetailsType[][] = Array.from(
      { length: 5 },
      () => []
    );

    const getWeekOfMonth = (date: Date) => {
      const first = new Date(date.getFullYear(), date.getMonth(), 1);
      return Math.ceil((date.getDate() + first.getDay()) / 7);
    };

    tasksThisMonth.forEach((task) => {
      const week = getWeekOfMonth(new Date(task.createdOn)) - 1;
      weeklyTasksArray[week].push(task);
    });

    return weeklyTasksArray.map((weekTasks, index) => {
      const completed = weekTasks.filter((task) => task.completedOn).length;
      return (
        <tr key={index}>
          <td className="font-semibold text-gray-700">Week {index + 1}</td>
          <td>
            {completed} / {weekTasks.length}
          </td>
          <td>
            <progress
              className="progress progress-accent w-40"
              value={completed}
              max={weekTasks.length}
            ></progress>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Performance Review
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <select
          className="select select-primary"
          onChange={handleYearSelect}
          value={year}
        >
          <option disabled>Select Year</option>
          {years.map((ye) => (
            <option key={ye}>{ye}</option>
          ))}
        </select>
        <select
          className="select select-secondary"
          onChange={handleMonthSelect}
          value={month}
        >
          <option disabled value="">
            Select Month
          </option>
          {months.map((mon) => (
            <option key={mon}>{mon}</option>
          ))}
        </select>
      </div>

      {!year && !month && (
        <p className="text-center text-lg text-gray-600">
          Please select a year to begin
        </p>
      )}

      {year && !month && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Month</th>
                <th>Completed</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>{makeMonthlyData()}</tbody>
          </table>
        </div>
      )}

      {year && month && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Week</th>
                <th>Completed</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>{makeWeeklyData()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Performance;
