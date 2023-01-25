import express, { Express } from "express";
import cors from "cors";

const app = express();

const PORT = 3006;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running. PORT=${PORT}`);
});
