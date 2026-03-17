import React from "react";
import "../styles/MapModal.css";

const MapModal = ({ isOpen, onClose }) => {
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
      <div className="modal-content map-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Market Map</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <p>Interactive market map coming soon!</p>
            <p className="map-description">
              Navigate through our vendors, find cooking stations, and locate
              amenities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
