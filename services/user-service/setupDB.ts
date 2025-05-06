// user-service/setupDB.ts
import { Sequelize } from "sequelize";
import { sequelize as appSequelize } from "./db";
import { User } from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER ='users', DB_PASSWORD, DB_NAME } = process.env;

const createDatabaseIfNotExists = async () => {
  try {
    const tempSequelize = new Sequelize("postgres", DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: Number(DB_PORT),
      dialect: "postgres",
      logging: false,
    });

    const [results] = await tempSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';`
    );

    if ((results as any[]).length === 0) {
      await tempSequelize.query(`CREATE DATABASE "${DB_NAME}";`);
      console.log(`✅ Database '${DB_NAME}' created.`);
    } else {
      console.log(`ℹ️ Database '${DB_NAME}' already exists.`);
    }

    await tempSequelize.close();
  } catch (err) {
    console.error("❌ Error checking/creating database:", err);
    process.exit(1);
  }
};

const setupDatabase = async () => {
  try {
    await createDatabaseIfNotExists();

    await appSequelize.authenticate();
    await appSequelize.sync({ force: false });

    const users = await User.findAll();
    if (users.length === 0) {
      await User.bulkCreate([
        { name: "Jane Doe", email: "jane@example.com" },
        { name: "John Smith", email: "john@example.com" },
      ]);
      console.log("✅ Seed data inserted into 'users' table");
    }

    console.log("✅ Database setup complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up the database:", error);
    process.exit(1);
  }
};

setupDatabase();
