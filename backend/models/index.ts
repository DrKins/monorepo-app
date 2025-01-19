import { Card } from "./Card";
import { User } from "./User";

User.hasMany(Card, { foreignKey: "userId", sourceKey: "id" });
Card.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

export { Card, User };
