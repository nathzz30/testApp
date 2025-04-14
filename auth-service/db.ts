import { Sequelize } from "sequelize-typescript"; // Sequelize ORM with TypeScript support
import dotenv from "dotenv"; // For loading environment variables
import { User } from "./models/User"; // Importing User model

dotenv.config(); // Load variables from .env

// Get the database connection string from environment
const DATABASE_URL = process.env.DB_URL;

if (!DATABASE_URL) {
  // Ensure a valid DB connection string is provided
  throw new Error("DATABASE_URL is missing from environment variables");
}

// Initialize Sequelize instance with DB connection and dialect
export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres", // Specify the database dialect
  models: [User], // You’ll register models here later (e.g., User model)
});

// Function to connect and sync database models
export const connectDB = async () => {
  try {
    await sequelize.sync(); // Synchronize models with the database
    console.log("✅ Auth DB connected & models synced");
  } catch (error) {
    console.error("❌ Error connecting to Auth DB:", error);
  }
};
