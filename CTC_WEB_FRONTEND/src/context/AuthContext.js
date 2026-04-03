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
  const [sectionVisibility, setSectionVisibility] = useState({
    fresh: true,
    bakery: true,
  });

  // Load user and section visibility from localStorage on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for stored user data in localStorage
        const storedUser = localStorage.getItem("ctc_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }

        // Check for stored section visibility in localStorage
        const storedVisibility = localStorage.getItem("ctc_section_visibility");
        if (storedVisibility) {
          const visibilityData = JSON.parse(storedVisibility);
          setSectionVisibility(visibilityData);
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

  // Save section visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "ctc_section_visibility",
      JSON.stringify(sectionVisibility),
    );
  }, [sectionVisibility]);

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

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual signup with backend
      // For now, create a new user account
      const newUser = {
        email: userData.email,
        role: userData.role,
        name: userData.name,
      };
      setUser(newUser);
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

  const toggleSectionVisibility = (sectionId) => {
    setSectionVisibility((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const value = {
    user,
    isLoading,
    sectionVisibility,
    login,
    signup,
    logout,
    switchRole,
    toggleSectionVisibility,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
