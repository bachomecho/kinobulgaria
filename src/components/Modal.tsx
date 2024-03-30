interface ModalProps {
  imagePath: string;
  isActive: boolean;
  onClose: () => void;
}

function Modal(props: ModalProps) {
  const activeModal = props.isActive ? "active" : "hidden";
  return (
    <div className={`modal-container-${activeModal}`} id="modal">
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onClick={props.onClose}
      >
        X
      </button>
      <img src={props.imagePath} alt="Thumbnail" className="thumbnail" />
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            position: "relative",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "16px",
            alignItems: "center",
          }}
        >
          Button 1
        </button>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Button 2
        </button>
      </div>
    </div>
  );
}

export default Modal;
