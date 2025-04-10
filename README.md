# 🧱 Microservices Starter Project

This project contains multiple microservices including:
- `user-service`: Handles user-related operations
- `auth-service`: Handles authentication and JWT
- `api-gateway`: Exposes APIs and routes to internal services

Each service is built with **Node.js**, **Express**, **TypeScript**, and uses **PostgreSQL** as the database. Docker is used for containerization and deployment.

---

## 🚀 Getting Started

These instructions will help you get the `user-service` running locally.

### 📦 Prerequisites
- Node.js (>=18)
- Yarn (v1.22.22)
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

# 4. Setup the database
$ yarn setup-db:user-service

# 5. Start the user-service (dev mode)
$ yarn workspace user-service dev
```

---

### 🧪 Run Tests

```bash
$ yarn workspace user-service test
```

---

### ✅ Endpoints

Once the service is running:

```bash
GET http://localhost:4002/users
POST http://localhost:4002/users
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
```

---

### 🧹 Linting

```bash
$ yarn lint
```

---

### 🔐 Environment Variables

Create a `.env` file inside each service folder:

```env
DB_URL=postgres://postgres:password@localhost:5432/users
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=users
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

  postgres:
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
# Reinstall dependencies from scratch
$ yarn reinstall

# Setup DB manually
$ yarn setup-db:user-service
```

Let me know if you want instructions for `auth-service` or `api-gateway` too!

