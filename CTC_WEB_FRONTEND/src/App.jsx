import React, { useState, useEffect } from "react";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header";

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("home");
  const { logout } = useAuth();
  const cart = useCart();

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="login-container">
          <div className="text-center">
            <h2>Loading...</h2>
          </div>
        </div>
      );
    }

    switch (currentScreen) {
      case "home":
        return (
          <CustomerHomeScreen
            onSwitchToLogin={() => setCurrentScreen("login")}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case "login":
        return <LoginScreen onSwitchToHome={() => setCurrentScreen("home")} />;
      default:
        return <LoginScreen onSwitchToHome={() => setCurrentScreen("home")} />;
    }
  };

  return (
    <div className="container">
      {!isLoading && (
        <Header
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      <main className="main">{renderScreen()}</main>

      <footer className="footer">
        <p>&copy; 2024 CTC Market. Connecting Communities Through Commerce.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
