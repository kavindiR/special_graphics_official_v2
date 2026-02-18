/**
 * Database Initialization Script
 * Run this once to create all database tables
 * 
 * Usage: 
 *   1. First build: npm run build
 *   2. Then run: npm run init-db
 *   OR: node init-database.js
 */

require('dotenv').config();

// Check if dist folder exists
const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('❌ Error: dist folder not found!');
  console.log('💡 Please run "npm run build" first to compile TypeScript.');
  process.exit(1);
}

const { sequelize } = require('./dist/config/database');

// Import all models to register them with Sequelize
require('./dist/models/User.model');
require('./dist/models/Design.model');
require('./dist/models/Contest.model');
require('./dist/models/ContestSubmission.model');
require('./dist/models/Portfolio.model');
require('./dist/models/Earnings.model');
require('./dist/models/Message.model');
require('./dist/models/Project.model');

async function initDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    console.log('🔄 Creating database tables...');
    // Sync all models (creates tables if they don't exist)
    // alter: true will update existing tables without dropping data
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables created/updated successfully');

    console.log('✅ Database initialization complete!');
    console.log('💡 You can now start your server with: npm start');
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

initDatabase();

