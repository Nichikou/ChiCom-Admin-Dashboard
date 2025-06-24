import styles from "./SideBar.module.css";
import { useState } from "react";
import { RiShutDownLine } from "react-icons/ri";
import { LuHouse } from "react-icons/lu";
import { FaRegUser, FaHistory, FaMoneyCheck } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { useMenuContext } from "../../context/MenuContext";
import { motion, AnimatePresence } from "framer-motion";

//List of Menu
const menuList = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LuHouse,
  },
  {
    id: "transaction",
    label: "Transaction",
    icon: FaMoneyCheck,
  },
  {
    id: "history",
    label: "History",
    icon: FaHistory,
  },
  {
    id: "profile",
    label: "Profile",
    icon: FaRegUser,
  },
];

const SideBar = () => {
  //Hooks
  const { logout } = useAuthContext();
  const { activeMenu, setActiveMenu } = useMenuContext();
  const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false);

  return (
    <>
      <div className={styles["side-bar-container"]}>
        {/*ChiCom Logo*/}
        <div className={styles["logo"]}>
          <img src="https://chicom.vn/favicon.ico" />
        </div>

        {/*Map the menu*/}
        {menuList.map((item) => {
          const Icon = item.icon;
          return (
            <div className={styles["section-wrapper"]}>
              <button
                key={item.id}
                className={`${styles["section"]} ${
                  activeMenu === item.id && styles["active"]
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <Icon className={styles["section-icon"]} />
              </button>
            </div>
          );
        })}

        <div className={styles["exit-wrapper"]}>
          {" "}
          <button
            className={`${styles["section"]} ${styles["exit"]}`}
            onClick={() => {
              setLogoutConfirm(true);
            }}
          >
            <RiShutDownLine className={styles["exit-icon"]} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {logoutConfirm && (
          <div className={styles["dim-layer"]}>
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "circInOut" }}
              className={styles["logout-confirm-container"]}
            >
              <header>
                <h2>Log Out?</h2>
              </header>

              <div className={styles["logout-option-wrapper"]}>
                <button
                  onClick={() => {
                    setLogoutConfirm(false);
                  }}
                  className={`${styles["logout-option"]} ${styles["cancle"]}`}
                >
                  <p>Cancle</p>
                </button>
                <button
                  onClick={() => {
                    setLogoutConfirm(false);
                    logout();
                  }}
                  className={`${styles["logout-option"]} ${styles["confirm"]}`}
                >
                  <p>Confirm</p>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBar;
