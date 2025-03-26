import express, { Request, Response } from 'express';
import { connectDB } from '../db';
import { User } from '../models/User';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.DB_PORT || 4002;

// Connect to the database and sync models
connectDB();

// GET /users - Retrieve all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /users - Add a new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`✅ User Service running on port ${PORT}`));
