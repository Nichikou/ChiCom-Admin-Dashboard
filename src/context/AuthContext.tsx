import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

//Auth context
const AuthContext = createContext<
  | {
      username: string;
      accessToken: string;
      setAccessToken: (accessToken: string) => void;
      refreshToken: string;
      setRefreshToken: (refreshToken: string) => void;
      isAuthorized: Boolean;
      login: (name: string, password: string) => void;
      validate: () => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<Boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  //Login method
  const login = useCallback((name: string, password: string) => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, password: password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Error ${response.status}: ${errText}`);
        }

        return response.json();
      })
      .then((data) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setUsername(data.username);
        setIsAuthorized(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.message.includes(403)) {
          alert("Invalid");
        }
      });
  }, []);

  const validate = useCallback(() => {}, []);

  //Logout method
  const logout = useCallback(() => {
    setIsAuthorized(false);
    setAccessToken("");
    setRefreshToken("");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isAuthorized,
        login,
        validate,
        logout,
      }}
    >
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
