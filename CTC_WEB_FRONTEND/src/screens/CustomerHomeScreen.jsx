import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddToCartModal from "../modals/AddToCartModal";
import useProductCard from "../hooks/useProductCard";
import "../styles/CustomerHomeScreen.css";

const CustomerHomeScreen = ({ onSwitchToLogin, setCurrentScreen }) => {
  const { user, sectionVisibility, toggleSectionVisibility } = useAuth();

  // Modal state
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // TODO: Replace with actual event data from API/backend
  const activeEvent = null; // This will eventually come from props or API call
  // TODO: Replace with actual data from database/API
  // Fresh Products Section - sorted by highest inventory
  const freshProducts = [
    // Will be populated from database: JOIN products p INNER JOIN inventory i ON p.id = i.product_id
    // WHERE p.category = 'fresh' ORDER BY i.quantity DESC LIMIT 5
    // Backend fields: id, name, description, price_per_unit, unit, category, created_at, updated_at
    // Note: Images may be stored separately or generated from product data
  ];

  // Bakery & Artisan Goods Section - sorted alphabetically
  const bakeryGoods = [
    // Will be populated from database: SELECT * FROM products WHERE category IN ('bakery', 'artisan')
    // ORDER BY name ASC LIMIT 5
    // Backend fields: id, name, description, price_per_unit, unit, category, created_at, updated_at
    // Note: Images may be stored separately or generated from product data
  ];

  // Independent data fetching functions for each section
  const fetchFreshProducts = async () => {
    // TODO: Implement database query for fresh products
    // SQL: SELECT p.*, i.quantity FROM products p INNER JOIN inventory i ON p.id = i.product_id
    //      WHERE p.category = 'fresh' ORDER BY i.quantity DESC LIMIT 5
    // API endpoint: GET /api/products/fresh?sort=inventory&limit=5
    // Response fields: id, name, description, price_per_unit, unit, category, created_at, updated_at, quantity
    return [];
  };

  const fetchBakeryGoods = async () => {
    // TODO: Implement database query for bakery goods
    // SQL: SELECT * FROM products WHERE category IN ('bakery', 'dairy', 'artisan')
    //      ORDER BY name ASC LIMIT 5
    // API endpoint: GET /api/products/bakery?sort=name&limit=5
    // Response fields: id, name, description, price_per_unit, unit, category, created_at, updated_at
    return [];
  };

  const handleSubscribe = () => {
    // TODO: Implement newsletter subscription functionality
    alert("Newsletter subscription functionality will be implemented soon!");
  };

  const handleSendNewsletter = () => {
    // TODO: Implement newsletter sending functionality for admins
    alert("Newsletter sending functionality will be implemented soon!");
  };

  const handleAddToCart = (cartItems) => {
    // TODO: Implement actual cart functionality
    console.log("Adding to cart:", cartItems);
    alert(`Added ${cartItems.length} item(s) to cart!`);
  };

  // Reusable function to render product cards for any section
  // Note: Product images may need to be fetched separately or generated from product data
  const renderProductCard = useProductCard((product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  });

  // Reusable function to render product sections with consistent styling
  const renderProductSection = (
    title,
    description,
    products,
    sectionId,
    showNavArrows = false,
  ) => {
    // Check if section should be visible
    const isVisible =
      user && user.role === "admin"
        ? true
        : sectionVisibility[sectionId] !== false;
    if (!isVisible) return null;

    return (
      <div key={sectionId} className="content-card">
        <div className="section-header">
          <h2>{title}</h2>
          {user && user.role === "admin" && (
            <div className="admin-section-controls">
              <label className="section-toggle">
                <input
                  type="checkbox"
                  checked={sectionVisibility[sectionId] !== false}
                  onChange={() => toggleSectionVisibility(sectionId)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Visible to Customers</span>
              </label>
            </div>
          )}
          {showNavArrows && (
            <div className="nav-arrows">
              <button className="nav-arrow">&larr;</button>
              <button className="nav-arrow">&rarr;</button>
            </div>
          )}
        </div>
        <p>{description}</p>
        <div className="products-grid">
          {products.map((product, index) =>
            renderProductCard(product, `${sectionId}-${index}`),
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      {/* Banner Section - Full Width */}
      <div className="banner-section">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5f18f60a27b18a18b58dee31/46e4605d-0e0c-4d44-a0a3-8de521f4fa41/shelley-pauls-G7WdvR8rDPg-unsplash.jpg?format=2500w"
          alt="CTC Market Banner"
          className="banner-image"
        />
      </div>

      {/* Admin Banner Controls */}
      {user && user.role === "admin" && (
        <div className="admin-banner-controls">
          <button className="admin-banner-btn">Change Banner Image</button>
        </div>
      )}

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
          {renderProductSection(
            "Fresh Products",
            "Discover locally sourced fresh produce and goods from our community vendors.",
            Array.from({ length: 5 }, (_, index) => freshProducts[index]),
            "fresh",
            true,
          )}

          {renderProductSection(
            "Bakery & Artisan Goods",
            "Explore handmade baked goods and artisanal products from local makers.",
            Array.from({ length: 5 }, (_, index) => bakeryGoods[index]),
            "bakery",
            true,
          )}
        </div>

        <div className="cta-section">
          {user && user.role === "admin" ? (
            // Admin Newsletter Management View
            <>
              <h2>Inform the Community</h2>
              <div className="newsletter-stats">
                <div className="stat-group">
                  <h3>
                    Customer Accounts:{" "}
                    <span className="stat-number">Unavailable</span>
                  </h3>
                  <div className="opt-in-stats">
                    <p>
                      Email: <span className="stat-number">Unavailable</span>
                    </p>
                    <p>
                      SMS: <span className="stat-number">Unavailable</span>
                    </p>
                  </div>
                </div>
                <div className="stat-group">
                  <h3>
                    Vendor Accounts:{" "}
                    <span className="stat-number">Unavailable</span>
                  </h3>
                  <div className="opt-in-stats">
                    <p>
                      Email: <span className="stat-number">Unavailable</span>
                    </p>
                    <p>
                      SMS: <span className="stat-number">Unavailable</span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="btn-primary-solid"
                onClick={handleSendNewsletter}
              >
                Send Newsletter
              </button>
            </>
          ) : (
            // Regular User Subscription View
            <>
              <h2>Stay Connected</h2>
              <p>
                Subscribe to receive updates on new products, special events,
                and community announcements.
              </p>
              <button className="btn-primary-solid" onClick={handleSubscribe}>
                Subscribe
              </button>
            </>
          )}
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default CustomerHomeScreen;
