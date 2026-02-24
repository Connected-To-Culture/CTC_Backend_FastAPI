import React, { useState, useEffect } from "react";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useCart } from "./hooks/useCart";

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("login");
  const { logout } = useAuth();
  const cart = useCart();

  useEffect(() => {
    if (!isLoading) {
      setCurrentScreen(user ? "home" : "login");
    }
  }, [user, isLoading]);

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
        return <CustomerHomeScreen />;
      case "login":
        return <LoginScreen onSwitchToHome={() => setCurrentScreen("home")} />;
      default:
        return <LoginScreen onSwitchToHome={() => setCurrentScreen("home")} />;
    }
  };

  return (
    <div className="container">
      {currentScreen !== "login" && (
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">CTC Market</h1>
            <nav className="nav">
              <button
                className="nav-link"
                onClick={() => setCurrentScreen("home")}
              >
                Home
              </button>
              {user ? (
                <button className="nav-link" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button
                  className="nav-link"
                  onClick={() => setCurrentScreen("login")}
                >
                  Login
                </button>
              )}
              <span className="cart-count">Cart: {cart.cartItems.length}</span>
            </nav>
          </div>
        </header>
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
