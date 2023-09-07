import { Request, Response } from "express";
import { categoryService } from "./category.service";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "category created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const categoryController = {
  insertIntoDB,
};
