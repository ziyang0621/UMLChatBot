export const config = {
  useMockData: true, // Set to false to use real API
  apiBaseUrl: 'http://localhost:8080',
  endpoints: {
    chat: '/govi/chat',
  },
};

// Mock data for development
export const mockData = {
  chatResponse: {
    message: "I'll analyze the repository and generate a UML diagram for you.",
    umlDiagram: '/sample-uml.svg',
    pumlCode: `@startuml
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
@enduml`,
    summary:
      'This UML diagram models a user management system with four main components: User, UserService, UserRepository, and EmailService. It illustrates class attributes, methods, and relationships, showing how UserService interacts with repositories and services to manage users and send notifications, supporting modular and maintainable application architecture.',
  },
};
