import React from "react";
import "../styles/CookingStationsModal.css";

const CookingStationsModal = ({ isOpen, onClose }) => {
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

  const cookingStations = [
    {
      id: 1,
      name: "Grill Station A",
      location: "North Wing",
      equipment: ["Gas Grills", "Smoking Racks", "Utensil Sets"],
      availability: "Available",
      price: "$15/hour",
    },
    {
      id: 2,
      name: "Prep Station B",
      location: "Central Area",
      equipment: ["Prep Tables", "Sinks", "Refrigeration"],
      availability: "In Use",
      price: "$10/hour",
    },
    {
      id: 3,
      name: "Oven Station C",
      location: "South Wing",
      equipment: ["Convection Ovens", "Baking Sheets", "Mixers"],
      availability: "Available",
      price: "$20/hour",
    },
  ];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content cooking-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Cooking Stations</h2>
        <p className="modal-description">
          Reserve our professional cooking stations for your culinary creations.
        </p>
        <div className="stations-grid">
          {cookingStations.map((station) => (
            <div key={station.id} className="station-card">
              <div className="station-header">
                <h3>{station.name}</h3>
                <span
                  className={`availability ${station.availability.toLowerCase().replace(" ", "-")}`}
                >
                  {station.availability}
                </span>
              </div>
              <div className="station-details">
                <p className="location">📍 {station.location}</p>
                <div className="equipment">
                  <h4>Equipment:</h4>
                  <ul>
                    {station.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="station-footer">
                  <span className="price">{station.price}</span>
                  <button
                    className="reserve-button"
                    disabled={station.availability !== "Available"}
                  >
                    {station.availability === "Available"
                      ? "Reserve"
                      : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookingStationsModal;
