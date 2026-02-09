import React, { useState } from 'react';
import { globalStyles } from '../styles/globalStyles';

const DeliveryPickupModal = ({ visible, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('delivery');
  const [pickupTime, setPickupTime] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  if (!visible) return null;

  const handleConfirm = () => {
    onSelect({ type: selectedOption, time: selectedOption === 'pickup' ? pickupTime : deliveryTime });
    onClose();
  };

  return (
    <div style={globalStyles.modal}>
      <div style={globalStyles.modalContent}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Select Delivery Option</h2>

        <div
          style={{
            ...styles.option,
            ...(selectedOption === 'delivery' ? styles.selected : {})
          }}
          onClick={() => setSelectedOption('delivery')}
        >
          <span>Delivery</span>
        </div>

        <div
          style={{
            ...styles.option,
            ...(selectedOption === 'pickup' ? styles.selected : {})
          }}
          onClick={() => setSelectedOption('pickup')}
        >
          <span>In-Store Pickup</span>
        </div>

        {selectedOption === 'pickup' && (
          <input
            style={globalStyles.input}
            type="text"
            placeholder="Pickup Time (e.g., 2:00 PM)"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        )}

        {selectedOption === 'delivery' && (
          <input
            style={globalStyles.input}
            type="text"
            placeholder="Delivery Time (e.g., 3:00 PM)"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button style={globalStyles.button} onClick={handleConfirm}>
            Confirm
          </button>
          <button
            style={{ ...globalStyles.button, backgroundColor: '#6c757d' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  option: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  selected: {
    borderColor: '#007bff',
    backgroundColor: '#e6f7ff',
  },
};

export default DeliveryPickupModal;