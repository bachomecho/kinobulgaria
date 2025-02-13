import createServer from "./app";
import express from "express";
import apiRouter from "./api.js";
import authRouter from "./authentication.js";
import path from "path";

const app = createServer();
app.use("/api", apiRouter);
app.use("/auth", authRouter);

const pathConf = {
    DEV: "assets/static",
    PROD: "dist/app/assets/static",
};
type Mode = "DEV" | "PROD";
const envi = process.env.VITE_ENVIRONMENT as Mode;
const filePath = path.resolve(pathConf[envi]);
app.use("/images", express.static(`${filePath}/images`));
app.use("/icons", express.static(`${filePath}/icons`));
console.log(`${pathConf[process.env.VITE_ENVIRONMENT as Mode]}/logo`);
app.use("/logo", express.static(`${filePath}/logo`));

app.use(express.static("dist/app"));

app.get("*", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "./dist/app/index.html"));
});
const port = process.env.API_PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
