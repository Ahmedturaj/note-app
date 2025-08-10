import { Request, Response } from "express";
import { IUser } from "./user.interface";
import User from "./user.model";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

export const createNewAccount = async (req: Request, res: Response) => {
  try {
    const userInfo: IUser = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: userInfo.email });
    if (existingUser) {
      return sendResponse(res, {
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    console.log(hashedPassword);
    // Create user
    const newUser = await User.create({
      ...userInfo,
      password: hashedPassword,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully",
      data: newUser,
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find().select("-password");
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Data fetched successfully",
      data: allUsers,
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

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully",
      data: user,
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData: Partial<IUser> = req.body;

    // Hash password if provided in update
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update user",
      data: null,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to delete user",
      data: null,
    });
  }
};
