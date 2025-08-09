import mongoose, { Document, Schema } from "mongoose";
import { noteType } from "./note.interface";

const noteSchema:Schema<noteType> = new Schema<noteType> ({
    title:String,
    content:String,
});

const Note= mongoose.model<noteType>("Note", noteSchema);

export default Note