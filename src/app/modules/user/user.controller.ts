import { Request, Response } from "express";
import { createNewAccountInDB, verifyUserEmail } from "./user.service";
import { config } from "../../config";

export const createNewAccount = async (req: Request, res: Response) => {
  try {
    const result = await createNewAccountInDB(req.body);

    const { refreshToken, accessToken, user } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      code: 200,
      message: "User created successfully, please verify your email",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, code: 400, message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const payload = { otp: req.body.otp };

    const result = await verifyUserEmail(payload, email);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: result,
    });
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, message: error.message });
  }
};
