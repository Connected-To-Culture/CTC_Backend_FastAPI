import React from "react";

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Logout</h2>
        </div>
        <div className="modal-body">
          <p className="text-center">
            For your security, you have been logged out due to inactivity.
          </p>
        </div>
        <div className="modal-footer justify-content-center gap-2">
          <button className="btn btn-primary" onClick={onConfirm}>
            OK
          </button>
          {onCancel && (
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
