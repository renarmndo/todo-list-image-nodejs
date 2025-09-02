import multer from "multer";
import path from "path";
import fs from "fs";

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

// file

const storageTem = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "/public");
    const dir = path.join(process.cwd(), "public/templates");

    // kalau belum ada -> buat
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadTem = multer({
  storage: storageTem,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".docx" && ext !== ".pdf") {
      return cb(new Error("Hanya file .docx dan pdf yang diperbolehkan"));
    }
    cb(null, true);
  },
});

export default { upload, uploadTem };
