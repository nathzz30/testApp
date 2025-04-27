# 🧱 Microservices Starter Project

This project contains multiple microservices including:
- `user-service`: Handles user-related operations
- `auth-service`: Handles authentication and JWT
- `api-gateway`: Exposes APIs and routes to internal services

Each service is built with **Node.js**, **Express**, **TypeScript**, and uses **PostgreSQL** as the database. Docker is used for containerization and deployment.

---

## 🚀 Getting Started

These instructions will help you get all microservices running locally.

### 📦 Prerequisites
- Node.js (>=18)
- Yarn (v1.22.22 or newer)
- Docker & Docker Compose

---

### 🛠️ Installation

```bash
# 1. Clone the repository
$ git clone <your-repo-url>
$ cd testApp

# 2. Install dependencies
$ yarn install

# 3. Start PostgreSQL and all services
$ docker-compose up -d

# 4. Setup the databases
$ yarn setup-db:user-service
$ yarn setup-db:auth-service

# 5. Start each service (dev mode)
$ yarn workspace user-service dev
$ yarn workspace auth-service dev
$ yarn workspace api-gateway dev
```

---

### 🧪 Run Tests

```bash
# Run tests for user-service
$ yarn workspace user-service test

# Run tests for auth-service
$ yarn workspace auth-service test
```

---

### ✅ Endpoints

Once the services are running:

#### User Service
```bash
GET http://localhost:4002/users
POST http://localhost:4002/users
```

#### Auth Service
```bash
POST http://localhost:4001/auth/register
POST http://localhost:4001/auth/login
```

---

### 📁 Folder Structure

```
user-service/
│
├── db.ts
├── setupDB.ts        # Initializes DB and creates it if not present
├── models/
│   └── User.ts
├── src/
│   └── server.ts
└── __tests__/
    └── server.test.ts

auth-service/
│
├── db.ts
├── setupDB.ts        # Initializes DB and creates it if not present
├── models/
│   └── User.ts
├── routes/
│   └── authRoutes.ts
├── src/
│   └── server.ts
└── __tests__/
    └── server.test.ts
```

---

### 🧹 Linting

```bash
$ yarn lint
$ yarn lint:fix
```

---

### 🔐 Environment Variables

Create a `.env` file inside each service folder:

#### user-service/.env
```env
DB_URL=postgres://postgres:password@localhost:5432/users
PORT=4002
```

#### auth-service/.env
```env
DB_URL=postgres://postgres:password@localhost:5432/auth
JWT_SECRET=supersecretkey
PORT=4001
```

---

### 🐳 Docker Compose Overview

```yaml
services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"

  auth-service:
    build: ./auth-service
    ports:
      - "4001:4001"

  user-service:
    build: ./user-service
    ports:
      - "4002:4002"

  postgres-auth:
    image: postgres                       
    environment:
      POSTGRES_USER: postgres              
      POSTGRES_PASSWORD: password         
      POSTGRES_DB: auth                    
    ports:
      - "5433:5432"                        

  # 🛢️ PostgreSQL for user-service
  postgres-user:
    image: postgres                       
    environment:
      POSTGRES_USER: postgres             
      POSTGRES_PASSWORD: password          
      POSTGRES_DB: users                   
    ports:
      - "5432:5432" 
```

---

### 🧠 Helpful Commands

```bash
# Reinstall dependencies from scratch (cross-platform)
$ yarn reinstall

# Setup DB manually for each service
$ yarn setup-db:auth-service
$ yarn setup-db:user-service