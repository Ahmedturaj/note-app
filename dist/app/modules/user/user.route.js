"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = __importDefault(require("../../utils/userValidation"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/register", (0, userValidation_1.default)(user_validation_1.userZodSchema), user_controller_1.createNewAccount);
const userRouter = router;
exports.default = userRouter;
