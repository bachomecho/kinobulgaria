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

const port = process.env.PORT || 8080
setTimeout(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
}, 2000);
