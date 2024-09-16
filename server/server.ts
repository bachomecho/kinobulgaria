import cors from "cors";
import path from "path";
import express from "express";
import apiRouter from "./api.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

const pathConf = {
	DEV: "public/assets/static",
	PROD: "dist/app/assets/static",
};
type Mode = "DEV" | "PROD";
const envi = process.env.VITE_ENVIRONMENT as Mode;
app.use("/images", express.static(`${envi}/images`));
app.use("/icons", express.static(`${envi}/icons`));
console.log(`${pathConf[process.env.VITE_ENVIRONMENT as Mode]}/logo`);
app.use("/logo", express.static(`${envi}/logo`));

app.use(express.static("dist/app"));

app.get("*", (_req, res) => {
	res.sendFile(path.join(process.cwd(), "./dist/app/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
