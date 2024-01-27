import express from "express";
import cors from "cors"
import { getMovies } from "./database";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/movies/", async (_req, res) => {
  const movies = await getMovies();
  res.send({ data: movies });
});

setTimeout(() => {
  app.listen(8080, () => console.log("listening on port 8080"));
}, 2000);
