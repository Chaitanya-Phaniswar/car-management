# Car Management Application - Backend

A Node.js/Express.js backend application providing RESTful APIs for car management with MongoDB database integration, user authentication, and image handling capabilities.

## 🚀 Features

- **User Management**
  - User registration and authentication
  - JWT-based authorization
  - Password encryption

- **Car Management**
  - CRUD operations for car listings
  - Multiple image upload support (up to 10 images)
  - Tag-based categorization
  - Search functionality across multiple fields

- **API Documentation**
  - Swagger/OpenAPI documentation
  - API testing endpoints
  - Detailed request/response examples

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Swagger UI** - API documentation

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or above)
- MongoDB (local or Atlas URI)
- npm or yarn package manager
- Cloudinary account (for image storage)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-management-app.git
cd car-management-app/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the backend root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── carController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Car.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── cars.js
│   └── app.js
├── swagger/
├── .env
└── package.json
```

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
```

### Cars
```
GET    /api/cars - Get all cars for logged-in user
POST   /api/cars - Create new car
GET    /api/cars/:id - Get specific car
PUT    /api/cars/:id - Update car
DELETE /api/cars/:id - Delete car
GET    /api/cars/search - Search cars
```

## 📚 API Documentation

Access the API documentation at `/api/docs` when the server is running. The documentation includes:

- Detailed endpoint descriptions
- Request/Response examples
- Authentication requirements
- Schema definitions

## 📝 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-management
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🔒 Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Car Model
```javascript
{
  title: String,
  description: String,
  images: [String],
  tags: [String],
  owner: ObjectId,
  carType: String,
  company: String,
  dealer: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred hosting service (e.g., Heroku, DigitalOcean)

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run generate-docs` - Generate API documentation

## ⚙️ Error Handling

The API uses consistent error response format:

```javascript
{
  "success": false,
  "message": "Error message here",
  "error": {
    // Detailed error information
  }
}
```

## 🔒 Security Implementations

- JWT authentication
- Password hashing using bcrypt
- Request rate limiting
- CORS configuration
- Input validation and sanitization
- Secure HTTP headers

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The tests cover:
- User authentication
- Car CRUD operations
- Image upload
- Search functionality
- Error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.