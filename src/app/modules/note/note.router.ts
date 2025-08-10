import express from "express";
import { createNote } from "./note.controller";
import { zodNoteSchema } from "./note.zodValidation";
import validateRequest from "../../utils/validator";
const router = express.Router();
router.post ("/create",validateRequest(zodNoteSchema), createNote)

const noteRouter = router;

export default noteRouter;