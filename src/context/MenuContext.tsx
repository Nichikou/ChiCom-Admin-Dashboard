import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

//menu context
const MenuContext = createContext<
  | {
      activeMenu: string | null;
      setActiveMenu: (menu: string) => void;
    }
  | undefined
>(undefined);

export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //useState
  const [activeMenu, setActiveMenu] = useState<string | null>("dashboard");

  return (
    <MenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

//Custom Hook
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
