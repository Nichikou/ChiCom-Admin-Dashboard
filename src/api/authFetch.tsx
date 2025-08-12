import { useAuthContext } from "../context/AuthContext";

export function useAuthFetch() {
  const { accessToken, refreshToken, logout, setAccessToken, username } =
    useAuthContext();

  return async function authFetch(url: string) {
    try {
      let res = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const refreshRes = await fetch("http://localhost:4000/token/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${refreshToken}`,
          },
          body: JSON.stringify({ username: username }),
        });

        if (!refreshRes.ok) throw new Error("Refresh Failed");

        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.accessToken;

        setAccessToken(newAccessToken);

        const retryRes = await fetch(url, {
          method: "GET",
          headers: { authorization: `Bearer ${newAccessToken}` },
        });

        if (!retryRes.ok)
          throw new Error(`Token Request Failed ${retryRes.text()}`);

        const data = await retryRes.json();
        return data;
      }

      const data = await res.json();
      return data;
    } catch (error) {
      logout();
      return null;
    }
  };
}
