// 2️⃣ Authentication Service - Handles user authentication
// auth-service/server.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
});

app.listen(4001, () => console.log('Auth Service running on port 4001'));