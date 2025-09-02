import Template from "../models/templateModels.js";

// export

export const createTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        msg: "File template tidak ada",
      });
    }

    const { name } = req.body;

    // simpan template
    const tamplate = await Template.create({
      name,
      file_path: req.file.path,
      createdBy: req.user.id,
    });

    // response
    res.status(201).json({
      msg: "Tempalte berhasil diupload",
      tamplate,
    });
  } catch (error) {
    console.info(error.message);
    return res.status(500).json({
      msg: "Terjadi kesalahan pada server pada saat upload template",
    });
  }
};
