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

app.patch("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id); // Mocked
    if (!user) {
        res.status(404).json({ error: "User not found" });
    } else {
        const updated = await user.update(req.body); // Mocked method on user instance
        res.json(updated);
    }
  });
  
  app.delete("/users/:id", async (req, res) => {
    const deleted = await User.destroy({ where: { id: req.params.id } }); // Mocked
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

describe("User Service API", () => {
    let createdUserId: number;
    
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
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test User');
        createdUserId = res.body.id;
    });

    it('should update an existing user', async () => {
        console.log(createdUserId);
        const response = await request(app)
          .patch(`/users/${createdUserId}`)
          .send({
            name: 'Updated User',
          });
          console.log("Response ", response.status, response.body);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated User');
      });
    
    //   it('should delete a user', async () => {
    //     const response = await request(app)
    //       .delete(`/users/${createdUserId}`);
    
    //     expect(response.status).toBe(204); // No Content
    //   });
});
