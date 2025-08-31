import User from "./users-model.js";
import List from "./lists-model.js";
import Template from "./templateModels.js";

// relasi one to many
User.hasMany(List, { foreignKey: "userId", as: "todos" });

// 1 list milik 1 user
List.belongsTo(User, { foreignKey: "userId", as: "user" });

// User.hasMany(Template, { foreignKey: "userId" });

export { User, List };
