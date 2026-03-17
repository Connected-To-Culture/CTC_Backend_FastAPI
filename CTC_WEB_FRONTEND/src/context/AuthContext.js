import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for stored user data in localStorage
        const storedUser = localStorage.getItem("ctc_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
        // TODO: Implement actual authentication check with backend
        // For now, we'll just simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem("ctc_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("ctc_user");
      }
    }
  }, [user, isLoading]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login with backend
      // For now, create a dummy user based on email
      const role = email.includes("admin")
        ? "admin"
        : email.includes("vendor")
          ? "vendor"
          : "customer";
      const dummyUser = {
        email,
        role,
        name: email.split("@")[0],
      };
      setUser(dummyUser);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ctc_user");
  };

  const switchRole = (newRole) => {
    if (newRole === "not-signed-in") {
      setUser(null);
    } else {
      // For testing purposes, create a dummy user with the selected role
      setUser({
        email: `test@${newRole}.com`,
        role: newRole,
        name: `Test ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
      });
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
