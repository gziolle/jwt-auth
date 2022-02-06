import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import AppRoutes from "./AppRoutes";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refreshToken() {
      const response = await fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
        mode: "cors",
      });
      const jsonResponse = await response.json();

      if (jsonResponse.accessToken) {
        setAccessToken(jsonResponse.accessToken);
      }

      setLoading(false);
    }

    refreshToken();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return <AppRoutes />;
};

export default App;
