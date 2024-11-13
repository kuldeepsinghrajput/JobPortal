import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from './routes/job.route.js';
import applicationRouter from "./routes/application.route.js";

dotenv.config();

const app = express();

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Backend",
        success: true
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRouter);

app.use("/api/v1/job",jobRouter);

app.use("/api/v1/application",applicationRouter);
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running at port ${port}`);
});
