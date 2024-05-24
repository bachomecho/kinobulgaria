import cors from "cors";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
let filePath = "public/assets/static";
if (process.env.VITE_ENVIRONMENT === "PROD") {
	filePath = "dist/app/assets/static";
}

console.log("test path: ", path.resolve(process.cwd(), filePath, "movies.db"));
const moviesDb = new sqlite3.Database(
	path.resolve(process.cwd(), filePath, "movies.db"),
	(err: any) => {
		if (err) {
			console.error("Could not connect to db");
		} else {
			console.log("Successfully connected to db");
		}
	}
);

const apiRouter = express.Router();

apiRouter.get("/movies", (_req, res) => {
	moviesDb.all("SELECT * FROM movies", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.send({ data: rows });
	});
});
app.use("/api", apiRouter);

app.use("/images", express.static(`${filePath}/images`));
app.use("/icons", express.static(`${filePath}/icons`));
app.use("/logo", express.static(`${filePath}/logo`));
app.use(express.static("dist/app"));

app.get("*", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./dist/app/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
