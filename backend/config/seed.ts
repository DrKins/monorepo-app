import { Card } from "../models/Card";
import { User } from "../models/User";
import { sequelize } from "./db";

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("Database synchronized.");

    const user1 = await User.create({
      email: "admin@gmail.com",
      password: "admin",
    });
    const user2 = await User.create({
      email: "admin@hotmail.com",
      password: "password",
    });

    const facts = [
      "The shortest war in history was between Britain and Zanzibar on August 27, 1896, and lasted only 38 minutes.",
      "The longest word in the English language, according to the Oxford English Dictionary, is pneumonoultramicroscopicsilicovolcanoconiosis, a lung disease caused by inhaling very fine particles of silica.",
      "Butterflies taste with their feet.",
      "A group of flamingos is called a flamboyance.",
      "The Great Wall of China is not visible from space.",
      "The human nose can detect over 1 trillion different scents.",
      "The longest recorded flight of a chicken is 13 seconds.",
      "The world's largest living organism is a fungus that covers over 2,200 acres in Oregon, United States.",
      "A blue whale can produce sounds loud enough to be heard for hundreds of miles.",
      "The world's largest waterfall, by volume of water, is actually located underwater and is called the Denmark Strait Cataract.",
      "The world's largest snowflake was 15 inches (38 cm) in diameter and 8 inches (20 cm) thick.",
    ];

    for (let i = 0; i < 4; i++) {
      await Card.create({
        id: Math.floor(Math.random() * 1000),
        content: facts[Math.floor(Math.random() * facts.length)],
        userEmail: user1.email,
      });
      await Card.create({
        id: Math.floor(Math.random() * 1000),
        content: facts[Math.floor(Math.random() * facts.length)],
        userEmail: user2.email,
      });
    }

    console.log("Initial data seeded.");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
};
