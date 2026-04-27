import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  
  // Development vs Production settings
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // CORS settings based on environment
  corsOrigins: process.env.NODE_ENV === 'production' 
    ? [
        process.env.CLIENT_URL,
        // Add production URLs
      ]
    : [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:5174',
        process.env.CLIENT_URL
      ].filter(Boolean)
};