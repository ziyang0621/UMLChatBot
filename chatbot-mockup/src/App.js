import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import PUMLModal from './components/PUMLModal';
import UMLModal from './components/UMLModal';
import { apiService } from './services/api';
import './App.css';
import './modal.css';

function App() {
  // State for PUML modal visibility
  const [pumlModalVisible, setPUMLModalVisible] = useState(false);
  // State for UML modal visibility
  const [umlModalVisible, setUMLModalVisible] = useState(false);
  // State for chat messages
  const [messages, setMessages] = useState([]);
  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Handle chat input
  const handleChatInput = async (input) => {
    setIsLoading(true);
    try {
      const response = await apiService.getChatResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', content: input },
        {
          type: 'ai',
          content: response.message,
          umlDiagram: response.umlDiagram,
          pumlCode: response.pumlCode,
          summary: response.summary,
        },
      ]);
    } catch (error) {
      console.error('Error in chat:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  // Download PUML handler
  const downloadPUML = () => {
    const currentMessage = messages.find((m) => m.type === 'ai' && m.pumlCode);
    if (!currentMessage) return;

    const blob = new Blob([currentMessage.pumlCode], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user-management.puml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        onChatInput={handleChatInput}
        onPreviewPUML={() => setPUMLModalVisible(true)}
        onDownloadPUML={downloadPUML}
        onFullScreen={() => setUMLModalVisible(true)}
      />
      <PUMLModal
        visible={pumlModalVisible}
        onClose={() => setPUMLModalVisible(false)}
        pumlCode={messages.find((m) => m.type === 'ai' && m.pumlCode)?.pumlCode}
      />
      <UMLModal
        visible={umlModalVisible}
        onClose={() => setUMLModalVisible(false)}
        imageUrl={
          messages.find((m) => m.type === 'ai' && m.umlDiagram)?.umlDiagram
        }
      />
    </div>
  );
}

export default App;
