// 3️⃣ User Service - Handles user-related data
// user-service/server.ts
import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const pool = new Pool({ user: 'postgres', host: 'localhost', database: 'users', password: 'password', port: 5432 });

app.get('/users', async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.listen(4002, () => console.log('User Service running on port 4002'));