import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import { ApiError } from '../middlewares/apiError';

const router = Router();

// GET /users - Retrieve all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /users - Add a new user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new ApiError(400, 'Name and Email are required');
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, 'Email already in use');
    }


    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;
