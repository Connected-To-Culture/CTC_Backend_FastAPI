import React from "react";
import "../styles/DeliveryPickupModal.css";

const DeliveryPickupModal = ({ isOpen, onClose, onSelectOption }) => {
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

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Choose Delivery Option</h2>
        <div className="modal-options">
          <button
            className="option-button delivery"
            onClick={() => onSelectOption("delivery")}
          >
            <div className="option-icon">🚚</div>
            <div className="option-text">
              <h3>Delivery</h3>
              <p>Get your order delivered to your door</p>
            </div>
          </button>
          <button
            className="option-button pickup"
            onClick={() => onSelectOption("pickup")}
          >
            <div className="option-icon">🏪</div>
            <div className="option-text">
              <h3>Pickup</h3>
              <p>Pick up your order at the market</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPickupModal;
