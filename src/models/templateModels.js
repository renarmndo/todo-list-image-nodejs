import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Template extends Model {}

Template.ini(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Template",
    tableName: "templates",
    timestamps: true,
  }
);

export default Template;
