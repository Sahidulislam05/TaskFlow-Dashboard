import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      const savedTime = localStorage.getItem("loginTime");

      if (savedToken && savedUser && savedTime) {
        // 24 ঘন্টা পর auto logout
        const elapsed = Date.now() - parseInt(savedTime, 10);
        if (elapsed < 24 * 60 * 60 * 1000) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          // expired — clear করো
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("loginTime");
        }
      }
    } catch {
      // corrupt data হলে clear
      localStorage.clear();
    } finally {
      setReady(true);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  };

  // App ready হওয়ার আগে blank দেখাবে না
  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
