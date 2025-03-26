import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"; // Import dotenv to load environment variables
import { User } from "./models/User";

// Load environment variables from a .env file
dotenv.config();

// Get the DATABASE_URL from the environment variables
const DATABASE_URL = process.env.DB_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from environment variables");
}

// Initialize Sequelize with the DATABASE_URL
export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User], // Register the User model
});

export const connectDB = async () => {
  try {
    await sequelize.sync(); // Sync models with the database
    console.log('✅ Database connected & models synchronized');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};
