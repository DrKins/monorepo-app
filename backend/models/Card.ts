import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Card = sequelize.define(
  "Card",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "email",
      },
    },
  },

  {
    tableName: "cards",
    timestamps: false,
  },
);

export { Card };
