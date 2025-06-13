import React, { useRef, useState } from 'react';

const UMLModal = ({ visible, onClose, imageUrl }) => {
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);

  if (!visible) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.4));
  const handleReset = () => setZoom(1);

  return (
    <div className="puml-modal active" onClick={onClose}>
      <div
        className="puml-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 900 }}
      >
        <div className="puml-modal-header">
          <span>UML Diagram Full Screen</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="close-puml-modal"
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <i className="fas fa-search-minus"></i>
            </button>
            <button
              className="close-puml-modal"
              onClick={handleReset}
              title="Reset Zoom"
            >
              <i className="fas fa-compress"></i>
            </button>
            <button
              className="close-puml-modal"
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <i className="fas fa-search-plus"></i>
            </button>
            <button
              className="close-puml-modal"
              onClick={onClose}
              title="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            background: '#fff',
            padding: '1rem',
            overflow: 'auto',
          }}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            alt="UML Diagram Full Screen"
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              transform: `scale(${zoom})`,
              transition: 'transform 0.2s',
              boxShadow: '0 2px 16px rgba(30,41,59,0.10)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UMLModal;
