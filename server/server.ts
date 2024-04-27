import express from "express";
import cors from "cors";
import path from "path";
import { router } from "./lib/router.js"; // typescript infers the .ts extension
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

let filePath = "public";
if (process.env.VITE_ENVIRONMENT === "PROD") {
	filePath = "dist/app";
}

app.use("/images", express.static(`${filePath}/assets/static/images`));
app.use("/icons", express.static(`${filePath}/assets/static/icons`));
app.use(express.static(filePath));

app.get("*", (_req, res) => {
	const __dirname = process.cwd();
	res.sendFile(path.join(__dirname, "./dist/app/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
