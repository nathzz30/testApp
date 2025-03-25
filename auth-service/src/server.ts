// This will be implemented in the next section
// import express, { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// const app = express();
// app.use(express.json());

// const SECRET_KEY = 'yourSecretKey'; // Move to env variable in production

// app.post('/login', (req: Request, res: Response) => {
//     const { username } = req.body;
    
//     if (!username) {
//         return res.status(400).json({ error: 'Username is required' });
//     }

//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
// });

// app.listen(4001, () => console.log('Auth Service running on port 4001'));
