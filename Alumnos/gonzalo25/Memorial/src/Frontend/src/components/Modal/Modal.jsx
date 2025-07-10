import React, { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Pequeño delay para activar clase fade-in
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`modal-custom-container ${visible ? "fade-in" : "fade-out"}`}
      onClick={onClose}
    >
      <div className="modal-custom-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
