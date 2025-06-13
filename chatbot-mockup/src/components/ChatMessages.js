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
    {messages.map((message, index) => {
      const hasUML =
        message.type === 'ai' &&
        message.pumlCode &&
        message.pumlCode.includes('@startuml') &&
        message.pumlCode.includes('@enduml');

      const isVuln =
        message.type === 'ai' &&
        !hasUML &&
        /vulnerab|dependency|CVE|log4j|critical/i.test(message.content);

      return (
        <div key={index} className={`message ${message.type}-message`}>
          <div className="message-content">
            <p>{message.content}</p>
            {hasUML && (
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
            {isVuln && (
              <div className="security-alert">
                <h4>Security Alert</h4>
                <div
                  style={{
                    whiteSpace: 'pre-line',
                    color: '#b91c1c',
                    fontWeight: 500,
                  }}
                >
                  {message.content}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    })}
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
