import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface CardAttributes {
  id: number;
  content: string;
  userId: number;
  likedByUserIds: string;
  dislikedByUserIds: string;
}

interface CardCreationAttributes
  extends Optional<
    CardAttributes,
    "id" | "likedByUserIds" | "dislikedByUserIds"
  > {}

export class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  declare id: number;
  declare content: string;
  declare userId: number;
  declare likedByUserIds: string;
  declare dislikedByUserIds: string;
}

Card.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    likedByUserIds: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dislikedByUserIds: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Card",
    tableName: "cards",
    timestamps: false,
  },
);
