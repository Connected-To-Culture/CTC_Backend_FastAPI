import React, { useState } from "react";

const DeliveryPickupModal = ({ visible, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  if (!visible) return null;

  const handleConfirm = () => {
    onSelect({
      type: selectedOption,
      time: selectedOption === "pickup" ? pickupTime : deliveryTime,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Select Delivery Option</h2>
        </div>

        <div className="modal-body">
          <div
            className={`option ${selectedOption === "delivery" ? "selected" : ""}`}
            onClick={() => setSelectedOption("delivery")}
          >
            <span>Delivery</span>
          </div>

          <div
            className={`option ${selectedOption === "pickup" ? "selected" : ""}`}
            onClick={() => setSelectedOption("pickup")}
          >
            <span>In-Store Pickup</span>
          </div>

          {selectedOption === "pickup" && (
            <input
              className="form-control"
              type="text"
              placeholder="Pickup Time (e.g., 2:00 PM)"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          )}

          {selectedOption === "delivery" && (
            <input
              className="form-control"
              type="text"
              placeholder="Delivery Time (e.g., 3:00 PM)"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
          )}
        </div>

        <div className="modal-footer gap-2">
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPickupModal;
