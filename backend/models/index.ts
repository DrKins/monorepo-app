import { Card } from "./Card";
import { User } from "./User";

User.hasMany(Card, { foreignKey: "userEmail", sourceKey: "email" });

export { Card, User };
