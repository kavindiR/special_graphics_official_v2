# Special Graphics Backend API

Express.js backend server for the Special Graphics application, built with TypeScript, PostgreSQL, and JWT authentication.

## 🚀 Features

- **RESTful API** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Sequelize ORM
- **JWT Authentication** for secure user sessions
- **Password Hashing** with bcryptjs
- **Input Validation** with express-validator
- **Error Handling** middleware
- **CORS** enabled for frontend integration
- **Security** headers with Helmet
- **Request Logging** with Morgan
- **Response Compression** for better performance
- **Rate Limiting** for login attempts

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ (local or cloud database)

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DB_NAME` - PostgreSQL database name (default: special_graphics)
   - `DB_USER` - PostgreSQL username (default: postgres)
   - `DB_PASSWORD` - PostgreSQL password
   - `DB_HOST` - PostgreSQL host (default: localhost)
   - `DB_PORT` - PostgreSQL port (default: 5432)
   - `JWT_SECRET` - A secret key for JWT tokens
   - `PORT` - Server port (default: 5000)
   - `FRONTEND_URL` - Your frontend URL for CORS
   - `SYNC_DB` - Set to 'true' in development to auto-sync models (optional)

## 🏃 Running the Server

### Development Mode
```bash
npm run dev
```
Server will run on `http://localhost:5000` (or your configured PORT)

### Production Mode
```bash
# Build TypeScript
npm run build

# Start server
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (rate limited: 5 attempts per 15 minutes)
- `POST /api/auth/logout` - Logout user (protected)
- `POST /api/auth/refresh-token` - Refresh JWT token (protected)
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Inspirations (Public)
- `GET /api/inspirations` - Get all inspirations
- `GET /api/inspirations/:id` - Get inspiration by ID
- `GET /api/inspirations/search?q=query&tags=tag1&tools=tool` - Search inspirations
- `POST /api/inspirations/:id/like` - Toggle like (protected)

### Designs (Protected)
- `POST /api/designs` - Create new design
- `GET /api/designs` - Get all designs
- `GET /api/designs/:id` - Get design by ID
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design

### Users (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /health` - Server health check

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## 📝 Example Requests

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "designer"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Design (Protected)
```bash
POST /api/designs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Creative Logo Design",
  "description": "Modern minimalist branding",
  "image": "https://example.com/image.jpg",
  "tags": ["Logo", "Branding"],
  "tools": "Illustrator"
}
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts   # Authentication logic
│   │   ├── designs.controller.ts
│   │   ├── inspirations.controller.ts
│   │   └── users.controller.ts
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   ├── errorHandler.ts      # Error handling
│   │   └── notFound.ts          # 404 handler
│   ├── models/
│   │   ├── User.model.ts        # User schema
│   │   └── Design.model.ts      # Design schema
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── designs.routes.ts
│   │   ├── inspirations.routes.ts
│   │   └── users.routes.ts
│   └── server.ts                # Express app entry point
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `DB_NAME` | PostgreSQL database name | `special_graphics` |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | Required |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_DIALECT` | Database dialect | `postgres` |
| `JWT_SECRET` | Secret key for JWT | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `SYNC_DB` | Auto-sync models in development | `false` |

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running locally or cloud database connection details are correct
- Check firewall settings if using a cloud PostgreSQL service
- Verify database exists: `CREATE DATABASE special_graphics;`
- Ensure user has proper permissions on the database

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port

### JWT Errors
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration

## 📦 Dependencies

### Production
- `express` - Web framework
- `sequelize` - SQL ORM for PostgreSQL
- `pg` - PostgreSQL client
- `pg-hstore` - PostgreSQL hstore support
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `helmet` - Security headers
- `morgan` - HTTP request logger
- `compression` - Response compression

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Auto-reload on changes
- `@types/*` - TypeScript type definitions

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Express.js and TypeScript

