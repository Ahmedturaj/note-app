import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: string
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"], // ✅ Fixed
  };

  return jwt.sign(payload, secret, options);
};
