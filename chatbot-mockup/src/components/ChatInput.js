import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask me to analyze code, generate UML diagrams, or scan for vulnerabilities..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        <i className="fas fa-paper-plane"></i>
        <span>Send</span>
      </button>
    </form>
  );
};

export default ChatInput;
