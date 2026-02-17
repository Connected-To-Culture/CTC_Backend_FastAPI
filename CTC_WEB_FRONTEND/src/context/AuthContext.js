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

  useEffect(() => {
    // Check for stored user data on app start
    const checkAuth = async () => {
      // Simulate checking auth
      const storedUser = null; // Replace with actual auth check
      setUser(storedUser);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password, role = "customer") => {
    // Implement login logic
    setUser({ email, role }); // Use the provided role or default to customer
  };

  const switchRole = (newRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
    // Don't create a user object just for role selection
    // Role selection should only affect logged-in users
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    switchRole,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
