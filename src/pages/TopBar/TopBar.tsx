import styles from "./TopBar.module.css";
import { useThemeContext } from "../../context/ThemeContext";
import { CiSearch } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnySharp, IoNotificationsOutline } from "react-icons/io5";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useMenuContext } from "../../context/MenuContext";

//Animation for the light/dark mode switch
const iconVariants = {
  initial: {
    x: 50,
    y: 50,
  },
  animate: {
    x: 0,
    y: 0,
  },
  exit: {
    x: -50,
    y: 50,
  },
};

const iconTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const TopBar = () => {
  //Hooks
  const { activeMenu } = useMenuContext();
  const { themeColor, updateTheme } = useThemeContext();

  return (
    <div className={styles["top-bar-container"]}>
      {/*Seach Bar*/}
      <div className={styles["search-bar-wrapper"]}>
        <CiSearch className={styles["lookup-icon"]} />
        <input type="text" placeholder="Type to search"></input>
      </div>

      {/*Current Menu Name*/}
      <div className={styles["current-menu-label"]}>{activeMenu}</div>

      {/*Button to cycle between Light and Dark mode*/}
      <button className={styles["theme-select-btn"]} onClick={updateTheme}>
        <AnimatePresence>
          <motion.div
            key={themeColor}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
            className={styles["theme-icon-wrapper"]}
          >
            {themeColor === "dark" ? (
              <FaRegMoon className={styles["theme-icon"]} />
            ) : (
              <IoSunnySharp className={styles["theme-icon"]} />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {/*Notifications*/}
      <button className={styles["notification-wrapper"]}>
        <IoNotificationsOutline className={styles["theme-icon"]} />
      </button>

      {/*User Information*/}
      <div className={styles["user-wrapper"]}></div>
    </div>
  );
};

export default TopBar;
