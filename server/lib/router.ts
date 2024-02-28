import express from "express";
import { movies } from './database.js'

export const router = express.Router()

router.get("/movies", (_req, res) => {
  res.send({ data: movies });
});
