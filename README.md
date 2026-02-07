# Courses Microservice

A TypeScript-based REST API microservice for managing courses and training records. This service provides CRUD operations for course management with MongoDB integration.

## 🚀 Features

- **Course Management**: Create, read, and search courses
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **TypeScript**: Full type safety and modern JavaScript features
- **RESTful API**: Clean and standard HTTP endpoints
- **Search Functionality**: Filter courses by name, company, and level
- **Environment Configuration**: Secure configuration management

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
http://localhost:3000/courses
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create a new course | `{ name, company, hours, level }` |
| GET | `/` | Get all courses or search by parameters | Query params: `name`, `company`, `level` |
| GET | `/:id` | Get a course by ID | - |

### Course Schema
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

### Example Requests

#### Create a Course
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript Fundamentals",
    "company": "Tech Academy",
    "hours": 40,
    "level": "intermediate"
  }'
```

#### Get All Courses
```bash
curl http://localhost:3000/courses
```

#### Search Courses
```bash
# Search by company
curl "http://localhost:3000/courses?company=Tech%20Academy"

# Search by name
curl "http://localhost:3000/courses?name=TypeScript"

# Search by level
curl "http://localhost:3000/courses?level=intermediate"
```

#### Get Course by ID
```bash
curl http://localhost:3000/courses/507f1f77bcf86cd799439011
```

## 🏗️ Project Structure

```
src/
├── app.ts              # Main application entry point
├── config/
│   └── database.ts     # MongoDB connection configuration
├── constants/
│   └── courses.ts      # Application constants
├── controller/
│   └── course.controller.ts  # HTTP request handlers
├── interface/
│   └── course.interface.ts   # TypeScript interfaces
├── model/
│   └── course.model.ts       # Mongoose schema and model
├── repository/
│   └── course.repository.ts  # Data access layer
├── routes/
│   └── course.routes.ts      # API route definitions
├── service/
│   └── course.service.ts     # Business logic layer
└── shared/
    └── ...                   # Shared utilities
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
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

- `201` - Course created successfully
- `200` - Request successful
- `404` - Course not found
- `500` - Internal server error

Error response format:
```json
{
  "message": "Course not found"
}
```

## 📈 Future Enhancements

- [ ] PUT endpoint for updating courses
- [ ] DELETE endpoint for removing courses
- [ ] Pagination for large datasets
- [ ] Authentication and authorization
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Rate limiting
- [ ] Logging and monitoring
