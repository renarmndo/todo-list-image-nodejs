import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import listRouter from "../routes/listRoutes.js";

dotenv.config();

const web = express();

// midleware
web.use(express.json());
web.use(cors());
// web.use();

// routes
web.use("/auth", authRoutes);
web.use("/list-menu", listRouter);

export default web;
