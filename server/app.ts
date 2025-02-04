import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

export default function createServer() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	return app;
}
