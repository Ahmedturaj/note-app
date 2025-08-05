import { Request, Response } from "express";
import Note from "./note.model"; // Assuming default export
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};


