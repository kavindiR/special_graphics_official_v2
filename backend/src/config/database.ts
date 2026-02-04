import { Sequelize } from 'sequelize';

// Database configuration
const dbDialect = (process.env.DB_DIALECT || 'postgres') as 'postgres' | 'mysql' | 'sqlite';

// SQLite configuration
const isSqlite = dbDialect === 'sqlite';
const dbStorage = process.env.DB_STORAGE || './database.sqlite';

// PostgreSQL/MySQL configuration
const dbName = process.env.DB_NAME || 'special_graphics';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');

// Create Sequelize instance
const sequelizeConfig: any = {
  dialect: dbDialect,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: false
  }
};

// Add SQLite-specific configuration
if (isSqlite) {
  sequelizeConfig.storage = dbStorage;
} else {
  // Add PostgreSQL/MySQL-specific configuration
  sequelizeConfig.host = dbHost;
  sequelizeConfig.port = dbPort;
  // Only add pool configuration for non-SQLite databases
  sequelizeConfig.pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  };
}

export const sequelize = isSqlite
  ? new Sequelize({
      dialect: 'sqlite',
      storage: dbStorage,
      logging: sequelizeConfig.logging,
      define: sequelizeConfig.define
    })
  : new Sequelize(dbName, dbUser, dbPassword, sequelizeConfig);

// Test database connection
export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync models (in development, use { alter: true } or { force: true } carefully)
    if (process.env.NODE_ENV === 'development' && process.env.SYNC_DB === 'true') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synchronized');
    }
    
    // Only set up pool error handler for non-SQLite databases
    if (!isSqlite && sequelize.connectionManager.pool) {
      sequelize.connectionManager.pool.on('error', (err: Error) => {
        console.error('❌ Database connection pool error:', err);
      });
    }
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await sequelize.close();
      console.log('Database connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
