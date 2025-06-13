import React from 'react';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-header">
      <h1>Code Catalyst</h1>
      <button className="new-chat-btn">
        <i className="fas fa-plus"></i>
        New Chat
      </button>
    </div>
    <div className="chat-history">
      <h3>Recent Chats</h3>
      <div className="history-item active">
        <i className="fas fa-comment"></i>
        <span>UML Analysis - React Project</span>
      </div>
      <div className="history-item">
        <i className="fas fa-shield-alt"></i>
        <span>Security Scan - Node.js App</span>
      </div>
      <div className="history-item">
        <i className="fas fa-code"></i>
        <span>Code Review - Python API</span>
      </div>
    </div>
    <div className="sidebar-footer">
      <button className="settings-btn">
        <i className="fas fa-cog"></i>
        Settings
      </button>
    </div>
  </aside>
);

export default Sidebar;
