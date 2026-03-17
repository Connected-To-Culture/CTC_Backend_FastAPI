import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/CustomerHomeScreen.css";
import MapModal from "../modals/MapModal";
import CookingStationsModal from "../modals/CookingStationsModal";
import AffiliatesModal from "../modals/AffiliatesModal";

const CustomerHomeScreen = ({ onSwitchToLogin, setCurrentScreen }) => {
  const { user } = useAuth();

  // Modal state management
  const [modals, setModals] = useState({
    map: false,
    cooking: false,
    affiliates: false
  });

  const openModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
  };

  const closeAllModals = () => {
    setModals({
      map: false,
      cooking: false,
      affiliates: false
    });
  };

  // TODO: Replace with actual event data from API/backend
  const activeEvent = null; // This will eventually come from props or API call
  // TODO: Replace with actual data from database/API
  // Fresh Products Section - sorted by highest inventory
  const freshProducts = [
    // Will be populated from database: sort by highest inventory, limit to 5 for display
    // Card structure: image, name, price range (min-max across vendors)/unit
  ];

  // Bakery & Artisan Goods Section - sorted alphabetically
  const bakeryGoods = [
    // Will be populated from database: all non-produce goods, sorted alphabetically, limit to 5
    // Same card structure as fresh products
  ];

  // Site Services Section - modal triggers
  const siteServices = [
    { id: 'map', name: 'Event Map', description: 'Interactive map highlighting stalls, bathrooms, and parking' },
    { id: 'cooking', name: 'Free Cooking Stations', description: 'Learn to cook with fresh ingredients' },
    { id: 'affiliates', name: 'Food Trucks & Affiliates', description: 'Additional vendors and services' }
    // Will trigger modals when clicked
  ];
  const handleExploreClick = () => {
    if (user) {
      // If authenticated, could navigate to vendors page
      // For now, just show an alert
      alert("Navigate to vendors page");
    } else {
      // If not authenticated, go to login
      onSwitchToLogin();
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Active Event Section */}
        <div className="active-event-section">
          <div className="active-event-card">
            <div className="event-image-placeholder">
              <p>{activeEvent?.image ? "Event Image Loaded" : "Event Image"}</p>
            </div>
            <div className="event-details-overlay">
              <div className="event-details">
                <h2 className="event-name">
                  {activeEvent?.name ? activeEvent.name : "Event Name"}
                </h2>
                <h3 className="event-title">
                  {activeEvent?.title ? activeEvent.title : "Event Title"}
                </h3>
                <p className="event-description">
                  {activeEvent?.description
                    ? activeEvent.description
                    : "Event Description - Brief description that will be truncated to 2 lines with ellipsis..."}
                </p>
                <div className="event-info">
                  <div className="event-hours">
                    <strong>
                      {activeEvent?.hours ? activeEvent.hours : "Event Hours"}
                    </strong>
                  </div>
                  <button
                    className="more-info-btn"
                    onClick={() => setCurrentScreen("events")}
                  >
                    More Info
                  </button>
                </div>
                <div className="event-address">
                  {activeEvent?.address ? activeEvent.address : "Event Address"}
                </div>
              </div>
            </div>
            <div className="event-spacer"></div>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-card">
            <div className="section-header">
              <h2>Fresh Products</h2>
              <div className="nav-arrows">
                <button className="nav-arrow">&larr;</button>
                <button className="nav-arrow">&rarr;</button>
              </div>
            </div>
            <p>Discover locally sourced fresh produce and goods from our community vendors.</p>
            <div className="products-grid">
              {/* TODO: Map through freshProducts array and display cards */}
              <div className="product-card">
                <div className="product-image">{freshProducts[0]?.image ? freshProducts[0].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{freshProducts[0]?.name ? freshProducts[0].name : "Product Name"}</h3>
                  <p>{freshProducts[0]?.priceRange ? freshProducts[0].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{freshProducts[1]?.image ? freshProducts[1].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{freshProducts[1]?.name ? freshProducts[1].name : "Product Name"}</h3>
                  <p>{freshProducts[1]?.priceRange ? freshProducts[1].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{freshProducts[2]?.image ? freshProducts[2].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{freshProducts[2]?.name ? freshProducts[2].name : "Product Name"}</h3>
                  <p>{freshProducts[2]?.priceRange ? freshProducts[2].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{freshProducts[3]?.image ? freshProducts[3].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{freshProducts[3]?.name ? freshProducts[3].name : "Product Name"}</h3>
                  <p>{freshProducts[3]?.priceRange ? freshProducts[3].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{freshProducts[4]?.image ? freshProducts[4].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{freshProducts[4]?.name ? freshProducts[4].name : "Product Name"}</h3>
                  <p>{freshProducts[4]?.priceRange ? freshProducts[4].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="section-header">
              <h2>Bakery & Artisan Goods</h2>
              <div className="nav-arrows">
                <button className="nav-arrow">&larr;</button>
                <button className="nav-arrow">&rarr;</button>
              </div>
            </div>
            <p>Explore handmade baked goods and artisanal products from local makers.</p>
            <div className="products-grid">
              {/* TODO: Map through bakeryGoods array and display cards */}
              <div className="product-card">
                <div className="product-image">{bakeryGoods[0]?.image ? bakeryGoods[0].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{bakeryGoods[0]?.name ? bakeryGoods[0].name : "Product Name"}</h3>
                  <p>{bakeryGoods[0]?.priceRange ? bakeryGoods[0].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{bakeryGoods[1]?.image ? bakeryGoods[1].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{bakeryGoods[1]?.name ? bakeryGoods[1].name : "Product Name"}</h3>
                  <p>{bakeryGoods[1]?.priceRange ? bakeryGoods[1].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{bakeryGoods[2]?.image ? bakeryGoods[2].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{bakeryGoods[2]?.name ? bakeryGoods[2].name : "Product Name"}</h3>
                  <p>{bakeryGoods[2]?.priceRange ? bakeryGoods[2].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{bakeryGoods[3]?.image ? bakeryGoods[3].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{bakeryGoods[3]?.name ? bakeryGoods[3].name : "Product Name"}</h3>
                  <p>{bakeryGoods[3]?.priceRange ? bakeryGoods[3].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
              <div className="product-card">
                <div className="product-image">{bakeryGoods[4]?.image ? bakeryGoods[4].image : "Product Image"}</div>
                <div className="product-info">
                  <h3>{bakeryGoods[4]?.name ? bakeryGoods[4].name : "Product Name"}</h3>
                  <p>{bakeryGoods[4]?.priceRange ? bakeryGoods[4].priceRange : "Price Range"}/unit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2>Site Services</h2>
            <p>Access event utilities and additional services available at the market.</p>
            <div className="services-grid">
              {/* TODO: Map through siteServices array and display service cards */}
              {siteServices.map(service => (
                <div key={service.id} className="service-card" onClick={() => openModal(service.id)}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>{user ? "Ready to Shop?" : "Join Our Community"}</h2>
          <p>
            {user
              ? "Browse our vendors and discover amazing local products."
              : "Sign in to start shopping and connect with local vendors."}
          </p>
          <button className="btn-primary-solid" onClick={handleExploreClick}>
            {user ? "Explore Vendors" : "Sign In"}
          </button>
        </div>
      </div>

      {/* Modals */}
      <MapModal isOpen={modals.map} onClose={() => closeModal('map')} />
      <CookingStationsModal isOpen={modals.cooking} onClose={() => closeModal('cooking')} />
      <AffiliatesModal isOpen={modals.affiliates} onClose={() => closeModal('affiliates')} />
    </div>
  );
};

export default CustomerHomeScreen;
