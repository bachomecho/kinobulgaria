import express from "express";
import { getMovies } from "./database";

export const router = express.Router();
const movies = await getMovies();

router.get("/movies", (_req, res) => {
	res.send({ data: movies });
});
