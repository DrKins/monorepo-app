import { DataTypes, Model, Optional } from "sequelize";
import { User } from ".";
import { sequelize } from "../config/db";

interface CardAttributes {
  id: number;
  content: string;
  userId: number;
  isLikedByCurrentUser: boolean;
  isDislikedByCurrentUser: boolean;
  totalLikes: number;
  totalDislikes: number;
  createdAt: Date;
  updatedAt: Date;
  owner?: User;
}

interface CardCreationAttributes
  extends Optional<
    CardAttributes,
    | "id"
    | "isLikedByCurrentUser"
    | "isDislikedByCurrentUser"
    | "totalLikes"
    | "totalDislikes"
    | "owner"
  > {}

export class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  declare id: number;
  declare content: string;
  declare userId: number;
  declare isLikedByCurrentUser: boolean;
  declare isDislikedByCurrentUser: boolean;
  declare totalLikes: number;
  declare totalDislikes: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare owner?: User;
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
    isLikedByCurrentUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDislikedByCurrentUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    totalLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalDislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Card",
    tableName: "cards",
    timestamps: false,
  },
);
