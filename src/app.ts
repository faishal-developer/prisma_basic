import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./modules/user/user.route";
import { categoryRouter } from "./modules/category/category.route";
import { postRouter } from "./modules/post/post.route";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/post", postRouter);

export default app;
