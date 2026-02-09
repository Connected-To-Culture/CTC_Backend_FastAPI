import React from 'react';
import { globalStyles } from '../styles/globalStyles';

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div style={globalStyles.modal}>
      <div style={globalStyles.modalContent}>
        <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Logout</h2>
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          For your security, you have been logged out due to inactivity.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={globalStyles.button} onClick={onConfirm}>
            OK
          </button>
          {onCancel && (
            <button
              style={{ ...globalStyles.button, backgroundColor: '#6c757d' }}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;