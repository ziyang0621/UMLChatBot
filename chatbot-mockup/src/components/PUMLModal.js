import React from 'react';

const PUMLModal = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="puml-modal active" onClick={onClose}>
      <div className="puml-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="puml-modal-header">
          <span>PUML File Preview</span>
          <button className="close-puml-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <pre className="puml-code">
          <code>{`@startuml
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
@enduml`}</code>
        </pre>
      </div>
    </div>
  );
};

export default PUMLModal;
