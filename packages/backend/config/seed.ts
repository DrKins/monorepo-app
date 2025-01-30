import { Card } from "../models";
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

    const users = await User.findAll();
    for (const user of users) {
      const cardsPromises = [];
      for (let i = 0; i < 50; i++) {
        cardsPromises.push(
          Card.create({
            content: `This is card ${i + 1} of ${user.email}`,
            userId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        );
      }

      await Promise.all(cardsPromises);
    }

    console.log("Initial data seeded.");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};
