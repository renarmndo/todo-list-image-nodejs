import User from "./users-model.js";
import List from "./lists-model.js";

// relasi one to many
User.hasMany(List, { foreignKey: "userId", as: "todos" });

// 1 list milik 1 user
List.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, List };
