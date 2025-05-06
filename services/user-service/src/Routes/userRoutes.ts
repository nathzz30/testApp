import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
import { ApiError } from '../middlewares/apiError';

const router = Router();

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

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

// PATCH /users/:id - Update an existing user
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (name && name.length < 2) {
      throw new ApiError(400, 'Name must be at least 2 characters');
    }

    if (email && !isValidEmail(email)) {
      throw new ApiError(400, 'Valid email is required');
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    await user.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
});

export default router;
