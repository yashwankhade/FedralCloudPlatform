import multer from "multer";
import USERSLA from "./Database/userSLA.mjs";
import express from "express";

const app = express.Router()

const upload = multer();
