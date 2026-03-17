import React from "react";
import { useAuth } from "../context/AuthContext";
import ToggleSwitch from "./ToggleSwitch";
import "../styles/Header.css";

const Header = ({ currentScreen, setCurrentScreen }) => {
  const { user, switchRole, logout } = useAuth();

  // TESTING SECTION - REMOVE IN PRODUCTION
  // To remove testing functionality:
  // 1. Delete this entire section (from TESTING SECTION comment to end of testing section)
  // 2. Remove the import for ToggleSwitch at the top
  // 3. In AuthContext.js, remove the switchRole function and related logic
  const handleRoleChange = (newRole) => {
    if (newRole === "not-signed-in") {
      logout();
    } else {
      // For testing purposes, create a dummy user with the selected role
      switchRole(newRole);
    }
    // No longer need to reload page - state persists through localStorage
  };

  const roleOptions = [
    { value: "not-signed-in", label: "Not Signed In" },
    { value: "customer", label: "Customer" },
    { value: "vendor", label: "Vendor" },
    { value: "admin", label: "Admin" },
  ];

  const currentRole = user ? user.role : "not-signed-in";
  // END TESTING SECTION

  // NAVIGATION BAR SECTION
  const renderNavigationLinks = () => {
    const baseLinks = [
      { key: "shop", label: "SHOP", action: () => setCurrentScreen("shop") },
      {
        key: "events",
        label: "EVENTS",
        action: () => setCurrentScreen("events"),
      },
      {
        key: "vendors",
        label: "VENDORS",
        action: () => setCurrentScreen("vendors"),
      },
      { key: "about", label: "ABOUT", action: () => setCurrentScreen("about") },
    ];

    const authenticatedLinks = user
      ? [
          // Add account/cart icons here when implemented
          // { key: "account", label: "ACCOUNT", action: () => setCurrentScreen("account") },
          { key: "logout", label: "LOGOUT", action: logout },
        ]
      : [
          {
            key: "login",
            label: "LOGIN",
            action: () => setCurrentScreen("login"),
          },
        ];

    return [...baseLinks, ...authenticatedLinks];
  };

  // UTILITY BAR SECTION
  const renderUtilityBar = () => {
    if (!user) return null;

    const utilities = [];

    // Add utility buttons based on current screen and user role
    switch (currentScreen) {
      case "events":
        if (
          user.role === "customer" ||
          user.role === "vendor" ||
          user.role === "admin"
        ) {
          utilities.push({
            key: "all-events",
            label: "ALL EVENTS",
            action: () => {
              // TODO: Open all events modal
              console.log("Open all events modal");
            },
          });
        }
        break;
      case "vendors":
        utilities.push({
          key: "all-vendors",
          label: "ALL VENDORS",
          action: () => {
            // TODO: Open all vendors modal
            console.log("Open all vendors modal");
          },
        });
        break;
      case "shop":
        if (
          user.role === "customer" ||
          user.role === "vendor" ||
          user.role === "admin"
        ) {
          utilities.push({
            key: "all-products",
            label: "ALL PRODUCTS",
            action: () => {
              // TODO: Open all products modal
              console.log("Open all products modal");
            },
          });
        }
        break;
      default:
        break;
    }

    return utilities;
  };

  const utilityButtons = renderUtilityBar();

  return (
    <header className="header">
      {/* TESTING SECTION - REMOVE IN PRODUCTION */}
      <div className="testing-section">
        <div className="testing-content">
          <label className="testing-label">Testing Auth:</label>
          <ToggleSwitch
            options={roleOptions}
            activeOption={currentRole}
            onChange={handleRoleChange}
          />
        </div>
      </div>
      {/* END TESTING SECTION */}

      {/* NAVIGATION BAR SECTION */}
      <div className="navigation-bar">
        <div className="nav-content">
          {/* Logo Section */}
          <div className="header-section logo-section">
            <button
              className={`logo-button ${currentScreen === "home" ? "active" : ""}`}
              onClick={() => setCurrentScreen("home")}
            >
              <h1 className="logo-text">CTCMarket</h1>
            </button>
          </div>

          {/* Navigation Section */}
          <div className="header-section nav-section">
            <nav className="nav-container">
              <div className="nav-row">
                {renderNavigationLinks()
                  .filter((link) => !["login", "logout"].includes(link.key))
                  .map((link) => (
                    <div key={link.key} className="nav-item">
                      <button
                        className={`nav-link ${currentScreen === link.key ? "active" : ""}`}
                        onClick={link.action}
                      >
                        {link.label}
                      </button>
                      {/* Render utility button below corresponding nav link */}
                      {utilityButtons &&
                        utilityButtons.find((util) => {
                          if (
                            link.key === "events" &&
                            util.key === "all-events"
                          )
                            return true;
                          if (
                            link.key === "vendors" &&
                            util.key === "all-vendors"
                          )
                            return true;
                          if (
                            link.key === "shop" &&
                            util.key === "all-products"
                          )
                            return true;
                          return false;
                        }) && (
                          <button
                            className="utility-btn"
                            onClick={
                              utilityButtons.find((util) => {
                                if (
                                  link.key === "events" &&
                                  util.key === "all-events"
                                )
                                  return true;
                                if (
                                  link.key === "vendors" &&
                                  util.key === "all-vendors"
                                )
                                  return true;
                                if (
                                  link.key === "shop" &&
                                  util.key === "all-products"
                                )
                                  return true;
                                return false;
                              }).action
                            }
                          >
                            {
                              utilityButtons.find((util) => {
                                if (
                                  link.key === "events" &&
                                  util.key === "all-events"
                                )
                                  return true;
                                if (
                                  link.key === "vendors" &&
                                  util.key === "all-vendors"
                                )
                                  return true;
                                if (
                                  link.key === "shop" &&
                                  util.key === "all-products"
                                )
                                  return true;
                                return false;
                              }).label
                            }
                          </button>
                        )}
                    </div>
                  ))}
              </div>
            </nav>
          </div>

          {/* Auth Section */}
          <div className="header-section auth-section">
            {renderNavigationLinks()
              .filter((link) => ["login", "logout"].includes(link.key))
              .map((link) => (
                <button
                  key={link.key}
                  className="nav-link auth-link"
                  onClick={link.action}
                >
                  {link.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
