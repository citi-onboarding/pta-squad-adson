import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";
import cors from "cors";

const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(routes);
app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("📦 Server running");
});