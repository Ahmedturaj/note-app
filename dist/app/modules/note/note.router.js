"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("./note.controller");
const note_zodValidation_1 = require("./note.zodValidation");
const validator_1 = __importDefault(require("../../utils/validator"));
const router = express_1.default.Router();
router.post("/create", (0, validator_1.default)(note_zodValidation_1.zodNoteSchema), note_controller_1.createNote);
const noteRouter = router;
exports.default = noteRouter;
