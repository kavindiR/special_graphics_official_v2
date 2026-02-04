# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your MongoDB URI
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/special-graphics

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/special-graphics
```

### Step 3: Start MongoDB
**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running locally
# On Windows: MongoDB should be running as a service
# On Mac/Linux: mongod
```

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

### Step 4: Run the Server
```bash
# Development mode (with auto-reload)
npm run dev

# The server will start on http://localhost:5000
```

### Step 5: Test the API
```bash
# Health check
curl http://localhost:5000/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 📝 Next Steps

1. **Connect Frontend**: Update your frontend to use `http://localhost:5000/api` as the API base URL
2. **Add Authentication**: Use the JWT token from login response in Authorization header
3. **Create Designs**: Use the `/api/designs` endpoint to create and manage designs
4. **View Inspirations**: Use `/api/inspirations` to fetch design inspirations

## 🔗 API Documentation

See `README.md` for complete API documentation.

## 🐛 Troubleshooting

**Port already in use?**
- Change `PORT` in `.env` file

**MongoDB connection failed?**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check firewall settings for MongoDB Atlas

**Module not found errors?**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

