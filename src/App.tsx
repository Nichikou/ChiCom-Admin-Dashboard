import LogInScreen from "./auth/LogInScreen/LogInScreen";
import SideBar from "./pages/SideBar/SideBar";
import TopBar from "./pages/TopBar/TopBar";
import History from "./pages/History/History";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import "./App.css";
import { useAuthContext } from "./context/AuthContext";
import { useMenuContext } from "./context/MenuContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Transaction";

const animationInitial = {
  scale: 0.3,
  opacity: 0,
  filter: "blur(10px)",
};

const animationAnimate = {
  scale: 1,
  opacity: 1,
  filter: "blur(0px)",
};

const animationExit = {
  opacity: 0,
  filter: "blur(10px)",
};

const animationTransition: Transition = {
  duration: 0.4,
  ease: "easeInOut",
};

const App = () => {
  const { isAuthorized } = useAuthContext();
  const { activeMenu } = useMenuContext();

  return (
    <>
      <div className="view-port">
        <AnimatePresence mode="wait">
          {!isAuthorized ? (
            <motion.div
              key="login"
              initial={animationInitial}
              animate={animationAnimate}
              exit={{ ...animationExit, scale: 1.5 }}
              transition={animationTransition}
              className="login-container"
            >
              <LogInScreen />
            </motion.div>
          ) : (
            <motion.div
              key="main-app"
              initial={animationInitial}
              animate={animationAnimate}
              exit={{ ...animationExit, scale: 0.3 }}
              transition={animationTransition}
              className="app-container"
            >
              <SideBar />
              <TopBar />
              {activeMenu === "dashboard" && <Dashboard />}
              {activeMenu === "transaction" && <Transaction />}
              {activeMenu === "history" && <History />}
              {activeMenu === "profile" && 1 == 1}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
