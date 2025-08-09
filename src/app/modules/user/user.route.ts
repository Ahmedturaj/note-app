import express from "express";
import { userZodSchema } from "./user.validation";
import { createNewAccount } from "./user.controller";
import validateRequest from "../../utils/validator";


const router = express.Router()

router.post("/signUp", validateRequest(userZodSchema),createNewAccount);

const userRouter= router

export default userRouter;