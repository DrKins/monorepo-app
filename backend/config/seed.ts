import { User } from "../models/User";
import { sequelize } from "./db";

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const user1 = await User.create({
      email: "admin@gmail.com",
      password: "admin",
    });
    const user2 = await User.create({
      email: "admin@hotmail.com",
      password: "password",
    });

    console.log("Initial data seeded.");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};
