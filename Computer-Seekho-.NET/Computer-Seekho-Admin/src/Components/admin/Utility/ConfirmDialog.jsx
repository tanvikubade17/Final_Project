import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
