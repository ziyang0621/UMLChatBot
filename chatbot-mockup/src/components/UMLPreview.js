import React from 'react';

const UMLPreview = ({
  umlDiagram,
  onPreviewPUML,
  onDownloadPUML,
  onFullScreen,
}) => (
  <div className="uml-preview">
    <div className="preview-header">
      <h4>UML Diagram Preview</h4>
      <div className="preview-actions">
        <button className="preview-btn" onClick={onDownloadPUML}>
          <i className="fas fa-download"></i>
          Download PUML
        </button>
        <button className="preview-btn" onClick={onFullScreen}>
          <i className="fas fa-expand"></i>
          Full Screen
        </button>
        <button className="preview-btn" onClick={onPreviewPUML}>
          <i className="fas fa-file-alt"></i>
          Preview PUML
        </button>
      </div>
    </div>
    <div className="preview-content">
      <img
        src={umlDiagram}
        alt="UML Diagram Preview"
        className="diagram-image"
      />
    </div>
  </div>
);

export default UMLPreview;
