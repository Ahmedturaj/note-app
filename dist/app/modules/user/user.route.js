"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validator_1 = __importDefault(require("../../utils/validator"));
const router = express_1.default.Router();
router.post("/signUp", (0, validator_1.default)(user_validation_1.userZodSchema), user_controller_1.createNewAccount);
const userRouter = router;
exports.default = userRouter;
