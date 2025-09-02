import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

const { DB_NAME, DB, USER, DB_PASS, DB_URL } = process.env;
const sequelize = new Sequelize(DB_URL, {
  define: {
    timestamps: true,
  },
});

export default sequelize;
