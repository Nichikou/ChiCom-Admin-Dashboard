import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

//Sample data
const sampleUser = [
  { name: "", password: "" },
  { name: "Nichikou", password: "123" },
  { name: "1", password: "1" },
];

//Auth context
const AuthContext = createContext<
  | {
      isAuthorized: boolean;
      user: { name: string; password: string } | null;
      login: (name: string, password: string) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //useState hook
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; password: string } | null>(
    null
  );

  //Login method
  const login = useCallback((name: string, password: string) => {
    const matched = sampleUser.find(
      (u) => u.name === name && u.password === password
    );

    if (!matched) {
      alert("Invalid");
      return;
    }

    setIsAuthorized(true);
    setUser({ name, password });
  }, []);

  //Logout method
  const logout = useCallback(() => {
    setIsAuthorized(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom Hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
