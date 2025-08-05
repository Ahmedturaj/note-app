import bcrypt from "bcrypt";
import User from "./user.model";
import { sendEmail } from "../../utils/sendEmail";
import { verificationCodeTemplate } from "../../utils/verificationCodeTemplate";
import { createToken } from "../../utils/tockenGenerate";
import { config } from "../../config";

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const createNewAccountInDB = async (payload: any) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser && existingUser.isVerified) {
    throw new Error("User already exists");
  }

  if (payload.password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  let result;

  if (existingUser && !existingUser.isVerified) {
    existingUser.otp = hashedOtp;
    existingUser.otpExpires = otpExpires;
    await existingUser.save();
    result = existingUser;
  } else {
    const newUser = new User({
      ...payload,
      otp: hashedOtp,
      otpExpires,
      isVerified: false,
    });
    result = await newUser.save();
  }

  await sendEmail({
    to: result.email,
    subject: "Verify your email",
    html: verificationCodeTemplate(otp),
  });

  const JwtPayload = {
    userId: result._id,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.JWT_SECRET,
    config.JWT_EXPIRES_IN
  );

  const refreshToken = createToken(
    JwtPayload,
    config.refreshTokenSecret,
    config.jwtRefreshTokenExpiresIn
  );

  return {
    user: {
      _id: result._id,
      name: `${result.firstName} ${result.lastName}`,
      email: result.email,
      role: result.role,
    },
    accessToken,
    refreshToken,
  };
};

export const verifyUserEmail = async (payload: { otp: string }, email: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new Error("User not found");

  if (!existingUser.otp || !existingUser.otpExpires) {
    throw new Error("OTP not requested or expired");
  }

  if (existingUser.otpExpires < new Date()) {
    throw new Error("OTP has expired");
  }

  const isOtpMatched = await bcrypt.compare(payload.otp, existingUser.otp);
  if (!isOtpMatched) throw new Error("Invalid OTP");

  const result = await User.findOneAndUpdate(
    { email },
    {
      isVerified: true,
      $unset: { otp: "", otpExpires: "" },
    },
    { new: true }
  ).select(
    "-password -otp -otpExpires -resetPasswordOtp -resetPasswordOtpExpires"
  );

  return result;
};
