import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AddToCartModal from "../modals/AddToCartModal";
import "../styles/CustomerHomeScreen.css";

const ShopScreen = ({ onSwitchToHome, setCurrentScreen }) => {
  const { user, sectionVisibility, toggleSectionVisibility } = useAuth();
  const [inventoryData, setInventoryData] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // TODO: Replace with actual schema-based item types
  // This should come from database schema or API endpoint
  const itemTypes = [
    {
      id: "fresh",
      name: "Fresh Produce",
      description: "Fresh fruits and vegetables",
    },
    {
      id: "bakery",
      name: "Bakery & Artisan Goods",
      description: "Baked goods and handmade items",
    },
    // TODO: Add more item types dynamically from schema
    // Example: { id: 'dairy', name: 'Dairy Products', description: 'Milk, cheese, and dairy items' }
  ];

  // TODO: Replace with actual API calls
  const fetchInventoryByType = async (itemType) => {
    // TODO: Implement database query for inventory by item type
    // SQL: SELECT p.*, i.quantity FROM products p
    // INNER JOIN inventory i ON p.id = i.product_id
    // WHERE p.category = ? AND i.quantity > 0
    // ORDER BY i.quantity DESC

    // Return empty array - placeholder logic in renderProductCard will handle display
    return [];
  };

  useEffect(() => {
    const loadInventory = async () => {
      if (!user) return;

      setLoading(true);
      const data = {};

      // Load inventory for each item type
      for (const itemType of itemTypes) {
        data[itemType.id] = await fetchInventoryByType(itemType.id);
      }

      setInventoryData(data);
      setLoading(false);
    };

    loadInventory();
  }, [user]);

  const handleAddToCart = (cartItems) => {
    // TODO: Implement actual cart functionality
    console.log("Adding to cart:", cartItems);
    alert(`Added ${cartItems.length} item(s) to cart!`);
  };

  // Reusable product card renderer (same as home screen)
  const renderProductCard = (product, index) => (
    <div key={index} className="product-container">
      <div className="product-card">
        <div className="product-image">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || "Product Image"}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="product-image-placeholder"
            style={{ display: product?.image ? "none" : "flex" }}
          >
            <p>{product?.name || "Product Image"}</p>
          </div>
          {/* Add to Cart overlay for authenticated customers */}
          {user && user.role === "customer" && (
            <button
              className="add-to-cart-overlay"
              onClick={() => {
                setSelectedProduct(product);
                setIsAddToCartModalOpen(true);
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <h3 className="product-name">
        {product?.name ? product.name : "Product Name"}
      </h3>
      <p className="product-price">
        {product?.price_per_unit ? `$${product.price_per_unit}` : "Price"}/
        {product?.unit ? product.unit : "unit"}
      </p>
    </div>
  );

  // Reusable function to render product sections with consistent styling
  const renderProductSection = (itemType, products, showNavArrows = false) => (
    <div key={itemType?.id || "section"} className="product-section">
      <div className="section-header">
        <h2>{itemType?.name || "Section Title"}</h2>
        {user && user.role === "admin" && (
          <div className="admin-section-controls">
            <label className="section-toggle">
              <input
                type="checkbox"
                checked={sectionVisibility[itemType?.id] !== false}
                onChange={() => toggleSectionVisibility(itemType?.id)}
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
      <p>{itemType?.description || "Section description"}</p>
      <div className="products-grid shop-grid">
        {products.map((product, index) =>
          renderProductCard(product, `${itemType?.id || "section"}-${index}`),
        )}
      </div>
    </div>
  );

  // Render section for each item type
  const renderItemTypeSection = (itemType) => {
    const products = inventoryData[itemType.id] || [];

    // Check if section should be visible
    const isVisible =
      user && user.role === "admin"
        ? true
        : sectionVisibility[itemType.id] !== false;
    if (!isVisible) return null;

    // Sort products: items with stock first (alphabetically), then out-of-stock items (alphabetically)
    const sortedProducts =
      products.length > 0
        ? [...products].sort((a, b) => {
            const aInStock = (a?.quantity || 0) > 0;
            const bInStock = (b?.quantity || 0) > 0;

            // If stock status differs, in-stock items come first
            if (aInStock !== bInStock) {
              return aInStock ? -1 : 1;
            }

            // If stock status is the same, sort alphabetically by name
            const aName = (a?.name || "").toLowerCase();
            const bName = (b?.name || "").toLowerCase();
            return aName.localeCompare(bName);
          })
        : [];

    // Show sorted products if available, otherwise show placeholder products
    const displayProducts =
      sortedProducts.length > 0 ? sortedProducts : Array(5).fill(null);

    return renderProductSection(itemType, displayProducts, false);
  };

  if (!user) {
    return (
      <div className="home-container">
        <div className="home-content">
          <div className="cta-section">
            <h2>Please Log In</h2>
            <p>You must be logged in to access the shop.</p>
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                backgroundColor: "var(--primary-color)",
                color: "var(--background-dark)",
                border: "none",
                borderRadius: "0",
                fontWeight: "500",
                cursor: "pointer",
                fontFamily: '"acumin-pro", sans-serif',
                transition: "all 0.2s",
                display: "inline-block",
                width: "auto",
                margin: "0 auto",
              }}
              onClick={() => setCurrentScreen("login")}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5ecf0a")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--primary-color)")
              }
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="home-container">
        <div className="home-content">
          <div className="text-center">
            <h2>Loading Shop...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Dynamic Item Type Sections */}
        {itemTypes.map((itemType) => renderItemTypeSection(itemType))}
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

export default ShopScreen;
