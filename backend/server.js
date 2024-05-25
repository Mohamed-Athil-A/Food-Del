import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";
<<<<<<< HEAD
=======
import categoryRouter from "./routes/catagoryRoute.js";
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb

//app config
const app = express();
const PORT = 4000;

//middleware
app.use(express.json()); //whenever we get the req from frontend to backend we parse the data into JSON format and then we can use it

<<<<<<< HEAD
app.use(cors()); //we can access the backend from any frontend
=======
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); //we can access the backend from any frontend
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb

//DB connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);

//showing the image to the client(frontend) from the server(backend) we need to create a static folder and then we need to create a route for it
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
<<<<<<< HEAD
=======
app.use("/api/category", categoryRouter);
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
