import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

type ReactionAttributes = {
  id: number;
  type: "like" | "dislike";
  userId: number;
  cardId: number;
};

interface ReactionCreationAttributes
  extends Optional<ReactionAttributes, "id"> {}

export class Reaction
  extends Model<ReactionAttributes, ReactionCreationAttributes>
  implements ReactionAttributes
{
  public id!: number;
  public userId!: number;
  public cardId!: number;
  public type!: "like" | "dislike";
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("like", "dislike"),
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
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cards",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Reaction",
    tableName: "reactions",
    timestamps: true,
  },
);
