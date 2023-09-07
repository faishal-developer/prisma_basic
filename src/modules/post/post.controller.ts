import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.send({
      success: true,
      message: "post created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const options = req.query;
    const result = await postService.getAllPost(options);
    res.send({
      success: true,
      message: "data retrived successfully",
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    res.send(err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = await postService.updatePost(id, payload);
    res.send({
      success: true,
      message: "data updated successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await postService.deletePost(id);
    res.send({
      success: true,
      message: "data deleted successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const learnAggregateAndGrouping = async (req: Request, res: Response) => {
  try {
    const result = await postService.learnAggregateAndGrouping();
    res.send({
      success: true,
      message: "aggregation successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const postController = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};
