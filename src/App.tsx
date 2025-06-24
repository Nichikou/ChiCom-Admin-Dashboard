import LogInScreen from "./auth/LogInScreen/LogInScreen";
import SideBar from "./pages/SideBar/SideBar";
import TopBar from "./pages/TopBar/TopBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import "./App.css";
import { useAuthContext } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { useState } from "react";

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
  const [menuExpand, toggleMenuExpand] = useState(false);

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
            <MenuProvider>
              <motion.div
                key="main-app"
                initial={animationInitial}
                animate={animationAnimate}
                exit={{ ...animationExit, scale: 0.3 }}
                transition={animationTransition}
                className="app-container"
              >
                <SideBar
                  menuExpand={menuExpand}
                  toggleMenuExpand={toggleMenuExpand}
                />
                <TopBar
                  menuExpand={menuExpand}
                  toggleMenuExpand={toggleMenuExpand}
                />
                <Dashboard />
              </motion.div>
            </MenuProvider>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
