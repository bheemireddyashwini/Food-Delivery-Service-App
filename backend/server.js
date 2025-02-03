import express from "express";
import connectDB from "./utils/db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import restaurantRouter from "./routes/restaurantRoute.js";
import cors from "cors";
import menuRouter from "./routes/menuRouter.js";
import { seedData } from "./controllers/Menu.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get('/seed', (req, res) => {
  seedData(req, res);
});


app.use("/data", userRouter);
app.use("/", router);



app.use("/data", router);
app.use("/api", restaurantRouter);
app.use("/food",menuRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
