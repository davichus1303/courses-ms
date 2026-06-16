# Training Management System Backend

A comprehensive TypeScript-based REST API microservice for managing training platforms. This service provides complete CRUD operations for courses, companies, users, and roles with MongoDB integration, JWT authentication, and role-based access control.

## 🚀 Features

- **Multi-Entity Management**: Complete CRUD for Courses, Companies, Users, and Roles
- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing
- **Role-Based Access Control (RBAC)**: Granular permissions system with role assignments
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **TypeScript**: Full type safety and modern JavaScript features
- **RESTful API**: Clean and standard HTTP endpoints with proper HTTP status codes
- **Middleware System**: Authentication, logging, and centralized error handling
- **Logging**: Winston-based structured logging
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Dependency Injection**: Tsyringe for IoC container
- **Docker Support**: Multi-stage Docker build for production deployment

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd courses-ms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/courses-db
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:3000` with hot reload enabled.

### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/auth/login` | User login and JWT token generation | `{ email, password }` |

### Course Endpoints (Protected)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/courses` | Create a new course | Course object |
| GET | `/courses` | Get all courses | - |
| GET | `/courses/:id` | Get a course by ID | - |
| PUT | `/courses` | Update a course | Course object |
| DELETE | `/courses` | Delete a course | - |

### Company Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/companies/simple-active` | Get active companies (simple list) | Public |
| GET | `/companies` | Get all companies | Protected |
| POST | `/companies` | Create a new company | Protected |
| PUT | `/companies/:id` | Update a company | Protected |
| DELETE | `/companies/:id` | Delete a company | Protected |

### User Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/users` | Create a new user | Public |
| GET | `/users` | Get all users | Protected |
| PUT | `/users/:userId` | Update a user | Protected |
| DELETE | `/users/:userId` | Delete a user | Protected |

### Role Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/roles/simple-active` | Get active roles (simple list) | Public |
| POST | `/roles` | Create a new role | Protected |
| GET | `/roles` | Get all roles | Protected |
| PUT | `/roles` | Update a role | Protected |
| DELETE | `/roles` | Delete a role | Protected |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |

### Data Models

#### Course Schema
```typescript
{
  name: string;        // Course name
  company: string;     // Training company
  hours: number;       // Course duration in hours
  level: string;       // Course level (e.g., "beginner", "intermediate", "advanced")
  createdDate?: Date;  // Auto-generated
  updatedDate?: Date;  // Auto-generated
}
```

#### User Schema
```typescript
{
  name?: string;
  lastName?: string;
  surName?: string;
  email: string;
  password?: string;   // Hashed with bcrypt
  companyOId?: ObjectId;
  roleOId?: ObjectId;
  isActive?: boolean;
  isDelete?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
```

#### Company Schema
```typescript
{
  name: string;
  description?: string;
  numberEmployees?: number;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  principalContact?: string;
  principalContactPhone?: string;
  createdDate?: Date;
  updatedDate?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
}
```

#### Role Schema
```typescript
{
  name: string;
  permissions?: Array<PermissionPages>;
  isActive?: boolean;
  isDelete?: boolean;
  isDefault?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
```

### Example Requests

#### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Create a Course (Protected)
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "name": "TypeScript Fundamentals",
    "company": "Tech Academy",
    "hours": 40,
    "level": "intermediate"
  }'
```

#### Get All Companies (Protected)
```bash
curl http://localhost:3000/companies \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Get Active Companies (Public)
```bash
curl http://localhost:3000/companies/simple-active
```

## 🏗️ Project Structure

```
src/
├── app.ts                      # Main application entry point
├── config/
│   └── database.ts            # MongoDB connection configuration
├── constants/
│   ├── Company.constants.ts   # Company-related constants
│   ├── courses.ts             # Course-related constants
│   ├── Role.constants.ts      # Role-related constants
│   └── User.constants.ts      # User-related constants
├── controller/
│   ├── Company.controller.ts  # Company HTTP request handlers
│   ├── course.controller.ts   # Course HTTP request handlers
│   ├── Role.controller.ts     # Role HTTP request handlers
│   └── User.controller.ts     # User HTTP request handlers
├── enums/
│   ├── course.enum.ts         # Course enumerations
│   └── users.enum.ts          # User enumerations
├── handlerErrors/
│   ├── company.errorHandler.ts   # Company error handlers
│   ├── Role.errorHandler.ts      # Role error handlers
│   └── user.errorHandler.ts      # User error handlers
├── helpers/
│   ├── Jwt.helper.ts          # JWT token generation/validation
│   └── Password.helper.ts     # Password hashing with bcrypt
├── interface/
│   ├── Company.interface.ts   # Company TypeScript interfaces
│   ├── course.interface.ts    # Course TypeScript interfaces
│   ├── error.interface.ts     # Error handling interfaces
│   ├── jwtpayload.interface.ts # JWT payload interface
│   ├── Login.interface.ts     # Login request interface
│   ├── Permission.model.ts    # Permission model
│   ├── PermissionPages.interface.ts # Permission pages interface
│   ├── Role.interface.ts      # Role TypeScript interfaces
│   ├── RoleParams.interface.ts # Role parameters interface
│   ├── User.interface.ts      # User TypeScript interfaces
│   └── UsersParams.interface.ts # User parameters interface
├── middleware/
│   ├── Auth.middleware.ts     # JWT authentication middleware
│   ├── Error.midleware.ts     # Centralized error handling
│   └── Logger.middleware.ts   # Request logging middleware
├── model/
│   ├── Company.model.ts       # Company Mongoose schema
│   ├── course.model.ts        # Course Mongoose schema
│   ├── Role.model.ts          # Role Mongoose schema
│   └── User.model.ts          # User Mongoose schema
├── repository/
│   ├── Company.repository.ts  # Company data access layer
│   ├── course.repository.ts   # Course data access layer
│   ├── Role.repository.ts     # Role data access layer
│   └── User.repository.ts     # User data access layer
├── routes/
│   ├── Auth.routes.ts         # Authentication routes
│   ├── Health.routes.ts       # Health check routes
│   ├── company.routes.ts      # Company API routes
│   ├── course.routes.ts       # Course API routes
│   ├── Role.routes.ts         # Role API routes
│   └── User.routes.ts         # User API routes
├── service/
│   ├── Company.service.ts     # Company business logic
│   ├── course.service.ts      # Course business logic
│   ├── Role.service.ts        # Role business logic
│   └── User.service.ts        # User business logic
└── shared/
    ├── errorsCatcher.ts      # Shared error utilities
    └── interfaces/
        └── ParamsForUniqueLists.interface.ts # Shared interfaces
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT token generation and validation
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **winston** - Structured logging
- **tsyringe** - Dependency injection container
- **ts-node-dev** - TypeScript development server

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT token generation | Required |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔍 Error Handling

The API returns appropriate HTTP status codes and error messages:

- `201` - Resource created successfully
- `200` - Request successful
- `401` - Unauthorized (invalid or missing JWT token)
- `403` - Forbidden (insufficient permissions)
- `404` - Resource not found
- `500` - Internal server error

Error response format:
```json
{
  "message": "Error description"
}
```

The service implements centralized error handling through middleware with custom error handlers for each entity.

## 📈 Future Enhancements

- [ ] Pagination for large datasets
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Rate limiting
- [ ] Enhanced monitoring and metrics
- [ ] Email notifications
- [ ] File upload support for course materials
- [ ] Course enrollment tracking
- [ ] Progress tracking for users

## 🐳 Docker Deployment

The project includes a multi-stage Dockerfile for production deployment.

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t courses-ms .

# Run the container
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/courses-db \
  -e JWT_SECRET=your-secret-key \
  courses-ms
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  courses-ms:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - MONGO_URI=mongodb://mongodb:27017/courses-db
      - JWT_SECRET=your-secret-key
    depends_on:
      - mongodb
  
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db

volumes:
  mongodb-data:
```

Run with:
```bash
docker-compose up
```

## 🔗 Related Projects

This microservice is part of the Ascendia platform:
- **[ascendia-web](../ascendia-web)** - Frontend application built with React, TypeScript, and Vite that consumes this API
