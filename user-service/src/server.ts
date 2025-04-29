import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../db';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './Routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Mount routes
app.use('/users', userRoutes);

// Error handler (should always be after routes)
app.use(errorHandler);

// Start server only if not in test environment
const PORT = process.env.DB_SERVICE_PORT || 4002;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`✅ User Service running on port ${PORT}`));
}

// Simple health check route
app.get("/health", (req: Request, res: Response) => {
  res.send("✅ User Service is healthy");
});

export default app;
