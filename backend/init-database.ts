/**
 * Database Initialization Script (TypeScript version)
 * Run this with ts-node: npx ts-node init-database.ts
 * Or compile first: npm run build && node dist/init-database.js
 */

import dotenv from 'dotenv';
import { sequelize } from './src/config/database';

// Import all models to register them with Sequelize
import './src/models/User.model';
import './src/models/Design.model';
import './src/models/Contest.model';
import './src/models/ContestSubmission.model';
import './src/models/Portfolio.model';
import './src/models/Earnings.model';
import './src/models/Message.model';
import './src/models/Project.model';

// Load environment variables
dotenv.config();

async function initDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    console.log(`📡 Database: ${process.env.DB_NAME || 'not set'}`);
    console.log(`📡 Host: ${process.env.DB_HOST || 'localhost'}`);
    
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
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);
    }
    console.error('\n💡 Troubleshooting:');
    console.error('1. Check your .env file has correct database credentials');
    console.error('2. Make sure PostgreSQL is running');
    console.error('3. Verify database exists: CREATE DATABASE special_graphics;');
    console.error('4. Check database user has proper permissions');
    process.exit(1);
  }
}

initDatabase();

