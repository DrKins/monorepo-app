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
  },
  {
    tableName: "cards",
    timestamps: false,
  },
);

export { Card };
