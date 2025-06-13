import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatContainer = ({
  messages,
  isLoading,
  onChatInput,
  onPreviewPUML,
  onDownloadPUML,
  onFullScreen,
}) => (
  <main className="chat-container">
    <ChatHeader />
    <ChatMessages
      messages={messages}
      isLoading={isLoading}
      onPreviewPUML={onPreviewPUML}
      onDownloadPUML={onDownloadPUML}
      onFullScreen={onFullScreen}
    />
    <ChatInput onSend={onChatInput} disabled={isLoading} />
  </main>
);

export default ChatContainer;
