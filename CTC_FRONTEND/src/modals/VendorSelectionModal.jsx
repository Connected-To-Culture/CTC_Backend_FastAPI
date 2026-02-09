import React from 'react';
import { formatPrice } from '../utils/helpers';
import { globalStyles } from '../styles/globalStyles';

const VendorSelectionModal = ({ visible, onClose, vendors, onSelectVendor }) => {
  if (!visible) return null;

  return (
    <div style={globalStyles.modal}>
      <div style={globalStyles.modalContent}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Select Vendor</h2>
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              style={styles.vendorItem}
              onClick={() => {
                onSelectVendor(vendor);
                onClose();
              }}
            >
              <span style={styles.vendorName}>{vendor.name}</span>
              <span style={styles.vendorPrice}>{formatPrice(vendor.price)}</span>
            </div>
          ))}
        </div>
        <button
          style={{ ...globalStyles.button, marginTop: '20px', width: '100%' }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  vendorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  vendorName: {
    fontSize: '16px',
  },
  vendorPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default VendorSelectionModal;