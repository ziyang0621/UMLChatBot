document.addEventListener('DOMContentLoaded', () => {
  initializeChat();
  initializeUMLPreview();
  initializeSecurityAnalysis();
});

function initializeChat() {
  const textarea = document.querySelector('textarea');
  const sendButton = document.querySelector('.send-btn');
  const chatMessages = document.querySelector('.chat-messages');
  const newChatButton = document.querySelector('.new-chat-btn');

  // Auto-resize textarea
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });

  // Send message on Enter (without Shift)
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Send message on button click
  sendButton.addEventListener('click', sendMessage);

  // New chat button
  newChatButton.addEventListener('click', () => {
    // Clear chat messages
    chatMessages.innerHTML = '';
    // Reset textarea
    textarea.value = '';
    textarea.style.height = 'auto';
    // Update header
    document.querySelector('.chat-header h2').textContent = 'New Chat';
  });

  function sendMessage() {
    const message = textarea.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    textarea.value = '';
    textarea.style.height = 'auto';

    // Simulate AI response
    setTimeout(() => {
      if (message.toLowerCase().includes('uml')) {
        showUMLResponse();
      } else if (
        message.toLowerCase().includes('security') ||
        message.toLowerCase().includes('vulnerability')
      ) {
        showSecurityResponse();
      } else {
        showDefaultResponse();
      }
    }, 1000);
  }

  function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function initializeUMLPreview() {
  // Handle UML preview actions
  document.addEventListener('click', (e) => {
    if (e.target.closest('.preview-btn')) {
      const action = e.target.closest('.preview-btn').textContent.trim();
      if (action.includes('Download')) {
        downloadPUML();
      } else if (action.includes('Full Screen')) {
        showFullScreenPreview();
      } else if (action.includes('Preview PUML')) {
        showPUMLPreview();
      }
    }
  });

  // PUML modal close button
  const closePUMLBtn = document.getElementById('close-puml-modal');
  if (closePUMLBtn) {
    closePUMLBtn.addEventListener('click', hidePUMLPreview);
  }
  // Also close modal on overlay click
  const pumlModal = document.getElementById('puml-modal');
  if (pumlModal) {
    pumlModal.addEventListener('click', (e) => {
      if (e.target === pumlModal) hidePUMLPreview();
    });
  }
}

function initializeSecurityAnalysis() {
  // Handle security analysis interactions
  document.addEventListener('click', (e) => {
    if (e.target.closest('.analysis-item')) {
      const item = e.target.closest('.analysis-item');
      // Toggle detailed view
      item.classList.toggle('expanded');
    }
  });
}

// Response Templates
function showUMLResponse() {
  const response = `
        <div class="message-content">
            <p>I'll analyze the repository and generate a UML diagram for you.</p>
            <div class="uml-preview">
                <div class="preview-header">
                    <h4>UML Diagram Preview</h4>
                    <div class="preview-actions">
                        <button class="preview-btn">
                            <i class="fas fa-download"></i>
                            Download PUML
                        </button>
                        <button class="preview-btn">
                            <i class="fas fa-expand"></i>
                            Full Screen
                        </button>
                    </div>
                </div>
                <div class="preview-content">
                    <img src="images/sample-uml.svg" alt="UML Diagram Preview" class="diagram-image">
                </div>
            </div>
        </div>
    `;
  addAIResponse(response);
}

function showSecurityResponse() {
  const response = `
        <div class="message-content">
            <div class="security-analysis">
                <h4>Security Analysis Results</h4>
                <div class="analysis-item warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="analysis-content">
                        <h5>High Severity: SQL Injection Risk</h5>
                        <p>Found in: src/database/queries.js:45</p>
                        <p>Recommendation: Use parameterized queries</p>
                    </div>
                </div>
                <div class="analysis-item info">
                    <i class="fas fa-info-circle"></i>
                    <div class="analysis-content">
                        <h5>Medium Severity: Outdated Dependencies</h5>
                        <p>Found: 3 outdated packages with known vulnerabilities</p>
                        <p>Recommendation: Update to latest versions</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  addAIResponse(response);
}

function showDefaultResponse() {
  const response = `
        <div class="message-content">
            <p>I can help you with:</p>
            <ul>
                <li>Generating UML diagrams from your codebase</li>
                <li>Analyzing security vulnerabilities</li>
                <li>Providing code recommendations</li>
            </ul>
            <p>Just let me know what you'd like to do!</p>
        </div>
    `;
  addAIResponse(response);
}

function addAIResponse(content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ai-message';
  messageDiv.innerHTML = content;
  document.querySelector('.chat-messages').appendChild(messageDiv);
  document.querySelector('.chat-messages').scrollTop =
    document.querySelector('.chat-messages').scrollHeight;
}

// Utility Functions
function downloadPUML() {
  // In a real implementation, this would trigger the PUML file download
  console.log('Downloading PUML file...');

  // Sample PUML code for the diagram
  const pumlCode = `@startuml
skinparam classAttributeIconSize 0

class User {
    -id: string
    -name: string
    -email: string
    +create(): User
    +update(): void
}

class UserService {
    -userRepository: UserRepository
    -emailService: EmailService
    +findById(id: string): User
    +createUser(data: UserData): User
    +updateUser(id: string, data: UserData): User
}

interface UserRepository {
    +findById(id: string): User
    +save(user: User): User
    +delete(id: string): void
}

class EmailService {
    +sendWelcomeEmail(user: User): void
    +sendPasswordReset(user: User): void
    +sendNotification(user: User, msg: string): void
}

UserService --> User : manages
UserService --> UserRepository : uses
UserService --> EmailService : uses
@enduml`;

  // Create and trigger download
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(pumlCode);
  link.download = 'user-management.puml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showFullScreenPreview() {
  // Find the most recent UML preview image
  let imageUrl = null;
  // Try to get the last .uml-preview .diagram-image in the chat
  const previews = document.querySelectorAll('.uml-preview .diagram-image');
  if (previews.length > 0) {
    imageUrl = previews[previews.length - 1].src;
  } else {
    // fallback to the static sample
    imageUrl = 'images/sample-uml.svg';
  }
  window.umlModal.open(imageUrl);
}

function showPUMLPreview() {
  const modal = document.getElementById('puml-modal');
  if (modal) modal.classList.add('active');
}

function hidePUMLPreview() {
  const modal = document.getElementById('puml-modal');
  if (modal) modal.classList.remove('active');
}
