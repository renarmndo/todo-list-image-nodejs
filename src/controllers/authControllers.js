import bcrypt from "bcryptjs";
import User from "../models/users-model.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // jika user tidak memeasukkan input
    if (!username | !password | !email) {
      return res.status(400).json({
        msg: "Data tidak boleh kosong",
      });
    }

    // cari user
    const existingEmail = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });

    // kalau suer sama
    if (existingEmail) {
      return res.status(400).json({
        msg: "Email atau Username sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      msg: "Terjadi Kesalana Pada Server",
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    // kalau user tidak ada
    if (!user) {
      return res.status(404).json({
        msg: "Email tidak ditemukan",
      });
    }

    // match password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        msg: "Password Salah",
      });
    }

    // buat token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JSON_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    // token udah
    res.status(200).json({
      msg: "Login Berhasil",
      data: {
        id: user.id,
        username: user.user,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.info(error.message);
    return res.status(500).json({
      msg: "Terjadi Kesalahan Pada Server",
    });
  }
};
