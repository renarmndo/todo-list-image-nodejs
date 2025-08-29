import List from "../models/lists-model.js";

export const createList = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const newList = await List.create({
      title,
      description,
      status,
      image,
      userId: req.user.id,
    });

    res.status(201).json({
      msg: "Tugas Berhasil Ditambahkan",
      data: newList,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Terjadi Kesalahan Pada Server",
    });
  }
};
