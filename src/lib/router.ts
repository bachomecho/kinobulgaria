import express from "express";
import { getMovies } from "./database";

export const router = express.Router()

router.get("/movies", async (_req, res) => {
  const movies = await getMovies();
  res.send({ data: movies });
});

