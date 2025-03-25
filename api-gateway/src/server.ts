// 1️⃣ API Gateway - Handles routing between services
// api-gateway/server.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));
app.use('/user', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));

app.listen(3000, () => console.log('API Gateway running on port 3000'));