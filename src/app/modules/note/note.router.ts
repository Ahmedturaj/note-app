import express from "express";
import { createNote } from "./note.controller";
const router = express.Router();
router.post ("/create", createNote)

const noteRouter = router;

export default noteRouter;