import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";

//Theme Context
const ThemeContext = createContext<
  | {
      themeColor: string;
      updateTheme: () => void;
    }
  | undefined
>(undefined);

//Theme Provider
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //useState
  const [themeColor, setThemeColor] = useState<string>(() => {
    try {
      const savedTheme = localStorage.getItem("app-theme");
      return savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : "light";
    } catch (error) {
      console.log("unable to retrieve app theme from local storage");
      return "light";
    }
  });

  const updateTheme = useCallback(() => {
    setThemeColor((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("app-theme", themeColor);
    localStorage.setItem("app-theme", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Custom Hook
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
