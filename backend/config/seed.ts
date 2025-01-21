import { User } from "../models/User";
import { hashPassword } from "../utils/hash";
import { sequelize } from "./db";

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("Database synced.");

    await User.create({
      email: "admin@gmail.com",
      password: await hashPassword("admin"),
    });
    await User.create({
      email: "admin@hotmail.com",
      password: await hashPassword("password"),
    });

    console.log("Initial data seeded.");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};
