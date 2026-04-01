import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ToggleSwitch from "./ToggleSwitch";
import AllModal from "../modals/AllModal";
import useProductCard from "../hooks/useProductCard";
import "../styles/Header.css";

const Header = ({ currentScreen, setCurrentScreen }) => {
  const { user, switchRole, logout, sectionVisibility } = useAuth();

  const renderProductCard = useProductCard();

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
    { value: "not-signed-in", label: "Not Logged In" },
    { value: "customer", label: "Customer" },
    { value: "vendor", label: "Vendor" },
    { value: "admin", label: "Admin" },
  ];

  const currentRole = user ? user.role : "not-signed-in";
  // END TESTING SECTION

  // ALL ITEMS MODAL STATE
  const [isAllItemsModalOpen, setIsAllItemsModalOpen] = useState(false);
  const [allItemsData, setAllItemsData] = useState({
    items: [],
    title: "",
    itemType: "",
    renderItem: null,
    keyExtractor: null,
  });

  // Available item types (should come from schema/API)
  const availableItemTypes = [
    { id: "fresh", name: "Fresh Produce" },
    { id: "bakery", name: "Bakery & Artisan" },
    // TODO: Add more item types from schema
  ];

  // ALL ITEMS MODAL FUNCTIONS
  const handleOpenAllItemsModal = async (itemType) => {
    let title = "";
    let renderItem = null;
    let keyExtractor = null;

    // Configure modal based on item type
    switch (itemType) {
      case "products":
        title = "All Products";
        renderItem = renderProductCard;
        keyExtractor = (product) => product.id;
        break;
      case "events":
        title = "All Events";
        renderItem = (event) => (
          <div className="modal-event-container">
            <div className="modal-event-card">
              <div className="modal-event-image">
                {event?.image ? (
                  <img
                    src={event.image}
                    alt={event?.name || "Event Image"}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="modal-event-image-placeholder"
                  style={{ display: event?.image ? "none" : "flex" }}
                >
                  <p>{event?.name || "Event Image"}</p>
                </div>
              </div>
            </div>
            <div className="modal-event-details">
              <h3 className="modal-event-name">
                {event?.name ? event.name : "Event Name"}
              </h3>
              <p className="modal-event-info">
                {event?.date ? event.date : "Date"} at{" "}
                {event?.location ? event.location : "Location"}
              </p>
              <span className="modal-event-category">{event.category}</span>
            </div>
          </div>
        );
        keyExtractor = (event) => event.id;
        break;
      case "vendors":
        title = "All Vendors";
        renderItem = (vendor) => (
          <div className="modal-vendor-container">
            <div className="modal-vendor-card">
              <div className="modal-vendor-image">
                {vendor?.image ? (
                  <img
                    src={vendor.image}
                    alt={vendor?.name || "Vendor Image"}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="modal-vendor-image-placeholder"
                  style={{ display: vendor?.image ? "none" : "flex" }}
                >
                  <p>{vendor?.name || "Vendor Image"}</p>
                </div>
              </div>
            </div>
            <div className="modal-vendor-details">
              <h3 className="modal-vendor-name">
                {vendor?.name ? vendor.name : "Vendor Name"}
              </h3>
              <p className="modal-vendor-description">
                {vendor?.description
                  ? vendor.description
                  : "Vendor Description"}
              </p>
              <span className="modal-vendor-category">{vendor.category}</span>
            </div>
          </div>
        );
        keyExtractor = (vendor) => vendor.id;
        break;
      default:
        return;
    }

    // TODO: Fetch data from API based on itemType
    // const items = await fetchAllItems(itemType);

    setAllItemsData({
      items: [],
      title,
      itemType,
      renderItem,
      keyExtractor,
    });
    setIsAllItemsModalOpen(true);
  };

  const handleLoadItems = (selectedItems) => {
    // TODO: Handle loading selected items based on type
    // (e.g., add products to cart, navigate to event details, etc.)
    console.log(`Loading ${allItemsData.itemType}:`, selectedItems);
  };

  const handleItemTypeToggle = (selectedTypes) => {
    // TODO: Filter items based on selected types
    console.log("Selected item types:", selectedTypes);
  };

  // NAVIGATION BAR SECTION
  const renderNavigationLinks = () => {
    const isVendorOrAdmin =
      user && (user.role === "vendor" || user.role === "admin");
    const baseLinks = [
      {
        key: "shop",
        label: isVendorOrAdmin ? "INVENTORY" : "SHOP",
        action: () => setCurrentScreen("shop"),
      },
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
          // Cart icon for customers
          ...(user.role === "customer"
            ? [
                {
                  key: "cart",
                  label: "🛒",
                  action: () => setCurrentScreen("cart"),
                },
              ]
            : []),
          { key: "logout", label: "LOG OUT", action: logout },
          {
            key: "profile",
            label: "PROFILE",
            action: () => setCurrentScreen("profile"),
          },
        ]
      : [
          {
            key: "login",
            label: "LOG IN",
            action: () => setCurrentScreen("login"),
          },
          {
            key: "signup",
            label: "SIGN UP",
            action: () => setCurrentScreen("signup"),
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
            action: () => handleOpenAllItemsModal("events"),
          });
        }
        break;
      case "vendors":
        if (
          user.role === "customer" ||
          user.role === "vendor" ||
          user.role === "admin"
        ) {
          utilities.push({
            key: "all-vendors",
            label: "ALL VENDORS",
            action: () => handleOpenAllItemsModal("vendors"),
          });
        }
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
            action: () => handleOpenAllItemsModal("products"),
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
                  .filter(
                    (link) =>
                      ![
                        "login",
                        "logout",
                        "cart",
                        "profile",
                        "signup",
                      ].includes(link.key),
                  )
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
              .filter((link) =>
                ["login", "logout", "signup", "cart", "profile"].includes(
                  link.key,
                ),
              )
              .map((link) => (
                <button
                  key={link.key}
                  className={`nav-link auth-link ${link.key === "cart" ? "cart-icon" : ""}`}
                  onClick={link.action}
                >
                  {link.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* ALL ITEMS MODAL */}
      <AllModal
        isOpen={isAllItemsModalOpen}
        onClose={() => setIsAllItemsModalOpen(false)}
        title={allItemsData.title}
        items={allItemsData.items}
        onLoad={handleLoadItems}
        itemType={allItemsData.itemType}
        renderItem={allItemsData.renderItem}
        keyExtractor={allItemsData.keyExtractor}
        availableItemTypes={availableItemTypes}
        sectionVisibility={sectionVisibility}
        userRole={user ? user.role : null}
        onItemTypeToggle={handleItemTypeToggle}
      />
    </header>
  );
};

export default Header;
