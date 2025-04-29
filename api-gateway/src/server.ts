import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

// Simple health check route
app.get("/health", (req: Request, res: Response) => {
  res.send("✅ Auth Service is healthy");
});
