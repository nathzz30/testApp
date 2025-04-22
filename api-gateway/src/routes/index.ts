import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { authenticate } from '../../middlewares/auth';

dotenv.config();

const router = express.Router();

// Service URLs (update with real ones if needed)
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Forward auth routes
router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Auth service error' });
  }
});

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Auth service error' });
  }
});

// Forward user routes
// Protect this route
router.get('/users', authenticate, async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`${USER_SERVICE_URL}/users`, {
        headers: {
          Authorization: req.headers.authorization || '',
        },
      });
      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'User service error' });
    }
  });

router.post('/users', async (req: Request, res: Response) => {
    try {
      const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'User service error' });
    }
  });

export default router;
