import cors from "cors";
import path from "path";
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
let filePath = "public/assets/static";
if (process.env.VITE_ENVIRONMENT === "PROD") {
	filePath = "dist/app/assets/static";
}

const __dirname = process.cwd();
console.log(__dirname);
console.log(path.join(__dirname, "./dist/app/index.html"));
console.log(path.resolve(process.cwd(), "dist/app/index.html"));
const databaseFile = path.resolve(
	process.cwd(),
	`${filePath}/sample_database.json`
);
const data = fs.readFileSync(databaseFile, "utf8");

const movies = JSON.parse(data); // TODO: check each entry if it conforms to the movie interface
const router = express.Router();

router.get("/movies", (_req, res) => {
	res.send({ data: movies });
});

app.use("/api", router);

app.use("/images", express.static(`${filePath}/images`));
app.use("/icons", express.static(`${filePath}/icons`));
app.use(express.static(filePath));

app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "./dist/app/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
