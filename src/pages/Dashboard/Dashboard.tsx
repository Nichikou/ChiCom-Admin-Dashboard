import styles from "./Dashboard.module.css";
import { Chart as chartjs } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string>(
    new Date().toLocaleString("vi-VN")
  );

  useEffect(() => {
    const fetchRevenue = () => {
      fetch("http://localhost:3000/statistic/this-month")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.body.statusCount.pending);
          setLastUpdate(new Date().toLocaleString("vi-VN"));
        })
        .catch((err) => console.log(err));
    };

    fetchRevenue();

    const interval = setInterval(fetchRevenue, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["dashboard-container"]}>
      Latest Update: {lastUpdate} <br />
      Last Month: {lastMonthRevenue} <br />
      This Month: {thisMonthRevenue}
    </div>
  );
};

export default Dashboard;
