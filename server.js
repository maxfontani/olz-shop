import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Priority serve any static files.
app.use(express.static(path.join(__dirname, "./build")));

app.get("/", function (_, res) {
  res.sendFile(path.join(path.resolve(__dirname, "./build")));
});

app.get("/api", function (_, res) {
  res.set("Content-Type", "application/json");
  res.send('{"message":"Hello from the custom server!"}');
});

app.listen(PORT, () => {
  console.log(`Node listening on port ${PORT}`);
});
