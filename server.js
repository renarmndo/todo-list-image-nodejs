import web from "./src/app/web.js";
import sequelize from "./src/config/config.js";
// import { User, List } from "./models/index-models.js";

const port = 5000;

async function connection() {
  try {
    // database
    await sequelize.authenticate();
    console.info("Koneksi Database Berhasil");

    // // generate table
    // await sequelize.sync({ alter: true });
    // console.info("Tabel Berhasil Dimuat...");

    // serever
    web.listen(port, () => {
      console.info(`Server berjalan pada localhost:${port}`);
    });
  } catch (error) {
    console.info(error);
  }
}

connection();
