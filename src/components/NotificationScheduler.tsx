import { useState, useEffect } from "react";

const NotificationScheduler = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Ask permission when component mounts
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = () => {
    if (Notification.permission !== "granted") {
      alert("Please allow notifications to receive reminders.");
      return;
    }

    const [hour, minute] = time.split(":").map(Number);
    const now = new Date();
    const target = new Date();

    target.setHours(hour, minute, 0, 0);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      alert("Please pick a time in the future.");
      return;
    }

    setTimeout(() => {
      new Notification("🔔 Skillbound Reminder", {
        body: "Don't forget to complete your tasks!",
      });
    }, diff);

    alert(`Notification set for ${time}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Set Task Reminder</h2>
      <div className="flex gap-4 items-center">
        <input
          type="time"
          className="input input-bordered"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="btn btn-primary" onClick={scheduleNotification}>
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default NotificationScheduler;
