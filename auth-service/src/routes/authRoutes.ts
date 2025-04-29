import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import jwt from 'jsonwebtoken';
import { ApiError } from '../middlewares/apiError';

const router = Router();

// POST /auth/register - Create a new user
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, 'User already exists');
    }

    // Create user (will hash password via hook)
    const user = await User.create({ name, email, password });

    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
  } catch (error) {
    next(error);
  }
});

// POST /auth/login - Authenticate user and return JWT
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
