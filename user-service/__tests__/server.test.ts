import request from "supertest";
import express from "express";
import { User } from "../models/User"; // Mocked
import { sequelize } from "../db"; // Mocked DB connection

const app = express();
app.use(express.json());

// Import the route handlers and attach them (simulate Express app)
app.get("/users", async (req, res) => {
  const users = await User.findAll(); // Mocked method
  res.json(users);
});

app.post("/users", async (req, res) => {
  const newUser = await User.create(req.body); // Mocked method
  res.status(201).json(newUser);
});

describe("User Service API", () => {
    beforeAll(async () => {
        await sequelize.sync(); // Ensure DB structure is ready
    });

    afterAll(async () => {
        await sequelize.close(); // Close DB connection after tests
    });

    it("should return a list of users", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2); // Should match the mock data
    });

    it("should create a new user", async () => {
        const newUser = { name: "Test User", email: "test@example.com" };
        const res = await request(app).post("/users").send(newUser);
        
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("Test User");
    });
});
