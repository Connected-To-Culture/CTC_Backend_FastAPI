import React from "react";
import "../styles/AffiliatesModal.css";

const AffiliatesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const affiliates = [
    {
      id: 1,
      name: "Local Brewery Co.",
      type: "Beverage Partner",
      description: "Craft beers and artisanal beverages",
      discount: "10% off all purchases",
      location: "Market Plaza",
    },
    {
      id: 2,
      name: "Green Valley Farms",
      type: "Produce Partner",
      description: "Organic vegetables and seasonal produce",
      discount: "15% off weekly specials",
      location: "North Wing",
    },
    {
      id: 3,
      name: "Artisan Cheese Shop",
      type: "Dairy Partner",
      description: "Handcrafted cheeses and dairy products",
      discount: "Free tasting with purchase",
      location: "Central Market",
    },
    {
      id: 4,
      name: "Spice Route Traders",
      type: "Spice Partner",
      description: "International spices and seasonings",
      discount: "Buy 2, get 1 free",
      location: "South Wing",
    },
  ];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content affiliates-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Market Affiliates</h2>
        <p className="modal-description">
          Discover our partner vendors and enjoy exclusive discounts.
        </p>
        <div className="affiliates-grid">
          {affiliates.map((affiliate) => (
            <div key={affiliate.id} className="affiliate-card">
              <div className="affiliate-header">
                <h3>{affiliate.name}</h3>
                <span className="affiliate-type">{affiliate.type}</span>
              </div>
              <p className="affiliate-description">{affiliate.description}</p>
              <div className="affiliate-details">
                <div className="discount-badge">
                  <span className="discount-icon">🏷️</span>
                  <span className="discount-text">{affiliate.discount}</span>
                </div>
                <p className="location">📍 {affiliate.location}</p>
              </div>
              <button className="visit-button">Visit Vendor</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliatesModal;
