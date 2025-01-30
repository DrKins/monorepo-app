import { Card } from "./Card";
import { Reaction } from "./Reaction";
import { User } from "./User";

User.hasMany(Card, { foreignKey: "userId", sourceKey: "id", as: "cards" });
User.hasMany(Reaction, { foreignKey: "userId", as: "reactions" });

Card.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "owner" });
Card.hasMany(Reaction, { foreignKey: "cardId", as: "reactions" });

Reaction.belongsTo(User, { foreignKey: "userId" });
Reaction.belongsTo(Card, { foreignKey: "cardId", as: "card" });

export { Card, Reaction, User };
