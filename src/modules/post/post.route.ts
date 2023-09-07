import express from "express";
import { postController } from "./post.controller";

const router = express.Router();

router.post("/create-post", postController.createPost);
router.patch("/:id", postController.updatePost);
router.get("/:id", postController.deletePost);
router.get("/", postController.getAllPost);

export const postRouter = router;
