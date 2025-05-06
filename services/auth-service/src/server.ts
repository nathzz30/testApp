import express, { Request, Response } from "express"; // Import Express and types for request/response handling
import dotenv from "dotenv"; // Import dotenv to load environment variables from .env file
import { connectDB } from "../db"; // Import the function that initializes the database
import authRouter from './routes/authRoutes'; // Import the router
import { errorHandler } from './middlewares/errorHandler';

dotenv.config(); // Load environment variables from .env

const app = express(); // Initialize Express application
app.use(express.json()); // Middleware to parse incoming JSON payloads

const PORT = process.env.PORT || 4001; // Use PORT from .env or default to 4001

connectDB(); // Connect to the database

// Use the authRouter for routes under /auth
app.use('/auth', authRouter);

// Error handler (should always be after routes)
app.use(errorHandler);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Simple health check route
app.get("/health", (req: Request, res: Response) => {
  res.send("✅ Auth Service is healthy");
});

// Export the app instance for testing purposes
export default app;
