import { useMenuContext } from "../../context/MenuContext";
import styles from "./Dashboard.module.css";
const Dashboard = () => {
  const { activeMenu } = useMenuContext();

  const Info = [
    {
      customer: "abc",
      package: "Premium",
      price: "1,000,000",
      status: "pending",
    },
  ];

  return (
    activeMenu === "dashboard" && (
      <div className={styles["dashboard-container"]}>
        {/*
        <div className={styles["card-container"]}>
          <div className={styles["card"]}>

            {Info.map((item) => {
              return (
                <>
                  <div className={styles["customer"]}>{item.customer}</div>
                  <div className={styles["package"]}>{item.package}</div>
                  <div className={styles["price"]}>{item.price}</div>
                  <div className={styles["status"]}>{item.status}</div>
                </>
              );
            })}
          </div>
        </div>*/}
      </div>
    )
  );
};

export default Dashboard;
