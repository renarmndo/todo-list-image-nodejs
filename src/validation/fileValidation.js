import multer from "multer";

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const filterFile = (req, file, cb) => {
  const allowedType = ["image/jpeg", "image/png"];
  if (allowedType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya File Jpeg atau PNG yang diizinkan"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2mb
  },
  fileFilter: filterFile,
});

export default upload;
