// Mock Sequelize Model methods
jest.mock("../models/User", () => ({
  User: {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" },
    ]),
    create: jest.fn().mockImplementation((data) => Promise.resolve({ id: 3, ...data })),
  },
}));

jest.mock("../db", () => ({
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(true),
      sync: jest.fn().mockResolvedValue(true),
      close: jest.fn().mockResolvedValue(true),
    },
  }));