// api-gateway/src/routes/index.ts
import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { authenticate } from '../middlewares/auth';
import { ApiError } from '../middlewares/apiError';

dotenv.config();

const router = express.Router();

// Service URLs
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Forward auth/register
router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Auth register error:', error);
    next(new ApiError(error.response?.status || 500, error.response?.data?.message || 'Auth Service Error'));
  }
});

// Forward auth/login
router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Auth login error:', error);
    next(new ApiError(error.response?.status || 500, error.response?.data?.message || 'Auth Service Error'));
  }
});

// GET /users - Protected
router.get('/users', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Get users error:', error);
    next(new ApiError(error.response?.status || 500, error.response?.data?.message || 'User Service Error'));
  }
});

// POST /users - Create user (protected if you want)
router.post('/users', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Create user error:', error);
    next(new ApiError(error.response?.status || 500, error.response?.data?.message || 'User Service Error'));
  }
});

export default router;
