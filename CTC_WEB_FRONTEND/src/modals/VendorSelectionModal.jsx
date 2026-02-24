import React from "react";
import { formatPrice } from "../utils/helpers";

const VendorSelectionModal = ({
  visible,
  onClose,
  vendors,
  onSelectVendor,
}) => {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Select Vendor</h2>
        </div>
        <div className="modal-body">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="vendor-item"
              onClick={() => {
                onSelectVendor(vendor);
                onClose();
              }}
            >
              <span className="vendor-name">{vendor.name}</span>
              <span className="vendor-price">{formatPrice(vendor.price)}</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSelectionModal;
