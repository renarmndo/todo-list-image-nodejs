import web from "./src/app/web.js";
import sequelize from "./src/config/config.js";
import { User, List, Template } from "./src/models/index-models.js";

const port = process.env.DB_PORT;

web.get("/", async (req, res) => {
  try {
    const dataList = await List.findAll();

    if (!dataList) {
      return res.status(400).json({
        msg: "Data tidak ada",
      });
    }
    res.status(200).json({
      msg: "Data Berhasil Diambil",
      data: dataList,
    });
  } catch (error) {
    console.info(error);
  }
});

async function connection() {
  try {
    // database
    await sequelize.authenticate();
    console.info("Koneksi Database Berhasil");

    // generate table
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
