import express from "express";
import userValidateRequest from "../../utils/userValidation";
import { userZodSchema } from "./user.validation";
import User from "./user.model";
import { createNewAccount } from "./user.controller";


const router = express.Router()

router.post("/register", userValidateRequest(userZodSchema),createNewAccount);

const userRouter= router

export default userRouter;
