import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/stats.css";
import Card from "./Card";
import { generateStats } from "../utils/taskCalculations";
import { callApi } from "../utils/callApi";

const Stats = () => {
  const [taskList, setTaskList] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    achievedPercent: "0",
  });
  const [selectedStat, setSelectedStat] = useState("overall");

  useEffect(() => {
    const fetchAllTasks = async () => {
      const res = await callApi("/tasks/all", "GET", {});
      setTaskList(res.data.tasks);
    };
    fetchAllTasks();
  }, []);

  useEffect(() => {
    const { totalTasks, completedTasks, achievedPercent } = generateStats(
      taskList,
      selectedStat
    );
    setStats({ totalTasks, completedTasks, achievedPercent });
  }, [taskList, selectedStat]);

  const chartData = [
    {
      name: "Total",
      value: stats.totalTasks,
    },
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Achievement %",
      value: parseFloat(stats.achievedPercent),
    },
  ];

  return (
    <div className="dashboard-div px-4 md:px-12 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">
        Stats
      </h1>

      <ul
        className="menu menu-horizontal justify-center bg-base-200 rounded-box mb-8 flex items-center md:justify-center"
        style={{ width: "100%" }}
      >
        <li
          className={selectedStat === "overall" ? "selected-stat" : ""}
          onClick={() => setSelectedStat("overall")}
        >
          <a>Overall</a>
        </li>
        <li
          className={selectedStat === "weekly" ? "selected-stat" : ""}
          onClick={() => setSelectedStat("weekly")}
        >
          <a>This Week</a>
        </li>
        <li
          className={selectedStat === "yearly" ? "selected-stat" : ""}
          onClick={() => setSelectedStat("yearly")}
        >
          <a>This Year</a>
        </li>
      </ul>

      <div className="performance grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Total Tasks" data={stats.totalTasks} />
        <Card title="Completed" data={stats.completedTasks} />
        <Card title="Achievement" data={`${stats.achievedPercent}%`} />
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#14b8a6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
