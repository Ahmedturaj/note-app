import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI as string,
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS as string,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
}