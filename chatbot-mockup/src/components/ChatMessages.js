import React from 'react';
import UMLPreview from './UMLPreview';

const ChatMessages = ({
  messages,
  isLoading,
  onPreviewPUML,
  onDownloadPUML,
  onFullScreen,
}) => (
  <div className="chat-messages">
    {messages.map((message, index) => (
      <div key={index} className={`message ${message.type}-message`}>
        <div className="message-content">
          <p>{message.content}</p>
          {message.type === 'ai' && message.umlDiagram && (
            <>
              <UMLPreview
                umlDiagram={message.umlDiagram}
                onPreviewPUML={onPreviewPUML}
                onDownloadPUML={onDownloadPUML}
                onFullScreen={onFullScreen}
              />
              <div className="uml-summary">
                <h4>Summary</h4>
                <p>{message.summary}</p>
              </div>
            </>
          )}
        </div>
      </div>
    ))}
    {isLoading && (
      <div className="message ai-message">
        <div className="message-content">
          <div className="loading-indicator">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Generating response...</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default ChatMessages;
