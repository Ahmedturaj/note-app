import jwt from "jsonwebtoken";

export const createToken = (
  payload: string | object | Buffer,
  secret: string,
  expiresIn: string | number
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};
