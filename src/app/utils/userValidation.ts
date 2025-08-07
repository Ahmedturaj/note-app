import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const userValidateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        status: "fail",
        message: err?.errors?.[0]?.message || "Validation error",
      });
    }
  };
};

export default userValidateRequest;
