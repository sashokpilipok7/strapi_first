import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    width: "1024px",
    padding: 0,
  },
  overlay: {
    zIndex: 12,
  },
};

function SimpleModal({ isOpen, closeModal, children }) {
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      {children}
    </Modal>
  );
}

export default SimpleModal;
